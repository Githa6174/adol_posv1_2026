import { useState, useEffect, useRef } from 'react';
import { tableService } from '../services/tableService';

export function TableSettings() {
  const [tables, setTables] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  
  const [newTable, setNewTable] = useState({
    table_number: '',
    capacity: 4,
    zone_id: '',
    shape: 'rectangle',
    width: 100,
    height: 100
  });

  const [newZoneName, setNewZoneName] = useState('');
  
  const [dragState, setDragState] = useState<{
    tableId: number;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const CANVAS_WIDTH = 900;
  const CANVAS_HEIGHT = 550;

  const loadData = async () => {
    try {
      const fetchedTables = await tableService.getTables();
      const fetchedZones = await tableService.getZones();
      setTables(fetchedTables);
      setZones(fetchedZones);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    try {
      await tableService.createZone({ name: newZoneName });
      setNewZoneName('');
      loadData();
    } catch (err) {
      alert('Gagal menambah area');
    }
  };

  const handleCreateTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTable.table_number.trim()) {
      alert('Nomor meja harus diisi');
      return;
    }

    try {
      await tableService.createTable({
        table_number: newTable.table_number,
        capacity: Number(newTable.capacity),
        zone_id: newTable.zone_id ? Number(newTable.zone_id) : null,
        shape: newTable.shape,
        width: Number(newTable.width),
        height: Number(newTable.height),
        x_position: 100,
        y_position: 100,
        status: 'available'
      });
      setNewTable({
        table_number: '',
        capacity: 4,
        zone_id: zones[0]?.id?.toString() || '',
        shape: 'rectangle',
        width: 100,
        height: 100
      });
      loadData();
    } catch (err) {
      alert('Gagal menambah meja');
    }
  };

  const handleUpdateTableField = async (tableId: number, fields: any) => {
    try {
      const targetTable = tables.find(t => t.id === tableId);
      if (!targetTable) return;
      const updated = await tableService.updateTable(tableId, {
        ...targetTable,
        ...fields
      });
      setTables(prev => prev.map(t => (t.id === tableId ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTable = async (tableId: number) => {
    if (!confirm('Yakin ingin menghapus meja ini?')) return;
    try {
      await tableService.deleteTable(tableId);
      setSelectedTableId(null);
      loadData();
    } catch (err) {
      alert('Gagal menghapus meja');
    }
  };

  const handlePointerDown = (e: React.PointerEvent, table: any) => {
    e.preventDefault();
    setSelectedTableId(table.id);
    setDragState({
      tableId: table.id,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: table.x_position || 0,
      startTop: table.y_position || 0
    });
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;
    e.preventDefault();

    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    
    const targetTable = tables.find(t => t.id === dragState.tableId);
    if (!targetTable) return;

    let newX = dragState.startLeft + dx;
    let newY = dragState.startTop + dy;

    newX = Math.round(newX / 10) * 10;
    newY = Math.round(newY / 10) * 10;

    const width = targetTable.width || 100;
    const height = targetTable.height || 100;

    newX = Math.max(0, Math.min(CANVAS_WIDTH - width, newX));
    newY = Math.max(0, Math.min(CANVAS_HEIGHT - height, newY));

    setTables(prev =>
      prev.map(t => (t.id === dragState.tableId ? { ...t, x_position: newX, y_position: newY } : t))
    );
  };

  const handlePointerUp = async (e: React.PointerEvent) => {
    if (!dragState) return;
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    const finalTable = tables.find(t => t.id === dragState.tableId);
    if (finalTable) {
      try {
        await tableService.updateTable(finalTable.id, {
          x_position: finalTable.x_position,
          y_position: finalTable.y_position
        });
      } catch (err) {
        console.error('Failed to sync position to backend', err);
      }
    }
    setDragState(null);
  };

  const selectedTable = tables.find(t => t.id === selectedTableId);

  return (
    <div className="p-8 h-full overflow-y-auto no-print">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-600">Pengaturan Tata Letak Meja</h1>
          <p className="text-text-muted mt-1">Kelola daftar meja dan atur posisi dengan menyeret meja di area peta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        <div className="xl:col-span-3">
          <div className="glass p-6 rounded-3xl bg-surface">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-text-main flex items-center gap-2">
                <span className="material-icons text-brand-600">floor</span> Tata Letak Lantai ({CANVAS_WIDTH} x {CANVAS_HEIGHT} px)
              </span>
              <span className="text-xs text-text-muted">Gunakan grid snap 10px. Seret meja untuk memindahkan posisi.</span>
            </div>

            <div className="overflow-auto border border-border rounded-2xl bg-surface-dark/20 p-2">
              <div
                ref={canvasRef}
                className="relative bg-surface border border-border shadow-inner"
                style={{
                  width: `${CANVAS_WIDTH}px`,
                  height: `${CANVAS_HEIGHT}px`,
                  backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              >
                {tables.map(table => {
                  const isSelected = table.id === selectedTableId;
                  const isCircle = table.shape === 'circle';
                  
                  return (
                    <div
                      key={table.id}
                      onPointerDown={(e) => handlePointerDown(e, table)}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      className={`absolute select-none cursor-move flex flex-col items-center justify-center border transition-shadow duration-100 touch-none shadow-sm
                        ${isSelected ? 'border-brand-600 ring-2 ring-brand-500/20 bg-brand-50/70 z-10' : 'border-border bg-surface-light hover:border-brand-400 hover:shadow-md'}
                        ${isCircle ? 'rounded-full' : 'rounded-2xl'}`}
                      style={{
                        left: `${table.x_position || 0}px`,
                        top: `${table.y_position || 0}px`,
                        width: `${table.width || 100}px`,
                        height: `${table.height || 100}px`,
                      }}
                    >
                      <span className="text-lg font-black text-text-main leading-none">{table.table_number}</span>
                      <span className="text-[10px] text-text-muted mt-1 font-semibold">Pax: {table.capacity}</span>
                      {table.zone && (
                        <span className="text-[9px] bg-surface-dark px-1.5 py-0.5 rounded text-text-muted mt-1 leading-none font-medium max-w-[85%] truncate">
                          {table.zone.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedTable ? (
            <div className="glass p-6 rounded-3xl bg-surface border-brand-500/20">
              <h2 className="text-xl font-bold mb-4 text-text-main flex items-center gap-2">
                <span className="material-icons text-brand-600">edit</span> Edit Meja {selectedTable.table_number}
              </h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-text-muted font-medium mb-1.5">Nomor Meja</label>
                  <input
                    type="text"
                    value={selectedTable.table_number}
                    onChange={(e) => handleUpdateTableField(selectedTable.id, { table_number: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Kapasitas (Pax)</label>
                    <input
                      type="number"
                      min="1"
                      value={selectedTable.capacity}
                      onChange={(e) => handleUpdateTableField(selectedTable.id, { capacity: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Bentuk</label>
                    <select
                      value={selectedTable.shape || 'rectangle'}
                      onChange={(e) => handleUpdateTableField(selectedTable.id, { shape: e.target.value })}
                      className="input-field bg-surface text-text-main"
                    >
                      <option value="rectangle" className="bg-surface text-text-main">Kotak</option>
                      <option value="circle" className="bg-surface text-text-main">Bulat</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Lebar (px)</label>
                    <input
                      type="number"
                      min="50"
                      max="300"
                      value={selectedTable.width || 100}
                      onChange={(e) => handleUpdateTableField(selectedTable.id, { width: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Tinggi (px)</label>
                    <input
                      type="number"
                      min="50"
                      max="300"
                      value={selectedTable.height || 100}
                      onChange={(e) => handleUpdateTableField(selectedTable.id, { height: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-muted font-medium mb-1.5">Area / Zona</label>
                  <select
                    value={selectedTable.zone_id || ''}
                    onChange={(e) => handleUpdateTableField(selectedTable.id, { zone_id: e.target.value || null })}
                    className="input-field bg-surface text-text-main"
                  >
                    <option value="" className="bg-surface text-text-main">Pilih Area...</option>
                    {zones.map(z => (
                      <option key={z.id} value={z.id} className="bg-surface text-text-main">{z.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleDeleteTable(selectedTable.id)}
                    className="flex-1 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-600 rounded-xl font-bold flex items-center justify-center gap-1.5"
                  >
                    <span className="material-icons text-lg">delete</span> Hapus
                  </button>
                  <button
                    onClick={() => setSelectedTableId(null)}
                    className="flex-1 btn-secondary"
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass p-6 rounded-3xl bg-surface">
              <h2 className="text-xl font-bold mb-4 text-text-main flex items-center gap-2">
                <span className="material-icons text-brand-600">add_circle</span> Tambah Meja Baru
              </h2>
              
              <form onSubmit={handleCreateTable} className="space-y-4 text-sm">
                <div>
                  <label className="block text-text-muted font-medium mb-1.5">Nomor Meja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: T-12 atau A5..."
                    value={newTable.table_number}
                    onChange={(e) => setNewTable(prev => ({ ...prev, table_number: e.target.value }))}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Pax</label>
                    <input
                      type="number"
                      min="1"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted font-medium mb-1.5">Bentuk</label>
                    <select
                      value={newTable.shape}
                      onChange={(e) => setNewTable(prev => ({ ...prev, shape: e.target.value }))}
                      className="input-field bg-surface text-text-main"
                    >
                      <option value="rectangle" className="bg-surface text-text-main">Kotak</option>
                      <option value="circle" className="bg-surface text-text-main">Bulat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-text-muted font-medium mb-1.5">Area / Zona</label>
                  <select
                    value={newTable.zone_id}
                    onChange={(e) => setNewTable(prev => ({ ...prev, zone_id: e.target.value }))}
                    className="input-field bg-surface text-text-main"
                  >
                    <option value="" className="bg-surface text-text-main">Pilih Area...</option>
                    {zones.map(z => (
                      <option key={z.id} value={z.id} className="bg-surface text-text-main">{z.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 font-bold flex items-center justify-center gap-1.5"
                >
                  <span className="material-icons">add</span> Tambah Meja
                </button>
              </form>
            </div>
          )}

          <div className="glass p-6 rounded-3xl bg-surface">
            <h2 className="text-xl font-bold mb-4 text-text-main flex items-center gap-2">
              <span className="material-icons text-brand-600">layers</span> Tambah Area / Lantai
            </h2>
            <form onSubmit={handleCreateZone} className="space-y-4 text-sm">
              <div>
                <label className="block text-text-muted font-medium mb-1.5">Nama Area</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Lantai 2, VIP, Outdoor..."
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-secondary py-3 font-bold flex items-center justify-center gap-1.5"
              >
                <span className="material-icons">add</span> Tambah Area
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
