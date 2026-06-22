User:

aku menginginkan sebuah sistem point of sale yang dapat di gunakan di restaurant F&B , maupun point of sale yang di gunakan di dalam sistem retail jual dan beli , sistem juga harus memiliki fitur yang lengkap dari semua kebutuhan namun aku bingung untuk memulai dari mana . dari pemograman apa yang harus di gunakan dan sistem se[perti apa yang harus di kerjakan , apakah ini cukup sulit di kerjakan oleh 1 orang jika di lakukan deng bantuan Ai atau pun segala mslh ini bisa di selesaikan



Claude Sonnet 4.6:

# Panduan Membangun Sistem POS untuk Restaurant & Retail

Saya mengerti kebingungan Anda. Mari kita break down masalah ini menjadi bagian-bagian yang manageable.

## 1. **Scope & Kompleksitas Sistem**

Sistem POS terintegrasi untuk F&B dan retail memang kompleks, tapi **bisa dikerjakan 1 orang** dengan bantuan AI jika:
- Dimulai dengan MVP (Minimum Viable Product) sederhana
- Dikembangkan secara bertahap
- Menggunakan tools & framework yang tepat

**Estimasi waktu:** 
- MVP basic: 2-3 bulan (1 orang)
- Sistem lengkap & production-ready: 4-6 bulan

---

## 2. **Teknologi yang Saya Rekomendasikan**

### **Frontend (User Interface)**
```
Pilihan terbaik:
├── React.js atau Vue.js (modern, cepat, banyak library)
├── atau TypeScript untuk type-safety lebih baik
└── UI Library: Shadcn/ui atau Ant Design
```

**Alasan:** Bisa pakai offline-first, responsive untuk tablet/mobile

### **Backend (Server & Database)**
```
Rekomendasi:
├── Node.js + Express (atau Fastify)
├── Database: PostgreSQL (reliable) atau MongoDB (flexible)
├── Auth: JWT tokens
└── API REST atau GraphQL
```

**Alternatif:** Python (FastAPI/Django) atau Go (Gin) - lebih simple

### **Desktop/Mobile Execution**
```
Pilihan:
├── Electron (untuk desktop - bisa offline)
├── React Native (untuk mobile)
└── Progressive Web App - PWA (browser-based, flexible)
```

---

## 3. **Arsitektur Sistem yang Saya Sarankan**

```
┌─────────────────────────────────────────────┐
│        FRONTEND LAYER                       │
│  (React + Offline Sync + Responsive UI)     │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│        API GATEWAY / MIDDLEWARE             │
│  (Authentication, Rate Limiting)            │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│        BACKEND SERVICES                     │
│  ├── Transaction Service                    │
│  ├── Inventory Service                      │
│  ├── Payment Service                        │
│  ├── Reporting Service                      │
│  └── User Management                        │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│        DATABASE                             │
│  PostgreSQL (transactional, reliable)       │
└─────────────────────────────────────────────┘
```

---

## 4. **Fitur-Fitur Esensial (Prioritas)**

### **Phase 1 - MVP (1-2 bulan)**
- ✅ Input transaksi (kasir)
- ✅ Sistem pembayaran (tunai, transfer)
- ✅ Receipt/Invoice
- ✅ Inventory dasar
- ✅ User login & role

### **Phase 2 - Core Features (bulan ke 2-3)**
- 📊 Laporan penjualan harian/bulanan
- 🏠 Manajemen menu/produk
- 📦 Stock tracking & alert
- 💰 Hutang/Piutang (untuk bisnis tertentu)
- 🖨️ Integrasi printer thermal

### **Phase 3 - Advanced (bulan ke 4-6)**
- 👥 Customer database & loyalty
- 📈 Analytics & forecasting
- 🔄 Multi-lokasi/cabang
- 💳 Integrasi payment gateway (Midtrans, Stripe)
- 📱 Mobile app delivery tracking
- 🤖 Automated backup & sync

---

## 5. **Langkah-Langkah Praktis Memulai**

### **Week 1-2: Planning & Setup**
```bash
1. Definisikan use case spesifik Anda
   - Restaurant saja atau retail atau keduanya?
   - Berapa outlet?
   - Tipe pembayaran apa saja?

2. Setup development environment
   - Install Node.js, PostgreSQL, Git
   - Buat repository GitHub

3. Design database schema sederhana
   - Tabel: users, products, transactions, inventory
```

### **Week 3-6: Build MVP**
```bash
# Struktur project
my-pos-system/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── middleware/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
└── database/
    └── migrations/
```

---

## 6. **Cara AI Membantu Anda**

### **Yang Bisa AI Lakukan:**
✅ Generate boilerplate code  
✅ Debug error & suggest fixes  
✅ Optimasi performa query database  
✅ Buat dokumentasi  
✅ Code review  
✅ Bikin unit tests  

### **Yang Harus Anda Lakukan:**
- 🎯 Definisikan requirements jelas
- 🏗️ Design architecture & database
- ✍️ Menulis logic bisnis kompleks
- 🧪 Testing & QA
- 👥 User feedback & iteration

---

## 7. **Tools yang Bisa Memcepat Development**

```
├── Scaffolding: Create React App / Next.js
├── Database: Prisma ORM (lebih mudah dari raw SQL)
├── Authentication: NextAuth.js atau Auth0
├── UI Components: Shadcn/ui atau Mantine
├── Testing: Jest + React Testing Library
├── Deployment: Vercel (frontend) + Railway/Render (backend)
└── Version Control: GitHub + Git workflow
```

---

## 8. **Realistis: Tantangan yang Mungkin Dihadapi**

| Tantangan | Solusi |
|-----------|--------|
| **Sync offline data** | Implement service workers + queue system |
| **Hardware (printer, scanner)** | Library seperti Electron-printer |
| **Performance saat peak hours** | Caching, database indexing, load testing |
| **Security data transaksi** | SSL/TLS, password hashing, audit logs |
| **Banyak feature requests** | Prioritas, waterfall development |

---

## 9. **Saran Stack Akhir (Recommended)**

```javascript
// PRODUCTION-READY SETUP

Frontend:
- React 18 + TypeScript
- Vite (build tool - faster)
- TanStack Query (data fetching)
- Zustand (state management)
- Shadcn/ui components

Backend:
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- Zod (validation)
- Jest (testing)

Deployment:
- Docker + GitHub Actions (CI/CD)
- Railway / Supabase untuk database
- Vercel / Netlify untuk frontend
```

---

## 🎯 **Pertanyaan untuk Memperjelas Scope Anda:**

1. **Restaurant atau retail atau keduanya?** Format transaksi berbeda
2. **Berapa banyak outlet/cabang?** Mempengaruhi architecture
3. **Budget hardware?** (printer, display, barcode scanner)
4. **Timeline ideal?** Kapan butuh launch?
5. **Pengguna akan siapa?** (kasir, manager, owner)
6. **Sudah pernah code sebelumnya?** Pengalaman programming?

**Jawab pertanyaan-pertanyaan ini, saya bisa kasih roadmap lebih spesifik dan contoh kode konkret sesuai kebutuhan Anda!** 

Intinya: **Ya, ini bisa dikerjakan 1 orang dengan AI**, tapi perlu planning matang dan fokus bertahap. Jangan langsung bikin "super app", mulai dari yang paling basic dulu.



User:

system pos restaurant dan retail
ada login system - memilih table sesuai mapping table - memasukan menu / item beserta kebutuhan nya sesuai orderan yang di terima - melempar orderan tersebut agat terprint ke printer  atau muncul di kitchen atau bar - kemudian kasir dapat melakukan pembayaran yang sesuai dengan kebutuhan type bayar dari cash , card debet , credit , ataupun costumasi jenis jenis pembayaran ke depannya 

item dapat di imput di berikan keterangan yang seperti nama kode item bisa otomatis atau di imput manual , nama item , Harga item dari level Harga 1 sampai dengan 5 level Harga kemudian category item , department item , service dan tax item yang dapat di isi tergantung kebutuhan konsumen , lokasi printer item jika menggunakan printer atau pun kitchen monitor atau pun keduanya



Claude Sonnet 4.6:

# Sistem POS Restaurant & Retail - Roadmap Lengkap

Sempurna! Sekarang scope-nya jelas. Ini adalah sistem POS **hybrid** yang perlu fleksibilitas tinggi. Mari saya buat roadmap detail dengan arsitektur yang tepat.

---

## 1. **Arsitektur Sistem Lengkap**

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Login Page  │  │  Table Map   │  │ Order Entry  │  │
│  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Payment     │  │  Kitchen Mgmt│  │  Item Master │  │
│  │  Gateway     │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────┬─────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│              API GATEWAY & MIDDLEWARE                    │
│  ├── JWT Authentication                                 │
│  ├── Rate Limiting & Request Validation                │
│  ├── Real-time WebSocket (printer/kitchen updates)     │
│  └── Error Handling & Logging                          │
└────────────┬─────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│                 BACKEND SERVICES                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Authentication Service                              │ │
│  │ - User login & role based access                    │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Item Management Service                             │ │
│  │ - CRUD item, kategori, department                   │ │
│  │ - Multi-level pricing                               │ │
│  │ - Tax & service calculation                         │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Order & Transaction Service                         │ │
│  │ - Buat order, queue order                           │ │
│  │ - Update status order (pending, cooking, ready)     │ │
│  │ - Print receipt / kirim ke printer                  │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Payment Service                                      │ │
│  │ - Process pembayaran (cash, card, custom)           │ │
│  │ - Payment gateway integration                       │ │
│  │ - Generate invoice                                  │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Kitchen/Bar Management Service                      │ │
│  │ - WebSocket untuk real-time update                  │ │
│  │ - Route order ke printer/monitor yang tepat         │ │
│  │ - Order status tracking                             │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Reporting & Analytics Service                       │ │
│  │ - Sales reports                                     │ │
│  │ - Inventory tracking                                │ │
│  │ - Performance metrics                               │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────┬─────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│                    DATABASE LAYER                        │
│                    PostgreSQL                            │
└─────────────────────────────────────────────────────────┘
             │
┌────────────▼─────────────────────────────────────────────┐
│              HARDWARE INTEGRATIONS                       │
│  ├── Thermal Printer                                    │
│  ├── Kitchen Monitor (Display)                          │
│  ├── Card Reader (Payment)                              │
│  └── Barcode Scanner (Optional)                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. **Database Schema (PostgreSQL)**

```sql
-- ==================== USERS & AUTH ====================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- hashed bcrypt
    name VARCHAR(100),
    email VARCHAR(100),
    role VARCHAR(20), -- 'admin', 'cashier', 'kitchen', 'bar', 'manager'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== ITEM MASTER ====================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- 'Kitchen', 'Bar', 'Retail'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE, -- auto-generated or manual
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    department_id INTEGER REFERENCES departments(id),
    
    -- PRICING (5 Level)
    price_level_1 DECIMAL(10,2),
    price_level_2 DECIMAL(10,2),
    price_level_3 DECIMAL(10,2),
    price_level_4 DECIMAL(10,2),
    price_level_5 DECIMAL(10,2),
    
    -- TAX & SERVICE
    tax_percentage DECIMAL(5,2) DEFAULT 0, -- PPN
    service_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- PRINTER CONFIG
    is_require_printing BOOLEAN DEFAULT true,
    printer_location VARCHAR(100), -- 'Kitchen', 'Bar', 'Both'
    
    -- KITCHEN MONITOR
    is_show_kitchen_monitor BOOLEAN DEFAULT true,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== RESTAURANT - TABLE MAPPING ====================
CREATE TABLE table_zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100), -- 'Area 1', 'Area 2'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    table_number VARCHAR(20) NOT NULL,
    zone_id INTEGER REFERENCES table_zones(id),
    capacity INT DEFAULT 4,
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'occupied', 'reserved'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== ORDERS ====================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    table_id INTEGER REFERENCES tables(id), -- NULL untuk retail
    customer_name VARCHAR(100), -- untuk retail/takeaway
    
    order_type VARCHAR(20), -- 'dine-in', 'takeaway', 'delivery', 'retail'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_kitchen', 'ready', 'served', 'closed'
    
    total_items INT DEFAULT 0,
    subtotal DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    service_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    grand_total DECIMAL(12,2) DEFAULT 0,
    
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    closed_at TIMESTAMP
);

-- ==================== ORDER ITEMS ====================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2),
    price_level INT DEFAULT 1, -- level harga yang digunakan
    special_instructions TEXT, -- "no salt", "extra spicy", etc
    
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'cooking', 'ready', 'served'
    
    -- Calculation
    subtotal DECIMAL(12,2),
    tax_amount DECIMAL(12,2),
    service_amount DECIMAL(12,2),
    total DECIMAL(12,2),
    
    sent_to_kitchen BOOLEAN DEFAULT false,
    sent_to_bar BOOLEAN DEFAULT false,
    sent_at TIMESTAMP,
    ready_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== PAYMENTS ====================
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- 'Cash', 'Debit Card', 'Credit Card', 'E-Wallet', etc
    description TEXT,
    requires_reference BOOLEAN DEFAULT false, -- untuk tracking nomor ref
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    payment_method_id INTEGER REFERENCES payment_methods(id),
    amount DECIMAL(12,2),
    reference_number VARCHAR(100), -- nomor kartu, nomor ref transfer
    status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
    notes TEXT,
    
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== PRINTER CONFIG ====================
CREATE TABLE printer_settings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100), -- 'Kitchen', 'Bar', etc
    printer_type VARCHAR(50), -- 'thermal', 'inkjet'
    ip_address VARCHAR(50),
    port INT,
    paper_width INT DEFAULT 80, -- mm
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==================== KITCHEN MONITOR CONFIG ====================
CREATE TABLE kitchen_monitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100), -- 'Kitchen', 'Bar'
    device_id VARCHAR(100), -- untuk tracking device
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== AUDIT LOG ====================
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100), -- 'create_order', 'payment', 'print'
    entity_type VARCHAR(50), -- 'order', 'payment', 'item'
    entity_id INT,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== INDEXES ====================
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_table_id ON orders(table_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_status ON order_items(status);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_items_category ON items(category_id);
```

---

## 3. **Technology Stack Final**

### **Frontend**
```bash
Technology: React 18 + TypeScript + Vite
├── State Management: Zustand + TanStack Query
├── UI Framework: Shadcn/ui + Tailwind CSS
├── Real-time: Socket.io-client (WebSocket)
├── Print: React-to-print (untuk receipt preview)
├── Offline: IndexedDB + Service Workers
└── Forms: React Hook Form + Zod Validation
```

### **Backend**
```bash
Technology: Node.js + Express + TypeScript
├── ORM: Prisma (auto generate dari schema)
├── Real-time: Socket.io (WebSocket untuk kitchen)
├── Validation: Zod + Express validator
├── Auth: JWT + bcrypt
├── Queue System: Bull (untuk print jobs)
├── Logger: Winston
├── Testing: Jest + Supertest
└── API Docs: Swagger/OpenAPI
```

### **Database & Deployment**
```bash
Database: PostgreSQL
├── Local: PostgreSQL + pgAdmin
├── Production: Supabase / Railway PostgreSQL

Backend Deployment:
├── Development: Localhost
├── Production: Railway / Render / AWS EC2

Frontend Deployment:
├── Development: Vite dev server
├── Production: Vercel / Netlify / Railway

Hardware:
├── Printer: Epson/Bixolon TM series (80mm thermal)
├── Kitchen Display: Any monitor 24"+ 
└── Card Reader: Built-in atau external
```

---

## 4. **Project Structure**

```
pos-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── Restaurant/
│   │   │   │   ├── TableMap.tsx (mapping table)
│   │   │   │   ├── TableSelector.tsx
│   │   │   │   └── TableView.tsx
│   │   │   ├── Order/
│   │   │   │   ├── OrderEntry.tsx (input menu)
│   │   │   │   ├── OrderItem.tsx
│   │   │   │   ├── SpecialInstructions.tsx
│   │   │   │   └── OrderSummary.tsx
│   │   │   ├── Payment/
│   │   │   │   ├── PaymentGateway.tsx
│   │   │   │   ├── PaymentMethod.tsx
│   │   │   │   └── ReceiptPreview.tsx
│   │   │   ├── Kitchen/
│   │   │   │   ├── KitchenDisplay.tsx (monitor dapur)
│   │   │   │   ├── OrderQueue.tsx
│   │   │   │   └── OrderCard.tsx
│   │   │   ├── ItemManagement/
│   │   │   │   ├── ItemList.tsx
│   │   │   │   ├── ItemForm.tsx (input item)
│   │   │   │   ├── PriceLevelEditor.tsx
│   │   │   │   └── CategoryManager.tsx
│   │   │   ├── Printer/
│   │   │   │   ├── PrinterConfig.tsx
│   │   │   │   └── PrinterTest.tsx
│   │   │   └── Common/
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── Loading.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── CashierPOS.tsx (main kasir screen)
│   │   │   ├── KitchenMonitor.tsx
│   │   │   ├── ItemSettings.tsx
│   │   │   └── Reports.tsx
│   │   ├── services/
│   │   │   ├── api.ts (axios config)
│   │   │   ├── authService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── itemService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── printerService.ts
│   │   │   └── socketService.ts (WebSocket)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useOrder.ts
│   │   │   ├── usePrinter.ts
│   │   │   └── useKitchenSocket.ts
│   │   ├── stores/
│   │   │   ├── authStore.ts (Zustand)
│   │   │   ├── orderStore.ts
│   │   │   ├── uiStore.ts
│   │   │   └── printerStore.ts
│   │   ├── types/
│   │   │   ├── index.ts (semua types/interfaces)
│   │   │   └── api.ts
│   │   ├── utils/
│   │   │   ├── formatters.ts (currency, date)
│   │   │   ├── validators.ts
│   │   │   ├── printUtils.ts
│   │   │   └── offlineUtils.ts
│   │   └── App.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── items.routes.ts
│   │   │   ├── orders.routes.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── tables.routes.ts
│   │   │   ├── printers.routes.ts
│   │   │   └── reports.routes.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── itemController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── paymentController.ts
│   │   │   ├── printerController.ts
│   │   │   └── reportController.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── itemService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── printerService.ts (handle printer communication)
│   │   │   ├── kitchenSocketService.ts (WebSocket)
│   │   │   └── reportService.ts
│   │   ├── models/
│   │   │   ├── User.ts (Prisma schema)
│   │   │   ├── Item.ts
│   │   │   ├── Order.ts
│   │   │   ├── Payment.ts
│   │   │   └── ... (auto-generated dari Prisma)
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   └── logging.ts
│   │   ├── utils/
│   │   │   ├── generateCode.ts (auto-generate item code)
│   │   │   ├── calculators.ts (tax, service, total)
│   │   │   ├── printerUtils.ts (handle thermal printer)
│   │   │   └── responseFormatter.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── jwt.ts
│   │   │   ├── socket.ts
│   │   │   └── env.ts
│   │   ├── websocket/
│   │   │   ├── kitchenNamespace.ts
│   │   │   ├── barNamespace.ts
│   │   │   └── printerNamespace.ts
│   │   ├── jobs/
│   │   │   ├── printQueue.ts (Bull queue)
│   │   │   └── orderProcessing.ts
│   │   └── app.ts (main server file)
│   ├── prisma/
│   │   ├── schema.prisma (database schema)
│   │   └── migrations/ (database migrations)
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   ├── docker-compose.yml
│   └── package.json
│
├── docker-compose.yml (untuk local development)
└── README.md
```

---

## 5. **Implementation Plan - Phase by Phase**

### **PHASE 1: MVP (Week 1-4) ⭐**

#### **Week 1-2: Setup & Auth**
```typescript
// Backend - Auth Service Example
// src/services/authService.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/config/database';

export class AuthService {
  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    };
  }

  async register(userData: RegisterInput) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });
  }
}
```

```typescript
// Frontend - Login Component Example
// src/components/Auth/LoginForm.tsx

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authService.login(username, password);
      setAuth(response.user, response.token);
      // navigate to dashboard
    } catch (error) {
      // show error
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

#### **Week 2-3: Table Mapping & Item Management**

```typescript
// Frontend - Table Map Component
// src/components/Restaurant/TableMap.tsx

import { useQuery } from '@tanstack/react-query';
import { tableService } from '@/services/tableService';
import { useOrderStore } from '@/stores/orderStore';

export function TableMap() {
  const { data: tables } = useQuery({
    queryKey: ['tables'],
    queryFn: () => tableService.getTables()
  });

  const setSelectedTable = useOrderStore((s) => s.setSelectedTable);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {tables?.map((table) => (
        <div
          key={table.id}
          onClick={() => setSelectedTable(table)}
          className={`
            p-6 rounded-lg cursor-pointer transition
            ${table.status === 'occupied' ? 'bg-red-500' : 'bg-green-500'}
            text-white text-center
          `}
        >
          <div className="text-2xl font-bold">{table.tableNumber}</div>
          <div className="text-sm">{table.status}</div>
        </div>
      ))}
    </div>
  );
}
```

```typescript
// Backend - Item Management API
// src/controllers/itemController.ts

export class ItemController {
  async createItem(req: Request, res: Response) {
    const {
      code,
      name,
      category_id,
      department_id,
      price_level_1,
      price_level_2,
      price_level_3,
      price_level_4,
      price_level_5,
      tax_percentage,
      service_percentage,
      printer_location,
      is_show_kitchen_monitor
    } = req.body;

    // Auto-generate code jika tidak diberikan
    const itemCode = code || await this.generateItemCode(category_id);

    const item = await prisma.item.create({
      data: {
        code: itemCode,
        name,
        category_id,
        department_id,
        price_level_1,
        price_level_2,
        price_level_3,
        price_level_4,
        price_level_5,
        tax_percentage,
        service_percentage,
        printer_location,
        is_show_kitchen_monitor
      }
    });

    res.json(item);
  }

  async getItems(req: Request, res: Response) {
    const items = await prisma.item.findMany({
      where: { is_active: true },
      include: {
        category: true,
        department: true
      }
    });

    res.json(items);
  }
}
```

#### **Week 3-4: Order Entry & Basic Payment**

```typescript
// Frontend - Order Entry Component
// src/components/Order/OrderEntry.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { itemService } from '@/services/itemService';
import { useOrderStore } from '@/stores/orderStore';

export function OrderEntry() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: () => itemService.getItems()
  });

  const selectedTable = useOrderStore((s) => s.selectedTable);
  const addItem = useOrderStore((s) => s.addItem);

  const handleAddItem = (item: Item, quantity: number, priceLevel: number) => {
    addItem({
      item,
      quantity,
      priceLevel,
      specialInstructions: ''
    });
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Menu Items */}
      <div className="flex-1">
        <h2>Menu Items</h2>
        <div className="grid grid-cols-3 gap-2">
          {items?.map((item) => (
            <button
              key={item.id}
              onClick={() => handleAddItem(item, 1, 1)}
              className="p-4 bg-gray-100 rounded hover:bg-gray-200"
            >
              <div className="font-bold">{item.name}</div>
              <div className="text-sm text-gray-600">
                Rp {item.price_level_1.toLocaleString('id-ID')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-80 bg-white border rounded p-4">
        <h3 className="font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x{item.quantity}</span>
              <span>Rp {item.total.toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### **PHASE 2: Core Features (Week 5-8)**

#### **Week 5: Printer Integration & Kitchen Display**

```typescript
// Backend - Printer Service
// src/services/printerService.ts

import { ThermalPrinter } from 'escpos-pdfkit'; // atau library lain
import net from 'net';

export class PrinterService {
  private printers: Map<string, any> = new Map();

  async initializePrinter(settings: PrinterSettings) {
    const printer = new ThermalPrinter({
      ip: settings.ip_address,
      port: settings.port,
      width: settings.paper_width,
      reconnectOnTimeout: true
    });

    this.printers.set(settings.id, printer);
  }

  async printReceipt(orderId: number, printerLocation: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        order_items: {
          include: { item: true }
        },
        payments: true
      }
    });

    const printer = this.printers.get(printerLocation);

    // Format receipt
    printer.alignCenter();
    printer.println('='.repeat(40));
    printer.println('RECEIPT');
    printer.println('='.repeat(40));
    
    printer.println(`Order #: ${order.order_number}`);
    printer.println(`Date: ${new Date().toLocaleString('id-ID')}`);
    printer.println('');

    // Items
    order.order_items.forEach((item) => {
      const line = `${item.item.name} x${item.quantity}`.padEnd(30);
      const price = `Rp ${item.total.toLocaleString('id-ID')}`.padStart(10);
      printer.println(line + price);
    });

    printer.println('-'.repeat(40));
    printer.println(`Total: Rp ${order.grand_total.toLocaleString('id-ID')}`);
    
    // Print
    await printer.print();
  }

  async sendToKitchen(orderId: number) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: { include: { item: true } } }
    });

    // Send ke printer kitchen via socket.io
    const kitchenItems = order.order_items.filter(
      (oi) => oi.item.printer_location === 'Kitchen' || oi.item.printer_location === 'Both'
    );

    return kitchenItems;
  }
}
```

```typescript
// Frontend - Kitchen Display Component
// src/components/Kitchen/KitchenDisplay.tsx

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQuery } from '@tanstack/react-query';

export function KitchenDisplay() {
  const [orders, setOrders] = useState([]);
  const socket = io(); // connect to WebSocket

  useEffect(() => {
    socket.on('new_order', (order) => {
      setOrders((prev) => [order, ...prev]);
      // Play sound notification
      playNotificationSound();
    });

    socket.on('order_marked_ready', (orderId) => {
      setOrders((prev) =>
        prev.map((o) => o.id === orderId ? { ...o, status: 'ready' } : o)
      );
    });

    return () => socket.disconnect();
  }, []);

  const markOrderReady = (orderId: number) => {
    socket.emit('mark_ready', { orderId });
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-900 text-white h-screen">
      {orders.map((order) => (
        <div
          key={order.id}
          className={`p-4 rounded-lg ${
            order.status === 'ready' ? 'bg-green-600' : 'bg-blue-600'
          }`}
        >
          <div className="text-2xl font-bold mb-4">Order #{order.order_number}</div>
          
          {order.order_items.map((item) => (
            <div key={item.id} className="mb-3 pb-3 border-b">
              <div className="text-lg font-bold">{item.item.name}</div>
              <div className="text-gray-300">Qty: {item.quantity}</div>
              {item.special_instructions && (
                <div className="text-yellow-300 text-sm mt-1">
                  📝 {item.special_instructions}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => markOrderReady(order.id)}
            className="w-full mt-4 bg-green-700 hover:bg-green-800 py-2 rounded font-bold"
          >
            Mark Ready ✓
          </button>
        </div>
      ))}
    </div>
  );
}
```

#### **Week 6-7: Payment Processing**

```typescript
// Backend - Payment Controller
// src/controllers/paymentController.ts

export class PaymentController {
  async processPayment(req: Request, res: Response) {
    const {
      order_id,
      payment_method_id,
      amount,
      reference_number
    } = req.body;

    const order = await prisma.order.findUnique({
      where: { id: order_id }
    });

    if (amount < order.grand_total) {
      return res.status(400).json({
        error: 'Insufficient payment amount'
      });
    }

    // Process payment
    const payment = await prisma.payment.create({
      data: {
        order_id,
        payment_method_id,
        amount,
        reference_number,
        processed_by: req.user.id
      }
    });

    // Update order status
    await prisma.order.update({
      where: { id: order_id },
      data: { status: 'closed' }
    });

    // Generate receipt
    const receipt = await this.generateReceipt(order, payment);

    res.json({
      payment,
      receipt,
      change: amount - order.grand_total
    });
  }

  private async generateReceipt(order: any, payment: any) {
    return {
      orderNumber: order.order_number,
      total: order.grand_total,
      paymentMethod: payment.payment_method_id,
      timestamp: new Date()
    };
  }
}
```

```typescript
// Frontend - Payment Gateway Component
// src/components/Payment/PaymentGateway.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paymentService } from '@/services/paymentService';
import { useOrderStore } from '@/stores/orderStore';

export function PaymentGateway() {
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState(currentOrder?.grand_total || 0);
  const [processing, setProcessing] = useState(false);

  const { data: paymentMethods } = useQuery({
    queryKey: ['payment_methods'],
    queryFn: () => paymentService.getPaymentMethods()
  });

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const result = await paymentService.process({
        order_id: currentOrder.id,
        payment_method_id: selectedMethod,
        amount,
        reference_number: ''
      });

      // Show receipt
      window.print(); // Simple print

      // Clear order
      useOrderStore.getState().clearOrder();
    } catch (error) {
      alert('Payment failed: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const change = amount - currentOrder?.grand_total;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>Rp {currentOrder?.subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>Rp {currentOrder?.tax_amount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>Total:</span>
            <span>Rp {currentOrder?.grand_total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Payment Method</label>
          <select
            value={selectedMethod || ''}
            onChange={(e) => setSelectedMethod(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select method...</option>
            {paymentMethods?.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Received */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Amount Received</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Change */}
        <div className="bg-green-100 p-4 rounded mb-6">
          <div className="text-lg">
            Change: <span className="font-bold">
              Rp {change.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => useOrderStore.getState().closeModal()}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing || !selectedMethod}
            className="flex-1 bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### **Week 8: WebSocket Real-time Updates**

```typescript
// Backend - Socket.io Setup
// src/websocket/kitchenNamespace.ts

import { Server, Socket } from 'socket.io';
import { prisma } from '@/config/database';

export function setupKitchenNamespace(io: Server) {
  const kitchen = io.of('/kitchen');

  kitchen.on('connection', (socket: Socket) => {
    console.log('Kitchen display connected:', socket.id);

    // Join kitchen monitor group
    socket.on('join_kitchen', (monitorId: string) => {
      socket.join(`kitchen_${monitorId}`);
      console.log(`Socket joined kitchen_${monitorId}`);
    });

    // Listen for order completion
    socket.on('order_completed', async (orderId: number) => {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'ready', ready_at: new Date() }
      });

      // Broadcast to cashier
      io.of('/cashier').emit('order_ready', order);
    });

    socket.on('disconnect', () => {
      console.log('Kitchen display disconnected:', socket.id);
    });
  });
}

// Backend - Send order to kitchen
export async function sendOrderToKitchen(orderId: number, io: Server) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { order_items: { include: { item: true } } }
  });

  // Group items by printer location
  const kitchenItems = order.order_items.filter(
    (oi) => oi.item.printer_location.includes('Kitchen')
  );
  const barItems = order.order_items.filter(
    (oi) => oi.item.printer_location.includes('Bar')
  );

  if (kitchenItems.length > 0) {
    io.of('/kitchen').emit('new_order', {
      orderId: order.id,
      orderNumber: order.order_number,
      items: kitchenItems,
      createdAt: new Date()
    });
  }

  if (barItems.length > 0) {
    io.of('/bar').emit('new_order', {
      orderId: order.id,
      orderNumber: order.order_number,
      items: barItems,
      createdAt: new Date()
    });
  }
}
```

```typescript
// Frontend - Socket Connection Hook
// src/hooks/useKitchenSocket.ts

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useOrderStore } from '@/stores/orderStore';

export function useKitchenSocket() {
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001', {
      path: '/socket.io',
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socket.on('new_order', (order) => {
      console.log('New order received:', order);
      // Update kitchen display
    });

    socket.on('order_ready', (order) => {
      useOrderStore.getState().updateOrderStatus(order.id, 'ready');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => socket.disconnect();
  }, []);
}
```

---

### **PHASE 3: Advanced Features (Week 9-12)**

#### **Week 9: Multi-level Pricing & Discounts**

```typescript
// Frontend - Price Level Selection
// src/components/Order/PriceLevelSelector.tsx

export function PriceLevelSelector({ item, onSelect }) {
  const levels = [1, 2, 3, 4, 5].filter(
    (level) => item[`price_level_${level}`] !== null
  );

  return (
    <div className="space-y-2">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className="w-full p-3 border rounded hover:bg-blue-50"
        >
          <div className="font-bold">Level {level}</div>
          <div className="text-lg">
            Rp {item[`price_level_${level}`].toLocaleString('id-ID')}
          </div>
        </button>
      ))}
    </div>
  );
}
```

```typescript
// Backend - Calculate with Multiple Tax/Service
// src/utils/calculators.ts

export function calculateOrderTotal(orderItems: OrderItem[], applyTax: boolean, applyService: boolean) {
  let subtotal = 0;
  let totalTax = 0;
  let totalService = 0;

  orderItems.forEach((item) => {
    const itemSubtotal = item.unit_price * item.quantity;
    
    let itemTax = 0;
    let itemService = 0;
    
    if (applyTax && item.item.tax_percentage > 0) {
      itemTax = itemSubtotal * (item.item.tax_percentage / 100);
    }
    
    if (applyService && item.item.service_percentage > 0) {
      itemService = itemSubtotal * (item.item.service_percentage / 100);
    }

    item.tax_amount = itemTax;
    item.service_amount = itemService;
    item.total = itemSubtotal + itemTax + itemService;
    
    subtotal += itemSubtotal;
    totalTax += itemTax;
    totalService += itemService;
  });

  return {
    subtotal,
    tax_amount: totalTax,
    service_amount: totalService,
    grand_total: subtotal + totalTax + totalService
  };
}

export function applyDiscount(
  total: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number
): number {
  if (discountType === 'percentage') {
    return total - (total * discountValue / 100);
  }
  return total - discountValue;
}
```

#### **Week 10: Advanced Reporting**

```typescript
// Backend - Report Service
// src/services/reportService.ts

export class ReportService {
  async getDailySalesReport(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        created_at: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: 'closed'
      },
      include: {
        order_items: true,
        payments: true
      }
    });

    const report = {
      date,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.grand_total, 0),
      totalTax: orders.reduce((sum, o) => sum + o.tax_amount, 0),
      totalService: orders.reduce((sum, o) => sum + o.service_amount, 0),
      paymentBreakdown: this.getPaymentBreakdown(orders),
      topItems: this.getTopItems(orders),
      hourlyData: this.getHourlyData(orders)
    };

    return report;
  }

  private getPaymentBreakdown(orders: any[]) {
    const breakdown = {};
    orders.forEach((order) => {
      order.payments.forEach((payment) => {
        breakdown[payment.payment_method_id] =
          (breakdown[payment.payment_method_id] || 0) + payment.amount;
      });
    });
    return breakdown;
  }

  private getTopItems(orders: any[]) {
    const items = {};
    orders.forEach((order) => {
      order.order_items.forEach((item) => {
        if (!items[item.item_id]) {
          items[item.item_id] = { quantity: 0, revenue: 0 };
        }
        items[item.item_id].quantity += item.quantity;
        items[item.item_id].revenue += item.total;
      });
    });
    return items;
  }
}
```

#### **Week 11-12: Inventory & Analytics**

```typescript
// Backend - Inventory Service
// src/services/inventoryService.ts

export class InventoryService {
  async trackItemUsage(orderId: number) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: true }
    });

    for (const item of order.order_items) {
      // Decrease inventory
      await prisma.inventory.update({
        where: { item_id: item.item_id },
        data: {
          quantity: { decrement: item.quantity }
        }
      });

      // Check if low stock
      const inventory = await prisma.inventory.findUnique({
        where: { item_id: item.item_id }
      });

      if (inventory.quantity < inventory.min_alert) {
        // Send alert
        console.log(`Low stock alert for item ${item.item_id}`);
      }
    }
  }
}
```

---

## 6. **Key Implementation Details**

### **A. Thermal Printer Integration**

```typescript
// Install: npm install escpos

import Printer from 'escpos';
import Network from 'escpos-network';

async function printReceipt(order: Order) {
  const device = new Network('192.168.1.100'); // IP printer
  const printer = new Printer(device);

  printer
    .openCashDrawer()
    .feed(2)
    .alignCenter()
    .style('B')
    .size(2, 2)
    .text('RECEIPT')
    .feed()
    
    .align('left')
    .style('normal')
    .tableCustom([
      { text: "Item", align: "LEFT", width: 0.5 },
      { text: "Qty", align: "CENTER", width: 0.25 },
      { text: "Price", align: "RIGHT", width: 0.25 }
    ])
    
    .feed()
    .drawLine()
    .tableCustom([
      { text: `Total: Rp ${order.grand_total.toLocaleString()}`, align: "RIGHT", width: 1 }
    ])
    
    .feed(2)
    .qrimage('https://example.com', { type: 'image/png' }, (err) => {
      if (err) throw err;
    })
    .close();
}
```

### **B. Offline Capability**

```typescript
// Frontend - Service Worker untuk offline
// src/utils/offlineUtils.ts

async function syncOfflineOrders() {
  const db = new IndexedDB('pos-db');
  const offlineOrders = await db.getAll('pending_orders');

  for (const order of offlineOrders) {
    try {
      await api.post('/orders', order);
      await db.delete('pending_orders', order.id);
    } catch (error) {
      console.error('Failed to sync order:', error);
    }
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### **C. Custom Payment Methods**

```typescript
// Backend - Add custom payment method
// src/routes/payments.routes.ts

router.post('/payment-methods', async (req, res) => {
  const { name, requires_reference } = req.body;

  const method = await prisma.payment_method.create({
    data: { name, requires_reference }
  });

  res.json(method);
});
```

---

## 7. **Security Checklist**

```
✅ Authentication & Authorization
  - JWT token validation setiap request
  - Role-based access control (RBAC)
  - Password hashing (bcrypt)

✅ Data Protection
  - HTTPS/SSL encryption
  - SQL injection prevention (Prisma)
  - XSS protection (React auto-escaping)
  - CSRF tokens

✅ Payment Security
  - PCI-DSS compliance jika pakai card
  - Jangan store full card details
  - Encrypt sensitive data

✅ Audit & Logging
  - Log semua transaksi
  - Track user actions
  - Maintain audit trail

✅ Backup & Recovery
  - Daily database backup
  - Point-in-time recovery
  - Disaster recovery plan
```

---

## 8. **Estimasi Timeline & Effort**

```
MVP (Phase 1):      4 minggu  ~ 160 jam
Core Features:      4 minggu  ~ 160 jam
Advanced:           4 minggu  ~ 160 jam
Testing & Deploy:   2 minggu  ~ 80 jam
─────────────────────────────
TOTAL:              14 minggu ~ 560 jam
Rata-rata: 8-10 jam/hari untuk 1 orang

Dengan AI assistance bisa percepat hingga 30-40%
Final Timeline: 10-11 minggu yang realistis
```

---

## 9. **Pertanyaan Follow-up**

Sebelum mulai, clarify:

1. **Hardware**: Budget berapa untuk printer dan display?
2. **Database**: Data berapa tahun yang perlu di-retain?
3. **Localization**: Bahasa apa saja yang perlu support?
4. **Printer**: Thermal atau inkjet? Merk apa?
5. **Card Payment**: Pakai payment gateway apa? (Midtrans, Stripe, dll)
6. **Multi-outlet**: Kapan fitur ini dibutuhkan?
7. **Mobile**: Perlu mobile app atau web-based aja?

---

Ini roadmap yang sangat actionable. **Mulai dari Phase 1, jangan lompat-lompat**. Dengan bantuan AI (saya included! 😊), 1 orang bisa finish MVP dalam 4 minggu.

**Next step?** Mari kita mulai setup project structure & database schema. Kode mana yang ingin Anda kerjakan dulu?



User:

Hardware: bisa dengan PC dari spesifikasi yang support menggunakan web base baik nanti di gunakan secara local offline atau pun di letakan VPS online ,operating system universal agar memudahkan
Database: Data berapa tahun yang perlu di-retain? mungkin data bisa di lihat perhari per minggun dan perbulan hingga per tahun , namun data base dan keseluruhan data ada dan dapat di backup sebagaimana mitigasi masalah yang ada di dalam sistem
Localization: Bahasa apa saja yang perlu support? English untuk universal sisanya bisa Indonesia ataupun Bahasa yang di minta atau di request client
Printer: Thermal atau inkjet? Merk apa? printer bisa dot matrik atau thermal merk bebas , base cina ataupun Epson untuk kendalai printer bisa usb , ethernet , ataupun port yang umum di printer
Card Payment: Pakai payment gateway apa? saya rasa ini sementara bersifat offline dahulu sblm bisa di joinkan ke payment gate way
Multi-outlet: Kapan fitur ini dibutuhkan? sebelum multi outlet aku ingin multi device dahulu , multi outlet terjadi jika system type online 
Mobile: Perlu mobile app atau web-based aja? web base saja agar memudahkan devide yang di gunakan dan beragam



Claude Sonnet 4.6:

# Sistem POS Restaurant & Retail - Technical Specification & Implementation

Sempurna! Sekarang specnya jelas. Mari kita buat **production-ready system** dengan fokus pada **web-based, offline-first, dan multi-device capability**.

---

## 1. **Tech Stack Final - Optimized untuk Requirements**

### **Frontend - Web-Based Universal**
```bash
React 18 + TypeScript + Vite
├── State Management: Zustand + TanStack Query
├── Offline: IndexedDB + Service Workers (PWA)
├── Real-time: Socket.io-client (optional untuk online mode)
├── Printing: thermal-printer library (USB/Network)
├── UI: Shadcn/ui + Tailwind CSS
├── Localization: i18next (English, Bahasa Indonesia, extensible)
├── Storage: Dexie.js (wrapper IndexedDB - lebih mudah)
└── Testing: Vitest + React Testing Library
```

### **Backend - Node.js Flexible**
```bash
Node.js + Express + TypeScript
├── Database: PostgreSQL (lokal atau online)
├── ORM: Prisma (auto-migration, type-safe)
├── Real-time: Socket.io (WebSocket)
├── Queue: Bull (untuk printer jobs)
├── Auth: JWT + bcrypt
├── Validation: Zod
├── Logging: Winston
├── Process Management: PM2 (production)
├── API Docs: Swagger
└── Testing: Jest + Supertest
```

### **Printer Integration**
```bash
Thermal Printer Support:
├── USB Connection: escpos-usb (Node.js backend)
├── Network/Ethernet: escpos-network
├── Dot Matrix: escpos generic support
├── Brands: Epson TM, Bixolon, Xprinter, generic ESC/POS
└── Control Library: escpos-kotlin / escpos-js
```

### **Deployment Architecture**
```
┌─────────────────────────────────────────────────────┐
│           LOCAL/OFFLINE SETUP                       │
│  ┌─────────────────────────────────────────────┐    │
│  │ PC Windows/Linux/Mac                        │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ Chrome/Edge/Firefox (PWA)                │  │    │
│  │ http://localhost:3000                    │  │    │
│  └──────────────────────────────────────────┘  │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ Backend API (Node.js)                    │  │    │
│  │ http://localhost:3001                    │  │    │
│  └──────────────────────────────────────────┘  │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ PostgreSQL (Lokal)                       │  │    │
│  │ Port 5432                                │  │    │
│  └──────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│           ↓ (Network LAN)                           │
│  ┌─────────────────────────────────────────────┐    │
│  │ Multi-Device di LAN                       │    │
│  │ ├─ Cashier PC 1: http://192.168.1.10     │    │
│  │ ├─ Cashier PC 2: http://192.168.1.11     │    │
│  │ ├─ Kitchen Display: http://192.168.1.12  │    │
│  │ └─ Bar Display: http://192.168.1.13      │    │
│  └─────────────────────────────────────────────┘    │
│           ↓ (Shared Database)                       │
│  ┌─────────────────────────────────────────────┐    │
│  │ Thermal Printers (USB/Network)            │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           ONLINE/VPS SETUP                          │
│  ┌─────────────────────────────────────────────┐    │
│  │ VPS Server (Linux - Ubuntu 22.04)          │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ Docker Container #1: Frontend (Nginx)     │  │    │
│  │ https://yourdomain.com                    │  │    │
│  └──────────────────────────────────────────┘  │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ Docker Container #2: Backend (Node.js)   │  │    │
│  │ https://api.yourdomain.com                │  │    │
│  └──────────────────────────────────────────┘  │    │
│  ├──────────────────────────────────────────┐  │    │
│  │ Docker Container #3: PostgreSQL          │  │    │
│  │ Internal network only                    │  │    │
│  └──────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│           ↓ (Internet)                              │
│  ┌─────────────────────────────────────────────┐    │
│  │ Multi-Device Access                       │    │
│  │ ├─ From Anywhere                          │    │
│  │ ├─ With/Without VPN                       │    │
│  │ └─ Real-time Sync                         │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## 2. **Printer Driver Architecture (Multi-Device Support)**

```typescript
// Backend - src/services/printerService.ts

import Printer from 'escpos';
import USBPrinter from 'escpos-usb';
import NetworkPrinter from 'escpos-network';
import { EventEmitter } from 'events';

export enum PrinterType {
  USB = 'usb',
  NETWORK = 'network',
  SERIAL = 'serial'
}

export enum PrinterBrand {
  EPSON = 'epson',
  BIXOLON = 'bixolon',
  XPRINTER = 'xprinter',
  GENERIC = 'generic'
}

export interface PrinterConfig {
  id: string;
  name: string;
  type: PrinterType;
  brand: PrinterBrand;
  location: string; // 'Kitchen', 'Bar', 'Cashier'
  
  // USB Config
  vendorId?: number;
  productId?: number;
  
  // Network Config
  ipAddress?: string;
  port?: number;
  
  // Serial Config
  serialPort?: string;
  baudRate?: number;
  
  paperWidth: number; // mm (58, 80)
  isActive: boolean;
  lastConnected?: Date;
}

class PrinterManager extends EventEmitter {
  private printers: Map<string, any> = new Map();
  private printQueue: any[] = [];
  private isProcessing: boolean = false;

  async initializePrinters(configs: PrinterConfig[]) {
    for (const config of configs) {
      try {
        const printer = await this.createPrinterConnection(config);
        this.printers.set(config.id, { config, printer, connected: true });
        this.emit('printer_connected', config.id);
        console.log(`✓ Printer initialized: ${config.name}`);
      } catch (error) {
        console.error(`✗ Failed to initialize printer ${config.name}:`, error);
        this.printers.set(config.id, { 
          config, 
          printer: null, 
          connected: false,
          error: error.message 
        });
        this.emit('printer_error', { printerId: config.id, error });
      }
    }
  }

  private async createPrinterConnection(config: PrinterConfig) {
    let device;

    switch (config.type) {
      case PrinterType.USB:
        device = new USBPrinter(config.vendorId, config.productId);
        break;
      
      case PrinterType.NETWORK:
        device = new NetworkPrinter(config.ipAddress, config.port || 9100);
        break;
      
      case PrinterType.SERIAL:
        // Serial printer implementation
        // Require serialport library
        device = await this.createSerialConnection(config);
        break;
      
      default:
        throw new Error(`Unsupported printer type: ${config.type}`);
    }

    return new Printer(device, { width: config.paperWidth });
  }

  private createSerialConnection(config: PrinterConfig) {
    // Will implement with serialport library if needed
    throw new Error('Serial printer support - implement if needed');
  }

  async printReceipt(
    printerId: string,
    orderData: any,
    receiptFormat: 'normal' | 'kitchen' | 'bar'
  ) {
    return new Promise((resolve, reject) => {
      this.printQueue.push({
        printerId,
        orderData,
        receiptFormat,
        resolve,
        reject,
        timestamp: Date.now()
      });

      this.processPrintQueue();
    });
  }

  private async processPrintQueue() {
    if (this.isProcessing || this.printQueue.length === 0) return;

    this.isProcessing = true;
    const job = this.printQueue.shift();

    try {
      const printerEntry = this.printers.get(job.printerId);
      
      if (!printerEntry || !printerEntry.connected) {
        throw new Error(`Printer not connected: ${job.printerId}`);
      }

      const { printer, config } = printerEntry;
      
      // Format receipt berdasarkan jenis
      await this.formatAndPrint(
        printer,
        job.orderData,
        job.receiptFormat,
        config
      );

      this.emit('print_success', { 
        printerId: job.printerId,
        timestamp: new Date()
      });
      
      job.resolve({ success: true });
    } catch (error) {
      console.error('Print error:', error);
      this.emit('print_error', {
        printerId: job.printerId,
        error: error.message
      });
      job.reject(error);
    } finally {
      this.isProcessing = false;
      // Proses job berikutnya
      if (this.printQueue.length > 0) {
        setImmediate(() => this.processPrintQueue());
      }
    }
  }

  private async formatAndPrint(
    printer: any,
    orderData: any,
    format: 'normal' | 'kitchen' | 'bar',
    config: PrinterConfig
  ) {
    printer
      .openCashDrawer()
      .newLine();

    if (format === 'normal') {
      // Customer Receipt Format
      this.printCustomerReceipt(printer, orderData);
    } else if (format === 'kitchen') {
      // Kitchen Order Format (simpler, bigger fonts)
      this.printKitchenOrder(printer, orderData);
    } else if (format === 'bar') {
      // Bar Order Format
      this.printBarOrder(printer, orderData);
    }

    printer
      .newLine()
      .newLine()
      .cut();

    await printer.execute();
  }

  private printCustomerReceipt(printer: any, order: any) {
    printer
      .align('center')
      .setTextSize(2, 2)
      .bold()
      .text('RECEIPT')
      .setTextSize(1, 1)
      .normal()
      .text('================================')
      .text(`Order #: ${order.order_number}`)
      .text(`Date: ${new Date(order.created_at).toLocaleString('id-ID')}`)
      .text('================================')
      .newLine();

    // Items
    printer.align('left');
    order.order_items.forEach((item: any) => {
      const name = item.item.name.substring(0, 25);
      const qty = `x${item.quantity}`.padStart(3);
      const price = `Rp ${item.total.toLocaleString('id-ID')}`.padStart(15);
      
      printer.text(`${name} ${qty} ${price}`);
    });

    printer.text('================================');
    printer.align('right');
    printer.text(`Subtotal: Rp ${order.subtotal.toLocaleString('id-ID')}`);
    
    if (order.tax_amount > 0) {
      printer.text(`Tax: Rp ${order.tax_amount.toLocaleString('id-ID')}`);
    }
    
    if (order.service_amount > 0) {
      printer.text(`Service: Rp ${order.service_amount.toLocaleString('id-ID')}`);
    }

    printer
      .setTextSize(2, 2)
      .bold()
      .text(`Total: Rp ${order.grand_total.toLocaleString('id-ID')}`)
      .normal()
      .setTextSize(1, 1);

    // QR Code (optional)
    if (order.id) {
      try {
        printer.newLine();
        printer.align('center');
        printer.qrimage(
          JSON.stringify({ orderId: order.id, timestamp: order.created_at }),
          { type: 'image/png' }
        );
      } catch (e) {
        // QR not supported
      }
    }
  }

  private printKitchenOrder(printer: any, order: any) {
    printer
      .align('center')
      .setTextSize(3, 3)
      .bold()
      .text('ORDER #')
      .text(order.order_number)
      .normal()
      .setTextSize(1, 1)
      .text(`Table: ${order.table?.table_number || 'Takeaway'}`)
      .text(`Time: ${new Date().toLocaleTimeString('id-ID')}`)
      .text('================================')
      .newLine();

    // Items only (kitchen doesn't need prices)
    printer.align('left');
    order.order_items.forEach((item: any) => {
      printer
        .setTextSize(2, 2)
        .bold()
        .text(`${item.item.name}`)
        .normal()
        .setTextSize(1, 1)
        .text(`Qty: ${item.quantity}`);
      
      if (item.special_instructions) {
        printer
          .bold()
          .text(`Note: ${item.special_instructions}`)
          .normal();
      }
      printer.newLine();
    });
  }

  private printBarOrder(printer: any, order: any) {
    // Similar to kitchen but for bar items
    printer
      .align('center')
      .setTextSize(2, 2)
      .bold()
      .text('BAR ORDER #')
      .text(order.order_number)
      .normal()
      .setTextSize(1, 1)
      .text(`Table: ${order.table?.table_number || 'Takeaway'}`)
      .newLine();

    printer.align('left');
    order.order_items.forEach((item: any) => {
      printer
        .setTextSize(2, 2)
        .bold()
        .text(`${item.item.name}`)
        .normal()
        .setTextSize(1, 1)
        .text(`Qty: ${item.quantity}`);
      printer.newLine();
    });
  }

  getPrinterStatus(printerId: string) {
    const entry = this.printers.get(printerId);
    if (!entry) return null;

    return {
      id: printerId,
      name: entry.config.name,
      location: entry.config.location,
      connected: entry.connected,
      type: entry.config.type,
      lastConnected: entry.config.lastConnected,
      error: entry.error || null
    };
  }

  getAllPrinterStatus() {
    const statuses: any[] = [];
    this.printers.forEach((entry, printerId) => {
      statuses.push(this.getPrinterStatus(printerId));
    });
    return statuses;
  }

  async testPrinter(printerId: string) {
    try {
      const printerEntry = this.printers.get(printerId);
      if (!printerEntry || !printerEntry.connected) {
        throw new Error('Printer not connected');
      }

      const { printer } = printerEntry;
      printer
        .align('center')
        .text('TEST PRINT')
        .text(`Time: ${new Date().toLocaleString('id-ID')}`)
        .text('Printer is working correctly!')
        .newLine()
        .cut();

      await printer.execute();
      return { success: true, message: 'Test print sent successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const printerManager = new PrinterManager();
```

---

## 3. **Offline-First Architecture**

```typescript
// Frontend - src/services/offlineService.ts

import Dexie, { Table } from 'dexie';

// Initialize IndexedDB
export class POSDatabase extends Dexie {
  orders!: Table<any>;
  order_items!: Table<any>;
  payments!: Table<any>;
  items!: Table<any>;
  sync_queue!: Table<any>;

  constructor() {
    super('pos-db');
    this.version(1).stores({
      orders: '++id, order_number, created_at, status',
      order_items: '++id, order_id, item_id',
      payments: '++id, order_id',
      items: '++id, code, category_id',
      sync_queue: '++id, entity_type, entity_id, status, created_at'
    });
  }
}

export const db = new POSDatabase();

// Offline State Management
// src/stores/offlineStore.ts

import { create } from 'zustand';

interface OfflineState {
  isOnline: boolean;
  pendingSyncCount: number;
  lastSyncTime: Date | null;
  syncInProgress: boolean;
  
  setOnline: (online: boolean) => void;
  addToSyncQueue: (data: any) => void;
  getSyncQueue: () => Promise<any[]>;
  syncWithServer: () => Promise<void>;
  clearSyncQueue: () => Promise<void>;
}

export const useOfflineStore = create<OfflineState>((set, get) => ({
  isOnline: navigator.onLine,
  pendingSyncCount: 0,
  lastSyncTime: null,
  syncInProgress: false,

  setOnline: (online: boolean) => {
    set({ isOnline: online });
    if (online && !get().syncInProgress) {
      get().syncWithServer();
    }
  },

  addToSyncQueue: async (data: any) => {
    await db.sync_queue.add({
      entity_type: data.type,
      entity_id: data.id,
      data,
      status: 'pending',
      created_at: new Date(),
      attempts: 0
    });

    set((state) => ({
      pendingSyncCount: state.pendingSyncCount + 1
    }));
  },

  getSyncQueue: async () => {
    return await db.sync_queue
      .where('status')
      .equals('pending')
      .toArray();
  },

  syncWithServer: async () => {
    set({ syncInProgress: true });
    
    try {
      const queue = await get().getSyncQueue();
      
      for (const item of queue) {
        try {
          // Send to server
          const response = await fetch('/api/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.data)
          });

          if (response.ok) {
            await db.sync_queue.update(item.id, { status: 'synced' });
            set((state) => ({
              pendingSyncCount: Math.max(0, state.pendingSyncCount - 1)
            }));
          } else {
            // Retry logic
            item.attempts++;
            if (item.attempts < 3) {
              await db.sync_queue.update(item.id, { attempts: item.attempts });
            } else {
              await db.sync_queue.update(item.id, { status: 'failed' });
            }
          }
        } catch (error) {
          console.error('Sync error:', error);
          // Keep in queue for retry
        }
      }

      set({ lastSyncTime: new Date() });
    } finally {
      set({ syncInProgress: false });
    }
  },

  clearSyncQueue: async () => {
    await db.sync_queue.where('status').equals('synced').delete();
    set({ pendingSyncCount: 0 });
  }
}));

// Service Worker for offline capability
// public/sw.js

const CACHE_NAME = 'pos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        return caches.match('/offline.html');
      });
    })
  );
});
```

---

## 4. **Multi-Device Local Network Setup**

```typescript
// Backend - src/websocket/multiDeviceSync.ts

import { Server, Socket } from 'socket.io';
import { db } from '@prisma/client';

export function setupMultiDeviceSync(io: Server) {
  const cashierNamespace = io.of('/cashier');
  const kitchenNamespace = io.of('/kitchen');
  const barNamespace = io.of('/bar');

  // Cashier - Main Order Entry
  cashierNamespace.on('connection', (socket: Socket) => {
    console.log(`Cashier device connected: ${socket.id}`);
    
    socket.on('order_created', async (orderData) => {
      // Save to database
      const order = await prisma.order.create({
        data: orderData,
        include: { order_items: { include: { item: true } } }
      });

      // Broadcast to kitchen/bar
      const kitchenItems = order.order_items.filter(
        (oi) => oi.item.printer_location.includes('Kitchen')
      );
      const barItems = order.order_items.filter(
        (oi) => oi.item.printer_location.includes('Bar')
      );

      if (kitchenItems.length > 0) {
        kitchenNamespace.emit('new_order', {
          orderId: order.id,
          orderNumber: order.order_number,
          items: kitchenItems,
          timestamp: new Date()
        });
      }

      if (barItems.length > 0) {
        barNamespace.emit('new_order', {
          orderId: order.id,
          orderNumber: order.order_number,
          items: barItems,
          timestamp: new Date()
        });
      }

      // Broadcast to all cashier devices
      cashierNamespace.emit('order_status_update', {
        orderId: order.id,
        status: 'sent_to_kitchen'
      });
    });

    socket.on('payment_processed', (paymentData) => {
      cashierNamespace.emit('order_closed', paymentData);
    });

    socket.on('disconnect', () => {
      console.log(`Cashier device disconnected: ${socket.id}`);
    });
  });

  // Kitchen Display
  kitchenNamespace.on('connection', (socket: Socket) => {
    console.log(`Kitchen display connected: ${socket.id}`);

    socket.on('order_marked_ready', async (orderId) => {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'ready' }
      });

      // Notify cashier
      cashierNamespace.emit('order_ready', { orderId });
    });

    socket.on('disconnect', () => {
      console.log(`Kitchen display disconnected: ${socket.id}`);
    });
  });

  // Bar Display
  barNamespace.on('connection', (socket: Socket) => {
    console.log(`Bar display connected: ${socket.id}`);

    socket.on('drink_ready', async (orderId) => {
      await prisma.order_items.updateMany({
        where: { order_id: orderId },
        data: { status: 'ready' }
      });

      cashierNamespace.emit('order_ready', { orderId });
    });
  });
}
```

```typescript
// Frontend - Multi-Device Connection Management
// src/hooks/useMultiDeviceSync.ts

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useOrderStore } from '@/stores/orderStore';
import { useOfflineStore } from '@/stores/offlineStore';

type DeviceType = 'cashier' | 'kitchen' | 'bar';

export function useMultiDeviceSync(deviceType: DeviceType) {
  useEffect(() => {
    const socket = io(
      process.env.REACT_APP_API_URL || 'http://localhost:3001',
      {
        path: `/${deviceType}`,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        forceNew: false
      }
    );

    socket.on('connect', () => {
      console.log(`Connected to ${deviceType} namespace`);
      useOfflineStore.getState().setOnline(true);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from ${deviceType} namespace`);
      useOfflineStore.getState().setOnline(false);
    });

    if (deviceType === 'cashier') {
      socket.on('order_ready', (data) => {
        useOrderStore.getState().updateOrderStatus(data.orderId, 'ready');
      });

      socket.on('order_closed', (data) => {
        useOrderStore.getState().clearCurrentOrder();
      });
    }

    if (deviceType === 'kitchen') {
      socket.on('new_order', (order) => {
        console.log('New kitchen order:', order);
        playNotificationSound();
      });
    }

    if (deviceType === 'bar') {
      socket.on('new_order', (order) => {
        console.log('New bar order:', order);
        playNotificationSound();
      });
    }

    // Handle network changes
    window.addEventListener('online', () => {
      useOfflineStore.getState().setOnline(true);
    });

    window.addEventListener('offline', () => {
      useOfflineStore.getState().setOnline(false);
    });

    return () => {
      socket.disconnect();
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, [deviceType]);
}

function playNotificationSound() {
  const audio = new Audio('/sounds/notification.mp3');
  audio.play().catch((e) => console.error('Failed to play sound:', e));
}
```

---

## 5. **Localization (i18n) Setup**

```typescript
// src/config/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import id from './locales/id.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { translation: en },
      id: { translation: id }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

```json
// src/config/locales/en.json
{
  "menu": {
    "dashboard": "Dashboard",
    "orders": "Orders",
    "items": "Items",
    "payments": "Payments",
    "reports": "Reports",
    "settings": "Settings",
    "logout": "Logout"
  },
  "pos": {
    "selectTable": "Select Table",
    "selectMenu": "Select Menu",
    "orderSummary": "Order Summary",
    "quantity": "Quantity",
    "price": "Price",
    "total": "Total",
    "tax": "Tax",
    "service": "Service",
    "discount": "Discount",
    "subtotal": "Subtotal",
    "grandTotal": "Grand Total",
    "payment": "Payment",
    "paymentMethod": "Payment Method",
    "cash": "Cash",
    "card": "Card",
    "transfer": "Transfer",
    "complete": "Complete",
    "cancel": "Cancel",
    "print": "Print",
    "reprint": "Reprint"
  },
  "kitchen": {
    "newOrder": "New Order",
    "orderNumber": "Order Number",
    "table": "Table",
    "items": "Items",
    "specialInstructions": "Special Instructions",
    "markReady": "Mark Ready",
    "ready": "Ready",
    "preparing": "Preparing"
  },
  "items": {
    "itemCode": "Item Code",
    "itemName": "Item Name",
    "category": "Category",
    "department": "Department",
    "priceLevel": "Price Level",
    "price": "Price",
    "tax": "Tax (%)",
    "service": "Service (%)",
    "printerLocation": "Printer Location",
    "kitchenDisplay": "Kitchen Display",
    "active": "Active"
  },
  "messages": {
    "success": "Success",
    "error": "Error",
    "confirm": "Are you sure?",
    "offlineMode": "Offline Mode - Data will sync when online",
    "syncingData": "Syncing data...",
    "printerConnected": "Printer connected",
    "printerDisconnected": "Printer disconnected"
  }
}
```

```json
// src/config/locales/id.json
{
  "menu": {
    "dashboard": "Dashboard",
    "orders": "Pesanan",
    "items": "Menu",
    "payments": "Pembayaran",
    "reports": "Laporan",
    "settings": "Pengaturan",
    "logout": "Keluar"
  },
  "pos": {
    "selectTable": "Pilih Meja",
    "selectMenu": "Pilih Menu",
    "orderSummary": "Ringkasan Pesanan",
    "quantity": "Jumlah",
    "price": "Harga",
    "total": "Total",
    "tax": "Pajak",
    "service": "Layanan",
    "discount": "Diskon",
    "subtotal": "Subtotal",
    "grandTotal": "Total Akhir",
    "payment": "Pembayaran",
    "paymentMethod": "Metode Pembayaran",
    "cash": "Tunai",
    "card": "Kartu",
    "transfer": "Transfer",
    "complete": "Selesai",
    "cancel": "Batal",
    "print": "Cetak",
    "reprint": "Cetak Ulang"
  },
  "kitchen": {
    "newOrder": "Pesanan Baru",
    "orderNumber": "Nomor Pesanan",
    "table": "Meja",
    "items": "Menu",
    "specialInstructions": "Instruksi Khusus",
    "markReady": "Tandai Siap",
    "ready": "Siap",
    "preparing": "Mempersiapkan"
  },
  "items": {
    "itemCode": "Kode Menu",
    "itemName": "Nama Menu",
    "category": "Kategori",
    "department": "Departemen",
    "priceLevel": "Tingkat Harga",
    "price": "Harga",
    "tax": "Pajak (%)",
    "service": "Layanan (%)",
    "printerLocation": "Lokasi Printer",
    "kitchenDisplay": "Layar Dapur",
    "active": "Aktif"
  },
  "messages": {
    "success": "Berhasil",
    "error": "Kesalahan",
    "confirm": "Apa Anda yakin?",
    "offlineMode": "Mode Offline - Data akan disinkronkan saat online",
    "syncingData": "Mengsinkronkan data...",
    "printerConnected": "Printer terhubung",
    "printerDisconnected": "Printer terputus"
  }
}
```

```typescript
// Usage in components
// src/components/Common/Navbar.tsx

import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1>{t('menu.dashboard')}</h1>
      
      <div className="flex gap-4">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('id')}>Bahasa Indonesia</button>
      </div>
    </nav>
  );
}
```

---

## 6. **Database Schema - Refined Version**

```sql
-- Create roles
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'cashier', 'kitchen', 'bar');
CREATE TYPE printer_type_enum AS ENUM ('usb', 'network', 'serial');
CREATE TYPE printer_brand_enum AS ENUM ('epson', 'bixolon', 'xprinter', 'generic');

-- ==================== USERS ====================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role user_role NOT NULL DEFAULT 'cashier',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_username CHECK (length(username) >= 3)
);

-- ==================== ITEM MASTER ====================
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- 'Kitchen', 'Bar', 'Retail'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL, -- Auto-generated: CAT-001, CAT-002, etc
    name VARCHAR(150) NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    department_id INTEGER NOT NULL REFERENCES departments(id),
    
    -- MULTI-LEVEL PRICING
    price_level_1 DECIMAL(10,2) NOT NULL,
    price_level_2 DECIMAL(10,2),
    price_level_3 DECIMAL(10,2),
    price_level_4 DECIMAL(10,2),
    price_level_5 DECIMAL(10,2),
    
    -- TAX & SERVICE (PER ITEM)
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    service_percentage DECIMAL(5,2) DEFAULT 0,
    
    -- PRINTER ROUTING
    printer_location VARCHAR(50), -- 'Kitchen', 'Bar', 'Both', 'None'
    is_show_kitchen_monitor BOOLEAN DEFAULT true,
    
    -- STATUS
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_code CHECK (length(code) >= 3),
    CONSTRAINT valid_prices CHECK (
        price_level_1 > 0 AND
        (price_level_2 IS NULL OR price_level_2 > 0) AND
        (price_level_3 IS NULL OR price_level_3 > 0) AND
        (price_level_4 IS NULL OR price_level_4 > 0) AND
        (price_level_5 IS NULL OR price_level_5 > 0)
    )
);

CREATE INDEX idx_items_category ON items(category_id);
CREATE INDEX idx_items_code ON items(code);
CREATE INDEX idx_items_active ON items(is_active);

-- ==================== RESTAURANT SETUP ====================
CREATE TABLE table_zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    table_number VARCHAR(20) NOT NULL,
    zone_id INTEGER REFERENCES table_zones(id),
    capacity INT DEFAULT 4,
    
    status VARCHAR(20) DEFAULT 'available', -- 'available', 'occupied', 'reserved', 'maintenance'
    current_order_id INTEGER, -- Will set with FK constraint after order table
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(table_number, zone_id),
    CONSTRAINT valid_capacity CHECK (capacity > 0)
);

-- ==================== ORDERS ====================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL, -- Generated: ORD-20240101-001
    
    -- LOCATION INFO
    table_id INTEGER REFERENCES tables(id) ON DELETE SET NULL, -- NULL untuk retail/takeaway
    customer_name VARCHAR(100), -- untuk retail/takeaway
    order_type VARCHAR(20) NOT NULL DEFAULT 'dine-in', -- 'dine-in', 'takeaway', 'delivery', 'retail'
    
    -- ORDER STATUS
    status VARCHAR(20) NOT NULL DEFAULT 'pending', 
    -- pending → in_kitchen → ready → served → closed
    -- atau untuk retail: pending → completed → closed
    
    -- FINANCIAL INFO
    total_items INT DEFAULT 0,
    subtotal DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    service_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    grand_total DECIMAL(12,2) DEFAULT 0,
    
    -- NOTES & TIMING
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    served_at TIMESTAMP,
    closed_at TIMESTAMP,
    
    -- OFFLINE TRACKING
    synced_at TIMESTAMP, -- NULL if offline
    sync_status VARCHAR(20) DEFAULT 'pending' -- 'pending', 'synced', 'failed'
);

CREATE INDEX idx_orders_table_id ON orders(table_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- ==================== ORDER ITEMS ====================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id),
    quantity INT NOT NULL DEFAULT 1,
    
    -- PRICING INFO
    price_level INT DEFAULT 1 CHECK (price_level >= 1 AND price_level <= 5),
    unit_price DECIMAL(10,2) NOT NULL,
    
    -- ITEM TAXES & SERVICE
    item_tax_percentage DECIMAL(5,2) DEFAULT 0,
    item_service_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    service_amount DECIMAL(12,2) DEFAULT 0,
    
    -- CALCULATIONS
    subtotal DECIMAL(12,2) DEFAULT 0,
    total DECIMAL(12,2) DEFAULT 0,
    
    -- SPECIAL REQUESTS
    special_instructions TEXT, -- "no salt", "extra spicy", "extra ice", etc
    
    -- STATUS TRACKING
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'cooking', 'ready', 'served', 'cancelled'
    sent_to_kitchen BOOLEAN DEFAULT false,
    sent_to_bar BOOLEAN DEFAULT false,
    sent_at TIMESTAMP,
    ready_at TIMESTAMP,
    cancelled_reason VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_quantity CHECK (quantity > 0),
    CONSTRAINT valid_unit_price CHECK (unit_price >= 0)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_status ON order_items(status);
CREATE INDEX idx_order_items_sent_to_kitchen ON order_items(sent_to_kitchen);
CREATE INDEX idx_order_items_sent_to_bar ON order_items(sent_to_bar);

-- ==================== PAYMENTS ====================
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- 'Cash', 'Debit Card', 'Credit Card', 'E-Wallet', 'Check', etc
    description TEXT,
    requires_reference BOOLEAN DEFAULT false, -- Track nomor kartu/ref transfer
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id),
    amount DECIMAL(12,2) NOT NULL,
    reference_number VARCHAR(100), -- Nomor kartu (masked), nomor ref transfer, dll
    status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded', 'voided'
    
    notes TEXT,
    processed_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_amount CHECK (amount > 0)
);

CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX idx_payments_method ON payments(payment_method_id);

-- ==================== PRINTER CONFIGURATION ====================
CREATE TABLE printer_configs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL, -- 'Kitchen', 'Bar', 'Cashier', etc
    
    -- CONNECTION INFO
    type printer_type_enum NOT NULL, -- 'usb', 'network', 'serial'
    brand printer_brand_enum DEFAULT 'generic', -- 'epson', 'bixolon', 'xprinter', 'generic'
    
    -- USB CONFIG
    vendor_id INT,
    product_id INT,
    
    -- NETWORK CONFIG
    ip_address VARCHAR(50),
    port INT DEFAULT 9100,
    
    -- SERIAL CONFIG
    serial_port VARCHAR(50),
    baud_rate INT DEFAULT 9600,
    
    -- PRINTER SPECS
    paper_width INT DEFAULT 80, -- 58, 80 mm
    
    -- STATUS
    is_active BOOLEAN DEFAULT true,
    last_tested TIMESTAMP,
    is_online BOOLEAN DEFAULT false,
    last_error TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_printer_configs_location ON printer_configs(location);
CREATE INDEX idx_printer_configs_active ON printer_configs(is_active);

-- ==================== KITCHEN MONITOR CONFIG ====================
CREATE TABLE kitchen_monitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL, -- 'Kitchen', 'Bar'
    device_id VARCHAR(100),
    
    -- DISPLAY SETTINGS
    auto_refresh_seconds INT DEFAULT 10,
    show_table_number BOOLEAN DEFAULT true,
    show_special_instructions BOOLEAN DEFAULT true,
    
    is_active BOOLEAN DEFAULT true,
    last_active TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==================== AUDIT LOG ====================
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    
    action VARCHAR(100), -- 'create_order', 'delete_item', 'process_payment', etc
    entity_type VARCHAR(50), -- 'order', 'payment', 'item', 'user', 'printer'
    entity_id INT,
    
    old_values JSONB, -- Untuk tracking perubahan
    new_values JSONB,
    
    ip_address VARCHAR(50),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    INDEX idx_audit_user_id (user_id),
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_created_at (created_at DESC)
);

-- ==================== SYNC HISTORY (untuk offline tracking) ====================
CREATE TABLE sync_history (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT NOT NULL,
    
    action VARCHAR(20), -- 'create', 'update', 'delete'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'synced', 'failed'
    
    local_data JSONB,
    sync_error TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    synced_at TIMESTAMP,
    
    UNIQUE(device_id, entity_type, entity_id, created_at)
);

-- ==================== TRANSACTIONS VIEW (untuk reporting) ====================
CREATE VIEW v_daily_sales AS
SELECT
    DATE(o.created_at) as sale_date,
    COUNT(DISTINCT o.id) as total_transactions,
    SUM(o.subtotal) as total_subtotal,
    SUM(o.tax_amount) as total_tax,
    SUM(o.service_amount) as total_service,
    SUM(o.discount_amount) as total_discount,
    SUM(o.grand_total) as total_revenue,
    COUNT(DISTINCT o.created_by) as total_cashiers,
    STRING_AGG(DISTINCT pm.name, ', ') as payment_methods
FROM orders o
LEFT JOIN payments p ON o.id = p.order_id
LEFT JOIN payment_methods pm ON p.payment_method_id = pm.id
WHERE o.status = 'closed'
GROUP BY DATE(o.created_at)
ORDER BY sale_date DESC;

-- ==================== CONSTRAINTS & FOREIGN KEYS ====================
ALTER TABLE tables
ADD CONSTRAINT fk_table_current_order
FOREIGN KEY (current_order_id) REFERENCES orders(id) ON DELETE SET NULL;

-- ==================== TRIGGERS ====================
-- Auto-update table status ketika order dibuat
CREATE OR REPLACE FUNCTION update_table_status_on_order()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.table_id IS NOT NULL THEN
        UPDATE tables SET status = 'occupied', current_order_id = NEW.id
        WHERE id = NEW.table_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_table_status
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION update_table_status_on_order();

-- Auto-clear table ketika order ditutup
CREATE OR REPLACE FUNCTION clear_table_on_order_close()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'closed' AND OLD.status != 'closed' THEN
        IF NEW.table_id IS NOT NULL THEN
            UPDATE tables SET status = 'available', current_order_id = NULL
            WHERE id = NEW.table_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_clear_table_on_close
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION clear_table_on_order_close();

-- Auto-calculate order totals
CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders SET
        total_items = (SELECT SUM(quantity) FROM order_items WHERE order_id = NEW.order_id),
        subtotal = (SELECT SUM(subtotal) FROM order_items WHERE order_id = NEW.order_id),
        tax_amount = (SELECT SUM(tax_amount) FROM order_items WHERE order_id = NEW.order_id),
        service_amount = (SELECT SUM(service_amount) FROM order_items WHERE order_id = NEW.order_id),
        grand_total = (
            SELECT SUM(subtotal + tax_amount + service_amount - discount_amount)
            FROM order_items
            WHERE order_id = NEW.order_id
        ),
        updated_at = NOW()
    WHERE id = NEW.order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calculate_order_total
AFTER INSERT OR UPDATE ON order_items
FOR EACH ROW
EXECUTE FUNCTION calculate_order_total();
```

---

## 7. **Setup Instructions - Local Development**

### **Prerequisites**
```bash
# Required software
- Node.js 18+
- PostgreSQL 14+
- Git
- Docker & Docker Compose (optional but recommended)
```

### **Project Initialization**

```bash
# 1. Clone atau buat project baru
git clone <repo-url>
cd pos-system

# 2. Setup Backend
cd backend

# Install dependencies
npm install

# Copy .env template
cp .env.example .env

# Setup database
createdb pos_dev  # Create database
npx prisma migrate dev --name init  # Run migrations
npx prisma db seed  # Seed initial data

# Start backend
npm run dev  # Runs on http://localhost:3001

# 3. Setup Frontend (new terminal)
cd ../frontend

# Install dependencies
npm install

# Copy .env
cp .env.example .env

# Start frontend
npm run dev  # Runs on http://localhost:3000
```

### **Docker Setup (Recommended)**

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: pos-postgres
    environment:
      POSTGRES_DB: pos_dev
      POSTGRES_USER: pos_user
      POSTGRES_PASSWORD: pos_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pos_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    container_name: pos-backend
    environment:
      DATABASE_URL: postgresql://pos_user:pos_password@postgres:5432/pos_dev
      JWT_SECRET: your-secret-key-here
      NODE_ENV: development
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    container_name: pos-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://localhost:3001

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pos-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"

volumes:
  postgres_data:

networks:
  default:
    driver: bridge
```

```bash
# Run dengan Docker
docker-compose up -d

# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop
docker-compose down
```

---

## 8. **PC Specifications Recommendation**

### **Minimum for Single Terminal**
```
CPU:     Intel i5 / AMD Ryzen 5 (4 cores)
RAM:     8 GB
Storage: 256 GB SSD
OS:      Windows 10/11, Linux Ubuntu 22.04, macOS 12+
Network: WiFi 5GHz atau Ethernet (untuk LAN)
```

### **Recommended for Multiple Devices**
```
CPU:     Intel i7 / AMD Ryzen 7 (8 cores)
RAM:     16 GB
Storage: 512 GB SSD
OS:      Linux Ubuntu Server 22.04 LTS (untuk server)
Network: Gigabit Ethernet recommended
```

### **Server (VPS Option)**
```
Provider Options:
- AWS EC2: t3.small (2 vCPU, 2GB RAM) minimum
- DigitalOcean: Droplet 4GB (2 vCPU, 4GB RAM)
- Linode: Linode 4GB (2 vCPU, 4GB RAM)
- Contabo: VPS S (4 vCPU, 8GB RAM, €4/month)

Recommended for POS:
- 2+ vCPU
- 4+ GB RAM
- 50+ GB SSD
- Bandwidth: Unlimited atau 5TB+
```

---

## 9. **Network Setup - Multi-Device LAN**

```
┌────────────────────────────────────────────────────────┐
│              Main Server (192.168.1.100)              │
│  ├─ Backend API: 3001                                  │
│  ├─ PostgreSQL: 5432                                   │
│  └─ WebSocket: 3001/socket.io                          │
└────────────────────────────────────────────────────────┘
         ↓ (Ethernet/WiFi LAN)
┌────────────────────────────────────────────────────────┐
│  Connected Devices                                      │
│  ├─ Cashier Terminal 1 (192.168.1.101)                │
│  │  └─ Browser: http://192.168.1.100:3000             │
│  ├─ Cashier Terminal 2 (192.168.1.102)                │
│  │  └─ Browser: http://192.168.1.100:3000             │
│  ├─ Kitchen Display (192.168.1.103)                   │
│  │  └─ Browser: http://192.168.1.100:3000?view=kitchen│
│  ├─ Bar Display (192.168.1.104)                       │
│  │  └─ Browser: http://192.168.1.100:3000?view=bar   │
│  └─ Manager Tablet (WiFi)                             │
│     └─ Browser: http://192.168.1.100:3000             │
└────────────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────────────┐
│  Printers (USB/Network)                                │
│  ├─ Thermal Printer 1 (Kitchen) - USB 192.168.1.105   │
│  ├─ Thermal Printer 2 (Bar) - Network 192.168.1.106   │
│  └─ Thermal Printer 3 (Cashier) - USB                 │
└────────────────────────────────────────────────────────┘
```

### **Network Configuration Steps**

```bash
# 1. Setup Static IP untuk Server
# Linux - /etc/netplan/01-netcfg.yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# Apply config
sudo netplan apply

# 2. Buka firewall untuk aplikasi
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 3001/tcp  # Backend
sudo ufw allow 5432/tcp  # PostgreSQL (internal only)
sudo ufw allow 9100/tcp  # Printer network

# 3. Update /etc/hosts untuk kemudahan
# Windows: C:\Windows\System32\drivers\etc\hosts
# Linux/Mac: /etc/hosts

192.168.1.100 pos-server.local

# 4. Setup printer sharing
# Install cups (Linux)
sudo apt install cups
# Configure printer sharing di 192.168.1.100:631

# 5. Test connectivity
ping 192.168.1.100
curl http://192.168.1.100:3000
curl http://192.168.1.100:3001/health
```

---

## 10. **Backup & Recovery Strategy**

```typescript
// Backend - src/services/backupService.ts

import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { CronJob } from 'cron';

export class BackupService {
  // Daily automated backup
  static initializeAutoBackup() {
    const dailyBackup = new CronJob('0 2 * * *', async () => {
      console.log('Starting daily backup...');
      await this.createBackup();
    });

    dailyBackup.start();
  }

  static async createBackup(): Promise<string> {
    const backupDir = path.join('/backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `pos-backup-${timestamp}.sql`);

    return new Promise((resolve, reject) => {
      const command = `pg_dump -h localhost -U ${process.env.DB_USER} ${process.env.DB_NAME} > ${backupFile}`;
      
      exec(command, (error) => {
        if (error) {
          console.error('Backup failed:', error);
          reject(error);
        } else {
          console.log(`Backup created: ${backupFile}`);
          resolve(backupFile);
        }
      });
    });
  }

  static async restoreBackup(backupFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = `psql -h localhost -U ${process.env.DB_USER} ${process.env.DB_NAME} < ${backupFile}`;
      
      exec(command, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(`Database restored from: ${backupFile}`);
          resolve();
        }
      });
    });
  }

  // List all backups
  static async listBackups(): Promise<string[]> {
    const backupDir = '/backups';
    const files = await fs.readdir(backupDir);
    return files.filter((f) => f.startsWith('pos



User:

apakah ini sudah memiliki kebutuhan yang di perlukan ??? atau bisakah kamu berikan tambahan untuk awal mula sistem ini akan di garap 
apakah fungsi seperti printer kitchen dan printer bar sudah di terapkan adalam alur dan kode , kemudian untuk desain apakah bisa lebih modern dan sangat sesuai dengan device apa pun yang ada untuk saaty ini 

contoh .. untuk lapotop ataupun PC layar minimumn adalah ukuran 14 ich hingga 24 , adapun square dan wide 
untuk android atau ipad itu bisa dari seri 8inch atau pun 12 inch 

bahkan cpu aio industri kebanyakan hampir sama dengan kompouter desktop ??? jadi apakah bisa bantu menyesuaikan semua itu dan berikan unsur tambahan yang dapat di lakukan agar bisa aku mulai tahap pengerjaan aplikasi ini



Claude Sonnet 4.6:

# Sistem POS Restaurant & Retail - Complete Implementation Guide v2.0

Excellent! Mari kita buat **production-ready starter kit** dengan fokus pada **responsive design, multi-device compatibility, dan complete workflows**.

---

## 1. **Complete Feature Checklist - Siap Dikerjakan**

### ✅ **Core Features - READY TO CODE**
```
AUTHENTICATION & AUTHORIZATION
✓ Login system dengan role-based access
✓ Multi-user simultaneous login
✓ Session management (timeout 8 jam)
✓ Password reset mechanism

RESTAURANT OPERATIONS
✓ Table mapping & status tracking
✓ Order entry dengan multi-level pricing
✓ Real-time order status
✓ Special instructions per item
✓ Order modifications & cancellations

KITCHEN & BAR OPERATIONS
✓ Kitchen Display System (KDS)
✓ Bar Display System (BDS)
✓ Real-time order notifications
✓ Order completion workflow
✓ Print kitchen tickets via thermal printer

PAYMENT PROCESSING
✓ Multiple payment methods (Cash, Card, Transfer, Custom)
✓ Change calculation
✓ Discount application
✓ Receipt generation & printing
✓ Payment reconciliation

ITEM MANAGEMENT
✓ CRUD operations untuk menu items
✓ Multi-level pricing (5 levels)
✓ Tax & service per item
✓ Category & department organization
✓ Printer routing configuration

PRINTER MANAGEMENT
✓ Thermal printer support (USB/Network)
✓ Multi-printer configuration
✓ Receipt printing
✓ Kitchen ticket printing
✓ Printer health monitoring

OFFLINE & SYNC
✓ Offline-first architecture
✓ IndexedDB local caching
✓ Automatic sync when online
✓ Conflict resolution

LOCALIZATION
✓ English support
✓ Bahasa Indonesia support
✓ Easy to extend to other languages

RESPONSIVE DESIGN
✓ Desktop (14" - 24" monitors)
✓ Tablet (8" - 12" screens)
✓ Industrial PC (touchscreen compatible)
```

---

## 2. **Responsive Design System - Modern & Adaptive**

```typescript
// src/config/responsiveConfig.ts

export const SCREEN_BREAKPOINTS = {
  // Mobile / Tablet
  xs: 0,      // Extra small (phones)
  sm: 480,    // Small (larger phones)
  md: 768,    // Medium (tablets 8-10")
  lg: 1024,   // Large (tablets 12", small laptops)
  xl: 1280,   // Extra large (14" laptops)
  '2xl': 1536, // 2X (15-17" laptops, 24" desktop)
  '3xl': 1920, // 3X (24"+ desktop, 4K displays)
  '4xl': 2560  // 4X (Large industrial displays)
};

export const DEVICE_TYPES = {
  PHONE: 'phone',        // < 480px
  TABLET: 'tablet',      // 480px - 1024px
  LAPTOP: 'laptop',      // 1024px - 1920px
  DESKTOP: 'desktop',    // 1920px+
  INDUSTRIAL_PC: 'industrial_pc', // Touch-enabled
  KITCHEN_DISPLAY: 'kitchen_display', // Large horizontal displays
  PHONE_LANDSCAPE: 'phone_landscape'
};

// Layout configurations per device
export const LAYOUT_CONFIG = {
  phone: {
    sidebarCollapsed: true,
    tableGridCols: 'grid-cols-2',
    fontSize: 'text-sm',
    padding: 'p-2',
    buttonSize: 'py-3 px-2',
    kitchenOrderSize: 'max-h-96'
  },
  tablet: {
    sidebarCollapsed: false,
    tableGridCols: 'grid-cols-3',
    fontSize: 'text-base',
    padding: 'p-3',
    buttonSize: 'py-3 px-4',
    kitchenOrderSize: 'max-h-96'
  },
  laptop: {
    sidebarCollapsed: false,
    tableGridCols: 'grid-cols-4',
    fontSize: 'text-base',
    padding: 'p-4',
    buttonSize: 'py-2 px-4',
    kitchenOrderSize: 'max-h-96'
  },
  desktop: {
    sidebarCollapsed: false,
    tableGridCols: 'grid-cols-5',
    fontSize: 'text-base',
    padding: 'p-4',
    buttonSize: 'py-2 px-4',
    kitchenOrderSize: 'max-h-full'
  },
  kitchen_display: {
    sidebarCollapsed: true,
    tableGridCols: 'grid-cols-3',
    fontSize: 'text-2xl', // BESAR untuk kitchen
    padding: 'p-6',
    buttonSize: 'py-4 px-6',
    kitchenOrderSize: 'min-h-screen'
  }
};

// Font sizes yang adaptif
export const ADAPTIVE_TEXT = {
  xs: 'text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base',
  sm: 'text-sm sm:text-sm md:text-base lg:text-base xl:text-lg',
  base: 'text-base sm:text-base md:text-lg lg:text-lg xl:text-xl',
  lg: 'text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
  xl: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  '2xl': 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
};

// Spacing yang adaptif
export const ADAPTIVE_SPACING = {
  xs: 'px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-3',
  sm: 'px-3 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-3',
  base: 'px-4 py-3 sm:px-4 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-4 xl:px-8 xl:py-4'
};
```

### **Custom Hook untuk Responsive Design**

```typescript
// src/hooks/useResponsive.ts

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [deviceType, setDeviceType] = useState<string>('laptop');
  const [screenSize, setScreenSize] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Detect orientation
      const newOrientation = width > height ? 'landscape' : 'portrait';
      setOrientation(newOrientation);

      // Detect device type
      if (width < 480) {
        setDeviceType('phone');
      } else if (width < 768) {
        setDeviceType(newOrientation === 'landscape' ? 'phone_landscape' : 'tablet');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else if (width < 1920) {
        setDeviceType('laptop');
      } else if (width >= 2560) {
        setDeviceType('kitchen_display'); // Large display
      } else {
        setDeviceType('desktop');
      }

      setScreenSize(width);
    };

    // Detect touch device
    const hasTouch = () => {
      return (
        (typeof window !== 'undefined' && 'ontouchstart' in window) ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
      );
    };

    setIsTouchDevice(hasTouch());
    detectDevice();

    // Listen to resize
    const handleResize = () => detectDevice();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', detectDevice);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return {
    deviceType,
    screenSize,
    orientation,
    isTouchDevice,
    isPhone: deviceType === 'phone' || deviceType === 'phone_landscape',
    isTablet: deviceType === 'tablet',
    isLaptop: deviceType === 'laptop',
    isDesktop: deviceType === 'desktop',
    isKitchenDisplay: deviceType === 'kitchen_display',
    isLargeScreen: screenSize >= 1920,
    isSmallScreen: screenSize < 768
  };
}

// Usage example
export function MyComponent() {
  const { deviceType, isPhone, isTablet, isKitchenDisplay } = useResponsive();

  if (isKitchenDisplay) {
    return <KitchenDisplayLayout />;
  }

  if (isPhone) {
    return <MobileLayout />;
  }

  if (isTablet) {
    return <TabletLayout />;
  }

  return <DesktopLayout />;
}
```

---

## 3. **Kitchen & Bar Printer Integration - Complete Flow**

```typescript
// Backend - src/services/kitchenPrinterService.ts

import { prisma } from '@/config/database';
import { printerManager } from './printerService';
import { io } from '@/config/socket';

export class KitchenPrinterService {
  /**
   * Workflow:
   * 1. Kasir membuat order dan submit
   * 2. Order items di-route ke Kitchen/Bar berdasarkan printer_location
   * 3. Print thermal ticket ke kitchen/bar printer
   * 4. Real-time update di Kitchen Display System (KDS)
   * 5. Kitchen mark item sebagai ready
   * 6. Notification ke cashier item siap
   * 7. Kasir serve ke customer
   */

  async handleNewOrder(orderId: number) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        order_items: {
          include: { item: true }
        },
        table: true
      }
    });

    if (!order) throw new Error('Order not found');

    // Separate items by destination
    const kitchenItems = order.order_items.filter(
      (oi) => oi.item.printer_location === 'Kitchen' || oi.item.printer_location === 'Both'
    );
    const barItems = order.order_items.filter(
      (oi) => oi.item.printer_location === 'Bar' || oi.item.printer_location === 'Both'
    );

    // Print to Kitchen
    if (kitchenItems.length > 0) {
      await this.printKitchenTicket(order, kitchenItems);
      
      // Update order_items status
      await prisma.order_items.updateMany({
        where: {
          id: { in: kitchenItems.map((ki) => ki.id) }
        },
        data: {
          sent_to_kitchen: true,
          sent_at: new Date(),
          status: 'pending'
        }
      });

      // Broadcast to kitchen displays
      io.of('/kitchen').emit('new_order', {
        orderId: order.id,
        orderNumber: order.order_number,
        table: order.table?.table_number,
        items: kitchenItems.map((ki) => ({
          id: ki.id,
          name: ki.item.name,
          quantity: ki.quantity,
          specialInstructions: ki.special_instructions,
          prepTime: ki.item.prep_time_minutes || 15
        })),
        timestamp: new Date()
      });
    }

    // Print to Bar
    if (barItems.length > 0) {
      await this.printBarTicket(order, barItems);

      await prisma.order_items.updateMany({
        where: {
          id: { in: barItems.map((bi) => bi.id) }
        },
        data: {
          sent_to_bar: true,
          sent_at: new Date(),
          status: 'pending'
        }
      });

      io.of('/bar').emit('new_order', {
        orderId: order.id,
        orderNumber: order.order_number,
        table: order.table?.table_number,
        items: barItems.map((bi) => ({
          id: bi.id,
          name: bi.item.name,
          quantity: bi.quantity,
          specialInstructions: bi.special_instructions,
          prepTime: bi.item.prep_time_minutes || 10
        })),
        timestamp: new Date()
      });
    }
  }

  async printKitchenTicket(order: any, items: any[]) {
    const kitchenPrinter = await prisma.printer_config.findFirst({
      where: {
        location: 'Kitchen',
        is_active: true
      }
    });

    if (!kitchenPrinter) {
      console.warn('Kitchen printer not configured');
      return;
    }

    try {
      await printerManager.printReceipt(
        kitchenPrinter.id.toString(),
        {
          order_number: order.order_number,
          table: order.table?.table_number,
          order_items: items,
          created_at: order.created_at,
          notes: order.notes
        },
        'kitchen' // Format type
      );

      console.log(`✓ Kitchen ticket printed for order ${order.order_number}`);
    } catch (error) {
      console.error('Failed to print kitchen ticket:', error);
      // Still continue - notification will still appear on KDS
    }
  }

  async printBarTicket(order: any, items: any[]) {
    const barPrinter = await prisma.printer_config.findFirst({
      where: {
        location: 'Bar',
        is_active: true
      }
    });

    if (!barPrinter) {
      console.warn('Bar printer not configured');
      return;
    }

    try {
      await printerManager.printReceipt(
        barPrinter.id.toString(),
        {
          order_number: order.order_number,
          table: order.table?.table_number,
          order_items: items,
          created_at: order.created_at,
          notes: order.notes
        },
        'bar' // Format type
      );

      console.log(`✓ Bar ticket printed for order ${order.order_number}`);
    } catch (error) {
      console.error('Failed to print bar ticket:', error);
    }
  }

  async markItemsReady(orderId: number, itemIds: number[], source: 'kitchen' | 'bar') {
    // Update item status
    await prisma.order_items.updateMany({
      where: { id: { in: itemIds } },
      data: {
        status: 'ready',
        ready_at: new Date()
      }
    });

    // Check if all items in order are ready
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: true }
    });

    const allReady = order.order_items.every((oi) => oi.status === 'ready');

    if (allReady) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'ready' }
      });
    }

    // Notify cashier
    io.of('/cashier').emit('items_ready', {
      orderId,
      itemCount: itemIds.length,
      allReady,
      source
    });

    // Update KDS
    io.of('/kitchen').emit('item_marked_ready', {
      orderId,
      itemIds
    });

    io.of('/bar').emit('item_marked_ready', {
      orderId,
      itemIds
    });
  }

  async reprintTicket(orderId: number, destination: 'kitchen' | 'bar') {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        order_items: { include: { item: true } },
        table: true
      }
    });

    if (!order) throw new Error('Order not found');

    if (destination === 'kitchen') {
      const kitchenItems = order.order_items.filter(
        (oi) => oi.item.printer_location.includes('Kitchen')
      );
      await this.printKitchenTicket(order, kitchenItems);
    } else if (destination === 'bar') {
      const barItems = order.order_items.filter(
        (oi) => oi.item.printer_location.includes('Bar')
      );
      await this.printBarTicket(order, barItems);
    }
  }
}
```

---

## 4. **Modern UI Components - Responsive & Touch-Friendly**

### **A. Kitchen Display System (KDS) - Responsive Layout**

```typescript
// src/components/Kitchen/KitchenDisplay.tsx

import { useEffect, useState } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { useKitchenSocket } from '@/hooks/useKitchenSocket';
import { KitchenOrderCard } from './KitchenOrderCard';
import { useTranslation } from 'react-i18next';

interface Order {
  orderId: number;
  orderNumber: string;
  table: string;
  items: OrderItem[];
  timestamp: Date;
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  specialInstructions?: string;
  prepTime?: number;
  status: 'pending' | 'cooking' | 'ready';
}

export function KitchenDisplay() {
  const { t } = useTranslation();
  const { deviceType, orientation, isKitchenDisplay } = useResponsive();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [stats, setStats] = useState({ total: 0, ready: 0, pending: 0 });

  useKitchenSocket((data) => {
    if (data.type === 'new_order') {
      setOrders((prev) => [data.payload, ...prev]);
      playNotificationSound();
    } else if (data.type === 'item_marked_ready') {
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === data.payload.orderId
            ? {
                ...o,
                items: o.items.map((i) =>
                  data.payload.itemIds.includes(i.id) ? { ...i, status: 'ready' } : i
                )
              }
            : o
        )
      );
    }
  });

  // Update stats
  useEffect(() => {
    const total = orders.length;
    const ready = orders.filter((o) => o.items.every((i) => i.status === 'ready')).length;
    const pending = total - ready;
    setStats({ total, ready, pending });
  }, [orders]);

  // Layout configurations
  const layoutConfig = {
    phone: {
      gridCols: 'grid-cols-1',
      fontSize: 'text-sm',
      padding: 'p-2',
      cardHeight: 'max-h-96'
    },
    tablet: {
      gridCols: 'grid-cols-2',
      fontSize: 'text-base',
      padding: 'p-3',
      cardHeight: 'max-h-96'
    },
    laptop: {
      gridCols: 'grid-cols-3',
      fontSize: 'text-base',
      padding: 'p-4',
      cardHeight: 'max-h-96'
    },
    kitchen_display: {
      gridCols: 'grid-cols-4',
      fontSize: 'text-xl', // BESAR
      padding: 'p-6',
      cardHeight: 'h-full'
    }
  };

  const config = layoutConfig[deviceType] || layoutConfig.laptop;

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      {/* Header dengan Status */}
      <div className={`bg-gray-800 ${config.padding} flex justify-between items-center`}>
        <div>
          <h1 className={`font-bold ${config.fontSize}`}>
            {t('kitchen.kitchenDisplay')}
          </h1>
          <p className={`text-gray-400 ${config.fontSize}`}>
            {new Date().toLocaleTimeString('id-ID')}
          </p>
        </div>

        {/* Stats - Responsive */}
        <div className={`flex gap-4 ${config.fontSize}`}>
          <div className="bg-blue-600 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs">{t('kitchen.total')}</div>
          </div>
          <div className="bg-yellow-600 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs">{t('kitchen.pending')}</div>
          </div>
          <div className="bg-green-600 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{stats.ready}</div>
            <div className="text-xs">{t('kitchen.ready')}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-auto ${config.padding}`}>
        {orders.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className={`${config.fontSize} text-gray-500 mb-4`}>
                {t('kitchen.noOrders')}
              </div>
            </div>
          </div>
        ) : (
          <div className={`grid ${config.gridCols} gap-4 auto-rows-max`}>
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedOrder(order.orderId)}
              >
                <KitchenOrderCard order={order} config={config} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Control Actions */}
      <div className={`bg-gray-800 ${config.padding} flex gap-2 justify-end`}>
        <button
          className={`bg-red-600 hover:bg-red-700 rounded px-4 py-2 font-bold`}
        >
          {t('common.clearCompleted')}
        </button>
        <button
          className={`bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 font-bold`}
        >
          {t('common.refresh')}
        </button>
      </div>
    </div>
  );
}

function playNotificationSound() {
  const audio = new Audio('/sounds/kitchen-notification.mp3');
  audio.play().catch((e) => console.error('Sound error:', e));
}
```

### **B. Kitchen Order Card Component**

```typescript
// src/components/Kitchen/KitchenOrderCard.tsx

import { useState } from 'react';
import { kitchenPrinterService } from '@/services/kitchenPrinterService';
import { useTranslation } from 'react-i18next';

interface KitchenOrderCardProps {
  order: any;
  config: any;
}

export function KitchenOrderCard({ order, config }: KitchenOrderCardProps) {
  const { t } = useTranslation();
  const [marking, setMarking] = useState(false);
  const [reprintLoading, setReprintLoading] = useState(false);

  // Calculate elapsed time
  const elapsedMinutes = Math.floor(
    (Date.now() - new Date(order.timestamp).getTime()) / 60000
  );

  // Color based on status
  const getStatusColor = () => {
    if (order.items.every((i) => i.status === 'ready')) return 'bg-green-600';
    if (order.items.some((i) => i.status === 'cooking')) return 'bg-yellow-600';
    return 'bg-blue-600';
  };

  const handleMarkReady = async () => {
    setMarking(true);
    try {
      const itemIds = order.items.map((i) => i.id);
      await kitchenPrinterService.markItemsReady(order.orderId, itemIds, 'kitchen');
    } catch (error) {
      console.error('Error marking items ready:', error);
    } finally {
      setMarking(false);
    }
  };

  const handleReprint = async () => {
    setReprintLoading(true);
    try {
      await kitchenPrinterService.reprintTicket(order.orderId, 'kitchen');
    } catch (error) {
      console.error('Error reprinting:', error);
    } finally {
      setReprintLoading(false);
    }
  };

  return (
    <div className={`${getStatusColor()} rounded-lg p-4 text-white shadow-lg`}>
      {/* Header */}
      <div className={`flex justify-between items-start mb-3 pb-3 border-b border-white border-opacity-20`}>
        <div>
          <div className={`font-bold text-2xl`}>#{order.orderNumber}</div>
          <div className={`text-sm text-gray-200`}>
            {t('kitchen.table')}: {order.table}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{elapsedMinutes}m</div>
          <div className="text-xs">{t('kitchen.elapsed')}</div>
        </div>
      </div>

      {/* Items */}
      <div className={`space-y-2 mb-4`}>
        {order.items.map((item) => (
          <div
            key={item.id}
            className={`
              p-3 rounded
              ${item.status === 'ready' ? 'bg-green-700' : 'bg-gray-700'}
              flex justify-between items-start
            `}
          >
            <div>
              <div className="font-bold text-lg">{item.name}</div>
              <div className="text-sm text-gray-300">
                {t('common.qty')}: {item.quantity}
              </div>
              {item.specialInstructions && (
                <div className="text-sm text-yellow-300 font-semibold mt-1">
                  📝 {item.specialInstructions}
                </div>
              )}
            </div>
            <div className="text-right">
              <div
                className={`
                  font-bold text-xs px-2 py-1 rounded
                  ${item.status === 'ready' ? 'bg-green-500' : 'bg-gray-500'}
                `}
              >
                {item.status.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleMarkReady}
          disabled={marking || order.items.every((i) => i.status === 'ready')}
          className={`
            py-2 rounded font-bold transition
            ${
              order.items.every((i) => i.status === 'ready')
                ? 'bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-green-500 hover:bg-green-600 active:scale-95'
            }
          `}
        >
          {marking ? '...' : t('kitchen.markReady')} ✓
        </button>
        <button
          onClick={handleReprint}
          disabled={reprintLoading}
          className={`
            py-2 rounded font-bold transition
            bg-gray-700 hover:bg-gray-600 active:scale-95
          `}
        >
          {reprintLoading ? '...' : t('common.reprint')} 🖨️
        </button>
      </div>
    </div>
  );
}
```

### **C. Cashier POS Screen - Multi-Device Responsive**

```typescript
// src/pages/CashierPOS.tsx

import { useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { useOrderStore } from '@/stores/orderStore';
import { useTranslation } from 'react-i18next';
import { TableMap } from '@/components/Restaurant/TableMap';
import { MenuGrid } from '@/components/Order/MenuGrid';
import { OrderSummary } from '@/components/Order/OrderSummary';
import { PaymentModal } from '@/components/Payment/PaymentModal';

export function CashierPOS() {
  const { t } = useTranslation();
  const { deviceType, screenSize, orientation } = useResponsive();
  const currentOrder = useOrderStore((s) => s.currentOrder);
  const [showPayment, setShowPayment] = useState(false);

  // Layout calculations based on screen size and orientation
  const getLayout = () => {
    // Phone - Stacked layout
    if (deviceType === 'phone') {
      return {
        layout: 'stacked', // Vertical stacking
        tableViewHeight: orientation === 'landscape' ? 'h-1/3' : 'h-1/4',
        menuHeight: orientation === 'landscape' ? 'h-1/3' : 'h-2/4',
        summaryHeight: 'h-1/3',
        tableGridCols: 'grid-cols-3',
        menuGridCols: 'grid-cols-2',
        fontSize: 'text-xs'
      };
    }

    // Tablet - 2 column
    if (deviceType === 'tablet') {
      return {
        layout: 'two-column',
        tableViewHeight: 'h-1/3',
        menuHeight: 'h-2/3',
        summaryHeight: 'auto',
        tableGridCols: 'grid-cols-4',
        menuGridCols: 'grid-cols-3',
        fontSize: 'text-sm'
      };
    }

    // Laptop & Desktop - 3 column
    return {
      layout: 'three-column',
      tableViewHeight: 'h-full',
      menuHeight: 'h-full',
      summaryHeight: 'h-full',
      tableGridCols: 'grid-cols-5',
      menuGridCols: 'grid-cols-4',
      fontSize: 'text-base'
    };
  };

  const layout = getLayout();

  // Render berdasarkan layout
  if (layout.layout === 'stacked') {
    return (
      <div className="w-full h-screen bg-gray-100 flex flex-col">
        {/* Navbar */}
        <NavbarPOS />

        {/* Table View - Small */}
        <div className={`${layout.tableViewHeight} overflow-y-auto p-2 border-b border-gray-300`}>
          <TableMap gridCols={layout.tableGridCols} />
        </div>

        {/* Menu View - Large */}
        <div className={`${layout.menuHeight} overflow-y-auto p-2`}>
          <MenuGrid gridCols={layout.menuGridCols} />
        </div>

        {/* Summary + Actions */}
        <div className={`${layout.summaryHeight} border-t border-gray-300 p-2 bg-white`}>
          <OrderSummary compact={true} />
          <button
            onClick={() => setShowPayment(true)}
            disabled={!currentOrder?.items?.length}
            className="w-full mt-2 bg-green-600 text-white py-3 rounded font-bold disabled:bg-gray-400"
          >
            {t('pos.payment')}
          </button>
        </div>

        {/* Payment Modal */}
        {showPayment && (
          <PaymentModal onClose={() => setShowPayment(false)} />
        )}
      </div>
    );
  }

  if (layout.layout === 'two-column') {
    return (
      <div className="w-full h-screen bg-gray-100 flex flex-col">
        <NavbarPOS />

        <div className="flex-1 flex gap-2 p-2 overflow-hidden">
          {/* Left - Tables & Summary */}
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div className={`${layout.tableViewHeight} overflow-y-auto bg-white rounded-lg p-2`}>
              <h3 className="font-bold mb-2">{t('pos.selectTable')}</h3>
              <TableMap gridCols={layout.tableGridCols} />
            </div>

            <div className="flex-1 overflow-y-auto bg-white rounded-lg p-2">
              <OrderSummary compact={false} />
              <button
                onClick={() => setShowPayment(true)}
                disabled={!currentOrder?.items?.length}
                className="w-full mt-4 bg-green-600 text-white py-3 rounded font-bold disabled:bg-gray-400"
              >
                {t('pos.payment')}
              </button>
            </div>
          </div>

          {/* Right - Menu */}
          <div className="flex-1 overflow-y-auto bg-white rounded-lg p-2">
            <h3 className="font-bold mb-2">{t('pos.selectMenu')}</h3>
            <MenuGrid gridCols={layout.menuGridCols} />
          </div>
        </div>

        {showPayment && (
          <PaymentModal onClose={() => setShowPayment(false)} />
        )}
      </div>
    );
  }

  // Three column (Laptop & Desktop)
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      <NavbarPOS />

      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {/* Left Column - Tables */}
        <div className="w-1/4 bg-white rounded-lg p-3 overflow-y-auto shadow">
          <h3 className="font-bold text-lg mb-3">{t('pos.selectTable')}</h3>
          <TableMap gridCols={layout.tableGridCols} />
        </div>

        {/* Middle Column - Menu */}
        <div className="w-1/2 bg-white rounded-lg p-3 overflow-y-auto shadow">
          <h3 className="font-bold text-lg mb-3">{t('pos.selectMenu')}</h3>
          <MenuGrid gridCols={layout.menuGridCols} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-1/4 bg-white rounded-lg p-3 overflow-y-auto shadow flex flex-col">
          <h3 className="font-bold text-lg mb-3">{t('pos.orderSummary')}</h3>
          <div className="flex-1 overflow-y-auto">
            <OrderSummary compact={false} />
          </div>
          <button
            onClick={() => setShowPayment(true)}
            disabled={!currentOrder?.items?.length}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded font-bold disabled:bg-gray-400 hover:bg-green-700 transition"
          >
            {t('pos.payment')} →
          </button>
        </div>
      </div>

      {showPayment && (
        <PaymentModal onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
}

function NavbarPOS() {
  const { t, i18n } = useTranslation();
  const { deviceType } = useResponsive();

  return (
    <div
      className={`
        bg-gradient-to-r from-blue-600 to-blue-700 text-white
        ${deviceType === 'phone' ? 'p-2' : 'p-4'}
        flex justify-between items-center shadow-lg
      `}
    >
      <h1 className={`font-bold ${deviceType === 'phone' ? 'text-lg' : 'text-2xl'}`}>
        {t('menu.pos')}
      </h1>
      <div className="flex gap-2">
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="px-2 py-1 text-black rounded text-sm"
        >
          <option value="en">English</option>
          <option value="id">Bahasa Indonesia</option>
        </select>
        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
          {t('menu.logout')}
        </button>
      </div>
    </div>
  );
}
```

---

## 5. **Complete Project Starter Structure**

```bash
pos-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts          # Prisma config
│   │   │   ├── environment.ts       # ENV validation
│   │   │   ├── jwt.ts               # JWT config
│   │   │   └── socket.ts            # Socket.io setup
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Database schema
│   │   │   ├── migrations/
│   │   │   └── seeds.ts             # Initial data
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── items.routes.ts
│   │   │   ├── orders.routes.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── tables.routes.ts
│   │   │   ├── printers.routes.ts
│   │   │   ├── kitchen.routes.ts
│   │   │   └── reports.routes.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── itemController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── paymentController.ts
│   │   │   ├── printerController.ts
│   │   │   ├── kitchenController.ts
│   │   │   └── reportController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── itemService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── printerService.ts
│   │   │   ├── kitchenPrinterService.ts ← KEY FILE
│   │   │   ├── offlineService.ts
│   │   │   └── reportService.ts
│   │   │
│   │   ├── websocket/
│   │   │   ├── kitchenNamespace.ts
│   │   │   ├── barNamespace.ts
│   │   │   ├── cashierNamespace.ts
│   │   │   └── multiDeviceSync.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   └── logging.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── generateCode.ts
│   │   │   ├── calculators.ts
│   │   │   ├── printerUtils.ts
│   │   │   ├── validators.ts
│   │   │   └── responseFormatter.ts
│   │   │
│   │   ├── jobs/
│   │   │   ├── printQueue.ts
│   │   │   └── syncQueue.ts
│   │   │
│   │   ├── app.ts                  # Express setup
│   │   └── server.ts               # Server entry point
│   │
│   ├── .env.example
│   ├── .env.local                  # Local dev
│   ├── .env.production             # Prod config
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── i18n.ts
│   │   │   ├── locales/
│   │   │   │   ├── en.json
│   │   │   │   └── id.json
│   │   │   ├── responsiveConfig.ts ← KEY FILE
│   │   │   └── api.config.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── RoleGuard.tsx
│   │   │   │
│   │   │   ├── Common/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── ErrorBoundary.tsx
│   │   │   │
│   │   │   ├── Restaurant/
│   │   │   │   ├── TableMap.tsx
│   │   │   │   ├── TableSelector.tsx
│   │   │   │   └── TableStatus.tsx
│   │   │   │
│   │   │   ├── Order/
│   │   │   │   ├── MenuGrid.tsx      ← RESPONSIVE
│   │   │   │   ├── OrderEntry.tsx
│   │   │   │   ├── OrderSummary.tsx
│   │   │   │   ├── SpecialInstructions.tsx
│   │   │   │   └── PriceLevelSelector.tsx
│   │   │   │
│   │   │   ├── Kitchen/
│   │   │   │   ├── KitchenDisplay.tsx ← RESPONSIVE
│   │   │   │   ├── KitchenOrderCard.tsx
│   │   │   │   ├── OrderQueue.tsx
│   │   │   │   └── StatsPanel.tsx
│   │   │   │
│   │   │   ├── Bar/
│   │   │   │   ├── BarDisplay.tsx
│   │   │   │   ├── BarOrderCard.tsx
│   │   │   │   └── BarQueue.tsx
│   │   │   │
│   │   │   ├── Payment/
│   │   │   │   ├── PaymentModal.tsx ← RESPONSIVE
│   │   │   │   ├── PaymentMethodSelect.tsx
│   │   │   │   ├── ReceiptPreview.tsx
│   │   │   │   └── ChangeCalculator.tsx
│   │   │   │
│   │   │   ├── ItemManagement/
│   │   │   │   ├── ItemList.tsx
│   │   │   │   ├── ItemForm.tsx
│   │   │   │   ├── PriceLevelEditor.tsx
│   │   │   │   ├── CategoryManager.tsx
│   │   │   │   └── PrinterRouting.tsx
│   │   │   │
│   │   │   ├── Printer/
│   │   │   │   ├── PrinterConfig.tsx
│   │   │   │   ├── PrinterMonitor.tsx
│   │   │   │   └── PrinterTest.tsx
│   │   │   │
│   │   │   └── Reports/
│   │   │       ├── SalesReport.tsx
│   │   │       ├── ItemReport.tsx
│   │   │       └── PaymentReport.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useResponsive.ts ← KEY HOOK
│   │   │   ├── useAuth.ts
│   │   │   ├── useOrder.ts
│   │   │   ├── useKitchenSocket.ts
│   │   │   ├── useMultiDeviceSync.ts
│   │   │   ├── usePrinter.ts
│   │   │   └── useOfflineSync.ts
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── itemService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── printerService.ts
│   │   │   ├── kitchenPrinterService.ts ← KEY SERVICE
│   │   │   ├── socketService.ts
│   │   │   └── offlineService.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   ├── orderStore.ts
│   │   │   ├── uiStore.ts
│   │   │   ├── offlineStore.ts
│   │   │   └── printerStore.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   ├── localStorageUtils.ts
│   │   │   └── printUtils.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── CashierPOS.tsx ← RESPONSIVE
│   │   │   ├── KitchenMonitor.tsx ← RESPONSIVE
│   │   │   ├── BarMonitor.tsx
│   │   │   ├── ItemSettings.tsx
│   │   │   ├── PrinterSettings.tsx
│   │   │   ├── Reports.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── public/
│   │   │   ├── sw.js (service worker)
│   │   │   ├── manifest.json (PWA)
│   │   │   └── sounds/
│   │   │       ├── notification.mp3
│   │   │       ├── order-ready.mp3
│   │   │       └── payment-complete.mp3
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── responsive.css
│   │   │   └── animations.css
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── api.ts
│   │   │   └── entities.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── SETUP.md              # Setup guide
│   ├── API.md                # API documentation
│   ├── ARCHITECTURE.md        # Architecture overview
│   ├── DEPLOYMENT.md          # Deployment guide
│   ├── TROUBLESHOOTING.md     # Troubleshooting
│   └── DATABASE.md            # Database docs
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 6. **Quick Start - Step by Step**

### **Step 1: Initial Setup (15 minutes)**

```bash
# 1. Clone/Create repository
git init pos-system
cd pos-system

# 2. Create folders
mkdir backend frontend docs

# 3. Backend setup
cd backend
npm init -y
npm install express cors dotenv jsonwebtoken bcrypt socket.io prisma @prisma/client typescript ts-node @types/node @types/express

# Initialize Prisma
npx prisma init

# Create basic files
touch src/server.ts src/app.ts .env .env.example

# 4. Frontend setup
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install zustand axios socket.io-client react-i18next i18next tailwindcss postcss autoprefixer dexie

# Setup Tailwind
npx tailwindcss init -p

# Create basic structure
mkdir -p src/{config,hooks,services,stores,pages,components}

cd ..
```

### **Step 2: Database Setup (10 minutes)**

```bash
# In backend directory

# Create .env
cat > .env << EOF
DATABASE_URL="postgresql://pos_user:pos_password@localhost:5432/pos_dev"
JWT_SECRET="your-super-secret-jwt-key-change-this"
NODE_ENV="development"
PORT=3001
EOF

# Create Prisma schema (copy from section 2 earlier)
# Then run migrations
npx prisma migrate dev --name init

# Seed database
npx prisma db seed
```

### **Step 3: Run Development Servers (5 minutes)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Access:
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

### **Step 4: Create Key Components (Day 1)**

Focus on these 5 files dulu:

1. **`backend/src/services/kitchenPrinterService.ts`** - Core printer logic
2. **`frontend/src/hooks/useResponsive.ts`** - Responsive design
3. **`frontend/src/pages/CashierPOS.tsx`** - Main POS screen
4. **`frontend/src/components/Kitchen/KitchenDisplay.tsx`** - Kitchen display
5. **`frontend/src/config/responsiveConfig.ts`** - UI configuration

---

## 7. **Modern UI Styling - Tailwind Configuration**

```javascript
// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Custom device breakpoints
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1920px',
        'kitchen-display': '1920px',
      },
      colors: {
        // POS Custom Colors
        'pos-primary': '#1e40af',     // Blue
        'pos-success': '#16a34a',     // Green
        'pos-warning': '#ea580c',     // Orange
        'pos-danger': '#dc2626',      // Red
        'pos-info': '#0891b2',        // Cyan
        
        // Kitchen Display Colors
        'kitchen-pending': '#3b82f6',  // Blue
        'kitchen-cooking': '#f59e0b',  // Amber
        'kitchen-ready': '#10b981',    // Green
        'kitchen-overdue': '#ef4444',  // Red
      },
      fontSize: {
        // Responsive font sizes
        'xs': ['0.75rem', '1rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.5rem'],
        'lg': ['1.125rem', '1.75rem'],
        'xl': ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        
        // Kitchen sizes
        'kitchen-sm': ['1.5rem', '2rem'],
        'kitchen-md': ['2rem', '2.5rem'],
        'kitchen-lg': ['2.5rem', '3rem'],
        'kitchen-xl': ['3rem', '3.5rem'],
      },
      spacing: {
        // Add custom spacing
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 1s infinite',
        'notification': 'notification 0.5s ease-out',
      },
      keyframes: {
        notification: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

---

## 8. **Printer Integration - Ready to Implement**

```typescript
// backend/src/services/printerServiceImpl.ts

import Printer from 'escpos';
import USBPrinter from 'escpos-usb';
import NetworkPrinter from 'escpos-network';

/**
 * Alur Print:
 * 
 * 1. CASHIER membuat order
 *    ↓
 * 2. Kitchen Service menerima order
 *    ↓
 * 3. Separate items by printer location:
 *    - Kitchen items → print to Kitchen printer
 *    - Bar items → print to Bar printer
 *    - Both → print to both
 *    ↓
 * 4. Send receipt ke printer via:
 *    - USB (direct thermal printer)
 *    - Network/Ethernet (network thermal printer)
 *    ↓
 * 5. Emit socket event ke Kitchen/Bar displays
 *    ↓
 * 6. Kitchen/Bar staff:
 *    a. Lihat order di display
 *    b. Prepare items
 *    c. Klik "Mark Ready"
 *    ↓
 * 7. Cashier notified item ready
 *    ↓
 * 8. Serve to customer
 *    ↓
 * 9. Payment processing
 *    ↓
 * 10. Print receipt to Cashier printer
 */

export class PrinterServiceImpl {
  async printOrderToKitchen(orderId: number, items: any[]) {
    try {
      // Get kitchen printer config
      const printer = await this.getConfiguredPrinter('Kitchen');
      if (!printer) return { success: false, error: 'Kitchen printer not configured' };

      // Format ticket
      const ticket = this.formatKitchenTicket(orderId, items);
      
      // Send to printer
      await this.sendToPrinter(printer, ticket);

      return { success: true, printerId: printer.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  private formatKitchenTicket(orderId: number, items: any[]) {
    // Return ESC/POS formatted data
    // This will be printed with large fonts for visibility
    return {
      fontSize: 'large',
      content: items.map(i => `${i.name} x${i.qty}`)
    };
  }

  private async sendToPrinter(printer: any, ticket: any) {
    // Implement actual printing
  }
}
```

---

## 9. **Implementation Priority (Start Here)**

### **Week 1: Foundation**
```
Day 1-2: 
  ✓ Setup projects & database
  ✓ Auth system (login/logout)
  ✓ Basic CRUD for items

Day 3-4:
  ✓ Responsive hooks
  ✓ Table mapping UI
  ✓ Menu grid (responsive)

Day 5:
  ✓ Order entry flow
  ✓ Order summary
  ✓ Store setup (Zustand)
```

### **Week 2: Core Features**
```
Day 1-2:
  ✓ Printer configuration
  ✓ Kitchen print logic
  ✓ Kitchen Display mockup

Day 3-4:
  ✓ WebSocket for real-time
  ✓ Kitchen status updates
  ✓ Order mark ready

Day 5:
  ✓ Payment screen
  ✓ Receipt design
  ✓ End-to-end test
```

### **Week 3: Polish**
```
Day 1-2:
  ✓ Offline functionality
  ✓ Sync mechanism
  ✓ Error handling

Day 3-4:
  ✓ Localization (EN + ID)
  ✓ Mobile/tablet testing
  ✓ Performance optimization

Day 5:
  ✓ Docker setup
  ✓ Deployment prep
  ✓ Documentation
```

---

## 10. **Environment Configuration**

```bash
# backend/.env.example
DATABASE_URL="postgresql://pos_user:pos_password@localhost:5432/pos_dev"
JWT_SECRET="change-this-secret-key"
JWT_EXPIRES_IN="8h"
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="http://localhost:5173"

# Printer Configuration
PRINTER_USB_VENDOR_ID=0x04b8
PRINTER_USB_PRODUCT_ID=0x0202
PRINTER_NETWORK_IP=192.168.1.100
PRINTER_NETWORK_PORT=9100

# Offline Sync
SYNC_INTERVAL=30000 # 30 seconds
MAX_RETRY_ATTEMPTS=3
```

```bash
# frontend/.env.example
VITE_API_URL="http://localhost:3001"
VITE_SOCKET_URL="http://localhost:3001"
VITE_APP_NAME="Restaurant POS"
VITE_DEFAULT_LANGUAGE="id"
VITE_ENABLE_OFFLINE_MODE="true"
```

---

Sekarang **kamu udah punya complete blueprint** untuk mulai development! 

**Next step:** Kamu mau saya jelaskan detail file mana dulu yang harus di kerjakan? Atau kamu mau langsung kode sama-sama untuk salah satu modul tertentu?

**Yang bisa langsung di-start:**
1. Backend setup + database migrations
2. Authentication system
3. Item management CRUD
4. Kitchen printer service

Kira-kira mana yang mau kita garap duluan? 🚀



User:

berikan seluruha kode yang dpat kamu buatkan jadikan dokumntasi lengkap dan detaill tidak perlu memberikan kode kode yang sudah ada lakukan maksimal



Claude Sonnet 4.6:

# POS System - Complete Implementation Documentation
## Production-Ready Code & Architecture

---

# PART 1: DATABASE & BACKEND INITIALIZATION

## 1.1 Prisma Schema (Full Database Design)

```prisma
// backend/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== ENUMS ====================
enum UserRole {
  ADMIN
  MANAGER
  CASHIER
  KITCHEN
  BAR
}

enum PrinterType {
  USB
  NETWORK
  SERIAL
}

enum PrinterBrand {
  EPSON
  BIXOLON
  XPRINTER
  GENERIC
}

enum OrderStatus {
  PENDING      // Baru dibuat
  IN_KITCHEN   // Lagi di masak
  READY        // Siap disajikan
  SERVED       // Sudah disajikan
  CLOSED       // Pembayaran selesai
  CANCELLED    // Dibatalkan
}

enum OrderItemStatus {
  PENDING      // Waiting to be cooked
  COOKING      // Being prepared
  READY        // Ready to serve
  SERVED       // Served to customer
  CANCELLED    // Item cancelled
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
  VOIDED
}

enum SyncStatus {
  PENDING
  SYNCED
  FAILED
}

// ==================== USERS & AUTHENTICATION ====================
model User {
  id            String    @id @default(cuid())
  username      String    @unique
  password      String    // Hashed password
  name          String
  email         String?   @unique
  phone         String?
  role          UserRole  @default(CASHIER)
  isActive      Boolean   @default(true)
  lastLogin     DateTime?
  loginAttempts Int       @default(0)
  lockedUntil   DateTime?
  
  // Relations
  createdOrders Order[]
  processedPayments Payment[]
  auditLogs     AuditLog[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([username])
  @@index([email])
  @@index([role])
}

// ==================== ITEM MASTER ====================
model Category {
  id          Int       @id @default(autoincrement())
  name        String    @unique
  description String?
  displayOrder Int      @default(0)
  isActive    Boolean   @default(true)
  
  // Relations
  items       Item[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([name])
  @@index([isActive])
}

model Department {
  id          Int       @id @default(autoincrement())
  name        String    @unique // 'Kitchen', 'Bar', 'Retail'
  description String?
  
  // Relations
  items       Item[]
  
  createdAt   DateTime  @default(now())

  @@index([name])
}

model Item {
  id                  Int     @id @default(autoincrement())
  code                String  @unique // Auto-generated: ITEM-001
  name                String
  description         String?
  
  // Relations
  categoryId          Int
  category            Category @relation(fields: [categoryId], references: [id])
  departmentId        Int
  department          Department @relation(fields: [departmentId], references: [id])
  
  // Multi-level pricing
  priceLevel1         Decimal @db.Numeric(10, 2)
  priceLevel2         Decimal? @db.Numeric(10, 2)
  priceLevel3         Decimal? @db.Numeric(10, 2)
  priceLevel4         Decimal? @db.Numeric(10, 2)
  priceLevel5         Decimal? @db.Numeric(10, 2)
  
  // Tax & Service
  taxPercentage       Decimal @default(0) @db.Numeric(5, 2)
  servicePercentage   Decimal @default(0) @db.Numeric(5, 2)
  
  // Printer routing
  printerLocation     String? // 'Kitchen', 'Bar', 'Both', 'None'
  isShowKitchenMonitor Boolean @default(true)
  
  // Preparation info
  prepTimeMinutes     Int     @default(15)
  
  // Status
  isActive            Boolean @default(true)
  displayOrder        Int     @default(0)
  
  // Relations
  orderItems          OrderItem[]
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([code])
  @@index([categoryId])
  @@index([departmentId])
  @@index([isActive])
  @@index([printerLocation])
}

// ==================== RESTAURANT SETUP ====================
model TableZone {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  description String?
  displayOrder Int    @default(0)
  
  // Relations
  tables      RestaurantTable[]
  
  createdAt   DateTime @default(now())

  @@index([name])
}

model RestaurantTable {
  id            Int     @id @default(autoincrement())
  tableNumber   String
  zoneId        Int?
  zone          TableZone? @relation(fields: [zoneId], references: [id])
  
  capacity      Int     @default(4)
  status        String  @default("available") // available, occupied, reserved, maintenance
  
  // Current order tracking
  currentOrderId Int?
  currentOrder  Order?  @relation("CurrentTableOrder", fields: [currentOrderId], references: [id], onDelete: SetNull)
  
  isActive      Boolean @default(true)
  
  // Relations
  orders        Order[] @relation("TableOrders")
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([tableNumber, zoneId])
  @@index([status])
  @@index([zoneId])
}

// ==================== ORDERS ====================
model Order {
  id              Int       @id @default(autoincrement())
  orderNumber     String    @unique // ORD-20240101-001
  
  // Location info
  tableId         Int?
  table           RestaurantTable? @relation("TableOrders", fields: [tableId], references: [id], onDelete: SetNull)
  customerName    String?
  orderType       String    @default("dine-in") // dine-in, takeaway, delivery, retail
  
  // Order status
  status          OrderStatus @default(PENDING)
  
  // Financial info
  totalItems      Int       @default(0)
  subtotal        Decimal   @default(0) @db.Numeric(12, 2)
  taxAmount       Decimal   @default(0) @db.Numeric(12, 2)
  serviceAmount   Decimal   @default(0) @db.Numeric(12, 2)
  discountAmount  Decimal   @default(0) @db.Numeric(12, 2)
  discountPercentage Decimal? @db.Numeric(5, 2)
  grandTotal      Decimal   @default(0) @db.Numeric(12, 2)
  
  // Notes & Timing
  notes           String?
  createdById     String
  createdBy       User    @relation(fields: [createdById], references: [id])
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  servedAt        DateTime?
  closedAt        DateTime?
  
  // Offline tracking
  syncedAt        DateTime?
  syncStatus      SyncStatus @default(PENDING)
  
  // Relations
  orderItems      OrderItem[]
  payments        Payment[]
  currentTable    RestaurantTable? @relation("CurrentTableOrder")
  
  @@index([orderNumber])
  @@index([tableId])
  @@index([status])
  @@index([createdAt])
  @@index([createdById])
  @@index([syncStatus])
}

model OrderItem {
  id                  Int     @id @default(autoincrement())
  
  // Relations
  orderId             Int
  order               Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  itemId              Int
  item                Item    @relation(fields: [itemId], references: [id])
  
  quantity            Int     @default(1)
  
  // Pricing info
  priceLevel          Int     @default(1) // 1-5
  unitPrice           Decimal @db.Numeric(10, 2)
  
  // Item taxes & service
  itemTaxPercentage   Decimal @default(0) @db.Numeric(5, 2)
  itemServicePercentage Decimal @default(0) @db.Numeric(5, 2)
  taxAmount           Decimal @default(0) @db.Numeric(12, 2)
  serviceAmount       Decimal @default(0) @db.Numeric(12, 2)
  
  // Calculations
  subtotal            Decimal @default(0) @db.Numeric(12, 2)
  total               Decimal @default(0) @db.Numeric(12, 2)
  
  // Special requests
  specialInstructions String?
  
  // Status tracking
  status              OrderItemStatus @default(PENDING)
  sentToKitchen       Boolean @default(false)
  sentToBar           Boolean @default(false)
  sentAt              DateTime?
  readyAt             DateTime?
  cancelledReason     String?
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@index([orderId])
  @@index([itemId])
  @@index([status])
  @@index([sentToKitchen])
  @@index([sentToBar])
}

// ==================== PAYMENTS ====================
model PaymentMethod {
  id              Int     @id @default(autoincrement())
  name            String  @unique // 'Cash', 'Debit Card', 'Credit Card', 'E-Wallet'
  description     String?
  requiresReference Boolean @default(false)
  isActive        Boolean @default(true)
  displayOrder    Int     @default(0)
  
  // Relations
  payments        Payment[]
  
  createdAt       DateTime @default(now())

  @@index([name])
}

model Payment {
  id                  Int     @id @default(autoincrement())
  
  // Relations
  orderId             Int
  order               Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  paymentMethodId     Int
  paymentMethod       PaymentMethod @relation(fields: [paymentMethodId], references: [id])
  
  amount              Decimal @db.Numeric(12, 2)
  referenceNumber     String? // Nomor kartu, nomor ref transfer, dll
  status              PaymentStatus @default(COMPLETED)
  
  notes               String?
  processedById       String
  processedBy         User    @relation(fields: [processedById], references: [id])
  
  createdAt           DateTime @default(now())

  @@index([orderId])
  @@index([paymentMethodId])
  @@index([createdAt])
}

// ==================== PRINTER CONFIGURATION ====================
model PrinterConfig {
  id              Int     @id @default(autoincrement())
  
  name            String  @unique
  location        String  // 'Kitchen', 'Bar', 'Cashier'
  
  // Connection info
  type            PrinterType
  brand           PrinterBrand @default(GENERIC)
  
  // USB config
  vendorId        Int?
  productId       Int?
  
  // Network config
  ipAddress       String?
  port            Int     @default(9100)
  
  // Serial config
  serialPort      String?
  baudRate        Int     @default(9600)
  
  // Printer specs
  paperWidth      Int     @default(80) // 58, 80 mm
  
  // Status
  isActive        Boolean @default(true)
  lastTested      DateTime?
  isOnline        Boolean @default(false)
  lastError       String?
  
  // Tracking
  testCount       Int     @default(0)
  successCount    Int     @default(0)
  failureCount    Int     @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([location])
  @@index([isActive])
  @@index([type])
}

// ==================== KITCHEN MONITOR ====================
model KitchenMonitor {
  id              Int     @id @default(autoincrement())
  
  name            String  @unique
  location        String  // 'Kitchen', 'Bar'
  deviceId        String?
  
  // Display settings
  autoRefreshSeconds Int  @default(10)
  showTableNumber Boolean @default(true)
  showSpecialInstructions Boolean @default(true)
  showPrepTime    Boolean @default(true)
  
  isActive        Boolean @default(true)
  lastActive      DateTime?
  
  createdAt       DateTime @default(now())

  @@index([location])
}

// ==================== AUDIT LOG ====================
model AuditLog {
  id              Int     @id @default(autoincrement())
  
  userId          String?
  user            User?   @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  action          String  // 'create_order', 'delete_item', 'process_payment'
  entityType      String  // 'order', 'payment', 'item', 'user'
  entityId        Int?
  
  oldValues       Json?   // JSONB
  newValues       Json?   // JSONB
  
  ipAddress       String?
  userAgent       String?
  
  createdAt       DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([entityType])
  @@index([createdAt])
}

// ==================== SYNC HISTORY ====================
model SyncHistory {
  id              Int     @id @default(autoincrement())
  
  deviceId        String
  entityType      String
  entityId        Int
  
  action          String  // 'create', 'update', 'delete'
  status          SyncStatus @default(PENDING)
  
  localData       Json?
  syncError       String?
  
  createdAt       DateTime @default(now())
  syncedAt        DateTime?

  @@unique([deviceId, entityType, entityId, createdAt])
  @@index([deviceId])
  @@index([status])
}

// ==================== TRANSACTIONS VIEW ====================
model DailySalesView {
  saleDate        DateTime
  totalTransactions Int
  totalSubtotal   Decimal @db.Numeric(12, 2)
  totalTax        Decimal @db.Numeric(12, 2)
  totalService    Decimal @db.Numeric(12, 2)
  totalDiscount   Decimal @db.Numeric(12, 2)
  totalRevenue    Decimal @db.Numeric(12, 2)
  totalCashiers   Int
  paymentMethods  String?

  @@id([saleDate])
}

// ==================== INVENTORY (OPTIONAL FOR FUTURE) ====================
model StockMovement {
  id              Int     @id @default(autoincrement())
  
  itemId          Int
  quantity        Int
  type            String  // 'in', 'out', 'adjustment'
  reason          String?
  referenceId     Int?    // Order ID, Purchase ID, etc
  
  createdAt       DateTime @default(now())

  @@index([itemId])
  @@index([type])
}
```

---

## 1.2 Environment Configuration

```bash
# backend/.env.local (Development)

# Database
DATABASE_URL="postgresql://pos_user:pos_password@localhost:5432/pos_dev"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="8h"
JWT_REFRESH_SECRET="refresh-secret-key-min-32-chars"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="http://localhost:5173"

# Logging
LOG_LEVEL="debug"

# Printer USB Config
PRINTER_USB_VENDOR_ID="0x04b8"
PRINTER_USB_PRODUCT_ID="0x0202"

# Printer Network
PRINTER_NETWORK_IP="192.168.1.100"
PRINTER_NETWORK_PORT="9100"

# Offline Sync
SYNC_INTERVAL="30000"
MAX_RETRY_ATTEMPTS="3"
BATCH_SYNC_SIZE="50"

# Features
ENABLE_OFFLINE_MODE="true"
ENABLE_MULTI_DEVICE_SYNC="true"
ENABLE_AUTO_BACKUP="true"

# Session
SESSION_TIMEOUT_MINUTES="480"
LOGIN_ATTEMPT_LIMIT="5"
LOGIN_LOCKOUT_MINUTES="15"

# Email (for future use)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

---

## 1.3 Prisma Seed Data

```typescript
// backend/prisma/seed.ts

import { PrismaClient, UserRole, PrinterType, PrinterBrand, PrinterBrand as PB, OrderStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ==================== CLEAR DATA ====================
  await prisma.auditLog.deleteMany({});
  await prisma.syncHistory.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.restaurantTable.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.paymentMethod.deleteMany({});
  await prisma.printerConfig.deleteMany({});
  await prisma.kitchenMonitor.deleteMany({});
  await prisma.user.deleteMany({});

  // ==================== CREATE USERS ====================
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      name: "Admin User",
      email: "admin@pos.local",
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  const manager = await prisma.user.create({
    data: {
      username: "manager",
      password: hashedPassword,
      name: "Manager",
      email: "manager@pos.local",
      role: UserRole.MANAGER,
      isActive: true,
    },
  });

  const cashier1 = await prisma.user.create({
    data: {
      username: "cashier1",
      password: hashedPassword,
      name: "Cashier 1",
      email: "cashier1@pos.local",
      role: UserRole.CASHIER,
      isActive: true,
    },
  });

  const cashier2 = await prisma.user.create({
    data: {
      username: "cashier2",
      password: hashedPassword,
      name: "Cashier 2",
      email: "cashier2@pos.local",
      role: UserRole.CASHIER,
      isActive: true,
    },
  });

  const kitchenStaff = await prisma.user.create({
    data: {
      username: "kitchen",
      password: hashedPassword,
      name: "Kitchen Staff",
      email: "kitchen@pos.local",
      role: UserRole.KITCHEN,
      isActive: true,
    },
  });

  const barStaff = await prisma.user.create({
    data: {
      username: "bar",
      password: hashedPassword,
      name: "Bar Staff",
      email: "bar@pos.local",
      role: UserRole.BAR,
      isActive: true,
    },
  });

  console.log("✓ Users created");

  // ==================== CREATE DEPARTMENTS ====================
  const kitchenDept = await prisma.department.create({
    data: { name: "Kitchen", description: "Dapur" },
  });

  const barDept = await prisma.department.create({
    data: { name: "Bar", description: "Bar/Minuman" },
  });

  const retailDept = await prisma.department.create({
    data: { name: "Retail", description: "Retail/Penjualan" },
  });

  console.log("✓ Departments created");

  // ==================== CREATE CATEGORIES ====================
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Appetizers", description: "Makanan pembuka", displayOrder: 1 },
    }),
    prisma.category.create({
      data: { name: "Main Course", description: "Menu utama", displayOrder: 2 },
    }),
    prisma.category.create({
      data: { name: "Beverages", description: "Minuman", displayOrder: 3 },
    }),
    prisma.category.create({
      data: { name: "Desserts", description: "Penutup", displayOrder: 4 },
    }),
    prisma.category.create({
      data: { name: "Alcoholic Drinks", description: "Minuman beralkohol", displayOrder: 5 },
    }),
  ]);

  console.log("✓ Categories created");

  // ==================== CREATE ITEMS ====================
  const items = await Promise.all([
    // Appetizers - Kitchen
    prisma.item.create({
      data: {
        code: "APT-001",
        name: "Lumpia Goreng",
        description: "Spring rolls yang gurih",
        categoryId: categories[0].id,
        departmentId: kitchenDept.id,
        priceLevel1: 35000,
        priceLevel2: 33000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 10,
        displayOrder: 1,
      },
    }),
    prisma.item.create({
      data: {
        code: "APT-002",
        name: "Satay Chicken",
        description: "Sate ayam dengan bumbu kacang",
        categoryId: categories[0].id,
        departmentId: kitchenDept.id,
        priceLevel1: 45000,
        priceLevel2: 42000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 12,
        displayOrder: 2,
      },
    }),

    // Main Course - Kitchen
    prisma.item.create({
      data: {
        code: "MAIN-001",
        name: "Grilled Salmon",
        description: "Ikan salmon panggang dengan sayuran",
        categoryId: categories[1].id,
        departmentId: kitchenDept.id,
        priceLevel1: 125000,
        priceLevel2: 118000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 20,
        displayOrder: 1,
      },
    }),
    prisma.item.create({
      data: {
        code: "MAIN-002",
        name: "Beef Steak",
        description: "Daging sapi premium dengan saus khusus",
        categoryId: categories[1].id,
        departmentId: kitchenDept.id,
        priceLevel1: 135000,
        priceLevel2: 128000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 25,
        displayOrder: 2,
      },
    }),
    prisma.item.create({
      data: {
        code: "MAIN-003",
        name: "Chicken Teriyaki",
        description: "Ayam dengan saus teriyaki asli",
        categoryId: categories[1].id,
        departmentId: kitchenDept.id,
        priceLevel1: 85000,
        priceLevel2: 80000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 18,
        displayOrder: 3,
      },
    }),
    prisma.item.create({
      data: {
        code: "MAIN-004",
        name: "Vegetable Pasta",
        description: "Pasta dengan sayuran organik segar",
        categoryId: categories[1].id,
        departmentId: kitchenDept.id,
        priceLevel1: 65000,
        priceLevel2: 61000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 15,
        displayOrder: 4,
      },
    }),

    // Beverages - Bar
    prisma.item.create({
      data: {
        code: "BEV-001",
        name: "Iced Tea",
        description: "Teh dingin segar",
        categoryId: categories[2].id,
        departmentId: barDept.id,
        priceLevel1: 15000,
        priceLevel2: 14000,
        taxPercentage: 0,
        servicePercentage: 0,
        printerLocation: "Bar",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 2,
        displayOrder: 1,
      },
    }),
    prisma.item.create({
      data: {
        code: "BEV-002",
        name: "Fresh Orange Juice",
        description: "Jus jeruk segar",
        categoryId: categories[2].id,
        departmentId: barDept.id,
        priceLevel1: 25000,
        priceLevel2: 23000,
        taxPercentage: 0,
        servicePercentage: 0,
        printerLocation: "Bar",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 3,
        displayOrder: 2,
      },
    }),
    prisma.item.create({
      data: {
        code: "BEV-003",
        name: "Coffee Latte",
        description: "Kopi latte premium",
        categoryId: categories[2].id,
        departmentId: barDept.id,
        priceLevel1: 35000,
        priceLevel2: 32000,
        taxPercentage: 0,
        servicePercentage: 0,
        printerLocation: "Bar",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 4,
        displayOrder: 3,
      },
    }),

    // Alcoholic Drinks - Bar
    prisma.item.create({
      data: {
        code: "ALC-001",
        name: "Beer (Bintang)",
        description: "Bir lokal",
        categoryId: categories[4].id,
        departmentId: barDept.id,
        priceLevel1: 45000,
        priceLevel2: 42000,
        taxPercentage: 0,
        servicePercentage: 0,
        printerLocation: "Bar",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 1,
        displayOrder: 1,
      },
    }),
    prisma.item.create({
      data: {
        code: "ALC-002",
        name: "Margarita",
        description: "Minuman campuran premium",
        categoryId: categories[4].id,
        departmentId: barDept.id,
        priceLevel1: 75000,
        priceLevel2: 70000,
        taxPercentage: 0,
        servicePercentage: 0,
        printerLocation: "Bar",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 5,
        displayOrder: 2,
      },
    }),

    // Desserts - Kitchen
    prisma.item.create({
      data: {
        code: "DES-001",
        name: "Chocolate Cake",
        description: "Kue coklat berlapis",
        categoryId: categories[3].id,
        departmentId: kitchenDept.id,
        priceLevel1: 45000,
        priceLevel2: 42000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 8,
        displayOrder: 1,
      },
    }),
    prisma.item.create({
      data: {
        code: "DES-002",
        name: "Tiramisu",
        description: "Tiramisu Italia asli",
        categoryId: categories[3].id,
        departmentId: kitchenDept.id,
        priceLevel1: 55000,
        priceLevel2: 52000,
        taxPercentage: 0,
        servicePercentage: 10,
        printerLocation: "Kitchen",
        isShowKitchenMonitor: true,
        prepTimeMinutes: 5,
        displayOrder: 2,
      },
    }),
  ]);

  console.log("✓ Items created");

  // ==================== CREATE PAYMENT METHODS ====================
  const paymentMethods = await Promise.all([
    prisma.paymentMethod.create({
      data: {
        name: "Cash",
        description: "Pembayaran tunai",
        requiresReference: false,
        isActive: true,
        displayOrder: 1,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: "Debit Card",
        description: "Kartu debit",
        requiresReference: true,
        isActive: true,
        displayOrder: 2,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: "Credit Card",
        description: "Kartu kredit",
        requiresReference: true,
        isActive: true,
        displayOrder: 3,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: "E-Wallet",
        description: "Dompet digital (GCash, OVO, Dana)",
        requiresReference: true,
        isActive: true,
        displayOrder: 4,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: "Bank Transfer",
        description: "Transfer bank",
        requiresReference: true,
        isActive: true,
        displayOrder: 5,
      },
    }),
    prisma.paymentMethod.create({
      data: {
        name: "Check",
        description: "Cek/Cheque",
        requiresReference: true,
        isActive: false,
        displayOrder: 6,
      },
    }),
  ]);

  console.log("✓ Payment methods created");

  // ==================== CREATE TABLE ZONES ====================
  const zones = await Promise.all([
    prisma.tableZone.create({
      data: { name: "Main Hall", description: "Ruang utama", displayOrder: 1 },
    }),
    prisma.tableZone.create({
      data: { name: "VIP Room", description: "Ruang VIP", displayOrder: 2 },
    }),
    prisma.tableZone.create({
      data: { name: "Patio", description: "Area luar", displayOrder: 3 },
    }),
  ]);

  console.log("✓ Table zones created");

  // ==================== CREATE RESTAURANT TABLES ====================
  let tableNum = 1;
  const tables = [];

  // Main Hall - 8 meja
  for (let i = 0; i < 8; i++) {
    tables.push(
      await prisma.restaurantTable.create({
        data: {
          tableNumber: `T${tableNum}`,
          zoneId: zones[0].id,
          capacity: 4,
          status: "available",
          isActive: true,
        },
      })
    );
    tableNum++;
  }

  // VIP Room - 3 meja
  for (let i = 0; i < 3; i++) {
    tables.push(
      await prisma.restaurantTable.create({
        data: {
          tableNumber: `VIP${tableNum - 8}`,
          zoneId: zones[1].id,
          capacity: 6,
          status: "available",
          isActive: true,
        },
      })
    );
    tableNum++;
  }

  // Patio - 5 meja
  for (let i = 0; i < 5; i++) {
    tables.push(
      await prisma.restaurantTable.create({
        data: {
          tableNumber: `P${i + 1}`,
          zoneId: zones[2].id,
          capacity: 2,
          status: "available",
          isActive: true,
        },
      })
    );
  }

  console.log("✓ Restaurant tables created");

  // ==================== CREATE PRINTER CONFIGURATIONS ====================
  const kitchenPrinter = await prisma.printerConfig.create({
    data: {
      name: "Kitchen Printer 1",
      location: "Kitchen",
      type: PrinterType.NETWORK,
      brand: PrinterBrand.EPSON,
      ipAddress: "192.168.1.101",
      port: 9100,
      paperWidth: 80,
      isActive: true,
      isOnline: false,
    },
  });

  const barPrinter = await prisma.printerConfig.create({
    data: {
      name: "Bar Printer 1",
      location: "Bar",
      type: PrinterType.NETWORK,
      brand: PrinterBrand.XPRINTER,
      ipAddress: "192.168.1.102",
      port: 9100,
      paperWidth: 80,
      isActive: true,
      isOnline: false,
    },
  });

  const cashierPrinter = await prisma.printerConfig.create({
    data: {
      name: "Cashier Printer 1",
      location: "Cashier",
      type: PrinterType.USB,
      brand: PrinterBrand.EPSON,
      vendorId: 0x04b8,
      productId: 0x0202,
      paperWidth: 80,
      isActive: true,
      isOnline: false,
    },
  });

  console.log("✓ Printer configurations created");

  // ==================== CREATE KITCHEN MONITORS ====================
  await Promise.all([
    prisma.kitchenMonitor.create({
      data: {
        name: "Main Kitchen Display",
        location: "Kitchen",
        deviceId: "kitchen-display-01",
        autoRefreshSeconds: 10,
        showTableNumber: true,
        showSpecialInstructions: true,
        showPrepTime: true,
        isActive: true,
      },
    }),
    prisma.kitchenMonitor.create({
      data: {
        name: "Bar Display",
        location: "Bar",
        deviceId: "bar-display-01",
        autoRefreshSeconds: 10,
        showTableNumber: true,
        showSpecialInstructions: true,
        showPrepTime: true,
        isActive: true,
      },
    }),
  ]);

  console.log("✓ Kitchen monitors created");

  console.log("✅ Database seeding completed successfully!");
  console.log("\n📋 Test Credentials:");
  console.log("  Admin: admin / password123");
  console.log("  Manager: manager / password123");
  console.log("  Cashier: cashier1 / password123");
  console.log("  Kitchen: kitchen / password123");
  console.log("  Bar: bar / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 1.4 Database Migration Script

```bash
# backend/package.json (scripts section)

{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:init": "prisma migrate dev --name init",
    "db:push": "prisma db push",
    "db:seed": "ts-node prisma/seed.ts",
    "db:reset": "prisma migrate reset --force",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "prisma:generate": "prisma generate"
  }
}
```

```bash
# Run setup commands in order:

# 1. Generate Prisma client
npm run prisma:generate

# 2. Create initial migration
npm run db:init

# 3. Seed database with test data
npm run db:seed

# 4. Open database studio (optional)
npm run db:studio
```

---

# PART 2: BACKEND CORE SERVICES

## 2.1 Authentication Service

```typescript
// backend/src/services/authService.ts

import { prisma } from "@/config/database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

interface TokenPayload {
  id: string;
  username: string;
  role: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

export class AuthService {
  /**
   * Login user dengan username dan password
   * Returns: Access Token, Refresh Token, User Data
   */
  static async login(username: string, password: string): Promise<LoginResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    if (!user.isActive) {
      throw new Error("Account is inactive");
    }

    // Check login attempts (brute force protection)
    if (user.loginAttempts >= 5) {
      const lockedUntil = user.lockedUntil ? new Date(user.lockedUntil) : new Date(0);
      if (new Date() < lockedUntil) {
        const remainingTime = Math.ceil(
          (lockedUntil.getTime() - new Date().getTime()) / 1000 / 60
        );
        throw new Error(
          `Account locked. Try again in ${remainingTime} minutes`
        );
      }
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Increment login attempts
      await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: user.loginAttempts + 1,
          lockedUntil:
            user.loginAttempts + 1 >= 5
              ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
              : null,
        },
      });

      throw new Error("Invalid username or password");
    }

    // Reset login attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date(),
      },
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Return response (exclude password)
    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    };
  }

  /**
   * Verify access token
   */
  static async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string): Promise<string> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as TokenPayload;

      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || !user.isActive) {
        throw new Error("User not found or inactive");
      }

      // Generate new access token
      return this.generateAccessToken(user);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  /**
   * Change password
   */
  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new Error("Old password is incorrect");
    }

    // Validate new password
    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  /**
   * Reset password (admin only)
   */
  static async resetPassword(userId: string, newPassword: string): Promise<void> {
    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        loginAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  /**
   * Logout (invalidate refresh token on client side)
   */
  static async logout(userId: string): Promise<void> {
    // Update last activity
    await prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });
  }

  // ==================== PRIVATE METHODS ====================

  private static generateAccessToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN || "8h",
    });
  }

  private static generateRefreshToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });
  }
}
```

---

## 2.2 Order Service (Core Business Logic)

```typescript
// backend/src/services/orderService.ts

import { prisma } from "@/config/database";
import { OrderStatus, OrderItemStatus, Prisma } from "@prisma/client";
import { io } from "@/config/socket";
import { KitchenPrinterService } from "./kitchenPrinterService";

interface CreateOrderItemInput {
  itemId: number;
  quantity: number;
  priceLevel?: number;
  specialInstructions?: string;
}

interface CreateOrderInput {
  tableId?: number;
  customerName?: string;
  orderType: string; // 'dine-in', 'takeaway', 'delivery', 'retail'
  items: CreateOrderItemInput[];
  notes?: string;
  createdById: string;
}

interface OrderResponse {
  id: number;
  orderNumber: string;
  table?: any;
  customerName?: string;
  orderType: string;
  status: OrderStatus;
  items: any[];
  subtotal: number;
  taxAmount: number;
  serviceAmount: number;
  discountAmount: number;
  grandTotal: number;
  createdAt: Date;
}

export class OrderService {
  /**
   * Create new order
   */
  static async createOrder(input: CreateOrderInput): Promise<OrderResponse> {
    // Validate
    if (!input.items || input.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    if (input.orderType === "dine-in" && !input.tableId) {
      throw new Error("Table is required for dine-in orders");
    }

    // Generate order number
    const orderNumber = await this.generateOrderNumber();

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        tableId: input.tableId,
        customerName: input.customerName,
        orderType: input.orderType,
        notes: input.notes,
        createdById: input.createdById,
        status: OrderStatus.PENDING,
        orderItems: {
          create: await Promise.all(
            input.items.map((item) => this.formatOrderItem(item))
          ),
        },
      },
      include: {
        orderItems: {
          include: { item: true },
        },
        table: true,
        createdBy: true,
      },
    });

    // Calculate totals
    const calculated = await this.calculateOrderTotals(order.id);

    // Update table status if dine-in
    if (input.tableId) {
      await prisma.restaurantTable.update({
        where: { id: input.tableId },
        data: {
          status: "occupied",
          currentOrderId: order.id,
        },
      });
    }

    // Send to kitchen/bar printers
    await KitchenPrinterService.handleNewOrder(order.id);

    // Emit socket event
    io.of("/cashier").emit("order_created", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      timestamp: new Date(),
    });

    return this.formatOrderResponse(calculated);
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: number): Promise<OrderResponse> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: { item: true },
        },
        table: true,
        payments: {
          include: { paymentMethod: true },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return this.formatOrderResponse(order);
  }

  /**
   * Get all orders (with filters)
   */
  static async getAllOrders(filters?: {
    status?: OrderStatus;
    tableId?: number;
    orderType?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ orders: OrderResponse[]; total: number }> {
    const where: Prisma.OrderWhereInput = {};

    if (filters?.status) where.status = filters.status;
    if (filters?.tableId) where.tableId = filters.tableId;
    if (filters?.orderType) where.orderType = filters.orderType;

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate)
        (where.createdAt as any).gte = filters.startDate;
      if (filters.endDate) (where.createdAt as any).lte = filters.endDate;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          orderItems: { include: { item: true } },
          table: true,
        },
        orderBy: { createdAt: "desc" },
        take: filters?.limit || 50,
        skip: filters?.offset || 0,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map((o) => this.formatOrderResponse(o)),
      total,
    };
  }

  /**
   * Add item to existing order
   */
  static async addOrderItem(
    orderId: number,
    itemInput: CreateOrderItemInput
  ): Promise<OrderResponse> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.CLOSED) {
      throw new Error("Cannot add items to closed order");
    }

    // Add item
    await prisma.orderItem.create({
      data: {
        orderId,
        ...(await this.formatOrderItem(itemInput)),
      },
    });

    // Recalculate totals
    const updated = await this.calculateOrderTotals(orderId);

    // Notify if order was already sent to kitchen
    if (order.status !== OrderStatus.PENDING) {
      await KitchenPrinterService.handleNewItem(orderId, itemInput.itemId);
    }

    return this.formatOrderResponse(updated);
  }

  /**
   * Remove item from order
   */
  static async removeOrderItem(orderItemId: number): Promise<OrderResponse> {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });

    if (!orderItem) {
      throw new Error("Order item not found");
    }

    // Check if already served
    if (orderItem.status === OrderItemStatus.SERVED) {
      throw new Error("Cannot remove already served item");
    }

    // Delete item
    await prisma.orderItem.delete({
      where: { id: orderItemId },
    });

    // Recalculate totals
    const updated = await this.calculateOrderTotals(orderItem.orderId);

    return this.formatOrderResponse(updated);
  }

  /**
   * Send order to kitchen/bar
   */
  static async sendToKitchen(orderId: number): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: { include: { item: true } } },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.IN_KITCHEN },
    });

    // Send to printer and displays
    await KitchenPrinterService.handleNewOrder(orderId);

    // Emit event
    io.of("/kitchen").emit("orders_updated", { orderId });
    io.of("/bar").emit("orders_updated", { orderId });
  }

  /**
   * Mark order items as ready
   */
  static async markItemsReady(
    orderId: number,
    itemIds: number[]
  ): Promise<void> {
    // Update items
    await prisma.orderItem.updateMany({
      where: { id: { in: itemIds } },
      data: {
        status: OrderItemStatus.READY,
        readyAt: new Date(),
      },
    });

    // Check if all items ready
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (order!.orderItems.every((oi) => oi.status === OrderItemStatus.READY)) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.READY },
      });
    }

    // Notify cashier
    io.of("/cashier").emit("items_ready", {
      orderId,
      itemIds,
      timestamp: new Date(),
    });
  }

  /**
   * Close order (after payment)
   */
  static async closeOrder(orderId: number): Promise<OrderResponse> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Update order
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.CLOSED,
        closedAt: new Date(),
      },
      include: {
        orderItems: { include: { item: true } },
        table: true,
      },
    });

    // Clear table if dine-in
    if (updated.tableId) {
      await prisma.restaurantTable.update({
        where: { id: updated.tableId },
        data: {
          status: "available",
          currentOrderId: null,
        },
      });
    }

    // Emit event
    io.of("/cashier").emit("order_closed", { orderId });

    return this.formatOrderResponse(updated);
  }

  /**
   * Cancel order
   */
  static async cancelOrder(orderId: number, reason?: string): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if ([OrderStatus.SERVED, OrderStatus.CLOSED].includes(order.status)) {
      throw new Error("Cannot cancel order in this status");
    }

    // Update order and items
    await Promise.all([
      prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.CANCELLED },
      }),
      prisma.orderItem.updateMany({
        where: { orderId },
        data: {
          status: OrderItemStatus.CANCELLED,
          cancelledReason: reason,
        },
      }),
    ]);

    // Clear table
    if (order.tableId) {
      await prisma.restaurantTable.update({
        where: { id: order.tableId },
        data: { status: "available", currentOrderId: null },
      });
    }

    // Emit event
    io.of("/kitchen").emit("order_cancelled", { orderId });
    io.of("/bar").emit("order_cancelled", { orderId });
  }

  // ==================== PRIVATE HELPER METHODS ====================

  private static async generateOrderNumber(): Promise<string> {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const count = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });
    const sequence = String(count + 1).padStart(3, "0");
    return `ORD-${date}-${sequence}`;
  }

  private static async formatOrderItem(item: CreateOrderItemInput): Promise<any> {
    const dbItem = await prisma.item.findUnique({
      where: { id: item.itemId },
    });

    if (!dbItem) {
      throw new Error(`Item ${item.itemId} not found`);
    }

    const priceLevel = item.priceLevel || 1;
    const unitPrice = this.getPriceLevel(dbItem, priceLevel);
    const subtotal = Number(unitPrice) * item.quantity;
    const taxAmount = (subtotal * Number(dbItem.taxPercentage)) / 100;
    const serviceAmount = (subtotal * Number(dbItem.servicePercentage)) / 100;

    return {
      itemId: item.itemId,
      quantity: item.quantity,
      priceLevel,
      unitPrice,
      itemTaxPercentage: dbItem.taxPercentage,
      itemServicePercentage: dbItem.servicePercentage,
      taxAmount,
      serviceAmount,
      subtotal,
      total: subtotal + taxAmount + serviceAmount,
      specialInstructions: item.specialInstructions,
      status: OrderItemStatus.PENDING,
    };
  }

  private static getPriceLevel(item: any, level: number): Prisma.Decimal {
    switch (level) {
      case 1:
        return item.priceLevel1;
      case 2:
        return item.priceLevel2 || item.priceLevel1;
      case 3:
        return item.priceLevel3 || item.priceLevel1;
      case 4:
        return item.priceLevel4 || item.priceLevel1;
      case 5:
        return item.priceLevel5 || item.priceLevel1;
      default:
        return item.priceLevel1;
    }
  }

  private static async calculateOrderTotals(orderId: number): Promise<any> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) throw new Error("Order not found");

    const totalItems = order.orderItems.reduce((sum, oi) => sum + oi.quantity, 0);
    const subtotal = order.orderItems.reduce(
      (sum, oi) => sum + Number(oi.subtotal),
      0
    );
    const taxAmount = order.orderItems.reduce(
      (sum, oi) => sum + Number(oi.taxAmount),
      0
    );
    const serviceAmount = order.orderItems.reduce(
      (sum, oi) => sum + Number(oi.serviceAmount),
      0
    );
    const grandTotal = subtotal + taxAmount + serviceAmount - Number(order.discountAmount);

    // Update order
    return await prisma.order.update({
      where: { id: orderId },
      data: {
        totalItems,
        subtotal,
        taxAmount,
        serviceAmount,
        grandTotal,
      },
      include: {
        orderItems: { include: { item: true } },
        table: true,
      },
    });
  }

  private static formatOrderResponse(order: any): OrderResponse {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      table: order.table
        ? {
            id: order.table.id,
            tableNumber: order.table.tableNumber,
            capacity: order.table.capacity,
          }
        : undefined,
      customerName: order.customerName,
      orderType: order.orderType,
      status: order.status,
      items: order.orderItems.map((oi: any) => ({
        id: oi.id,
        itemId: oi.item.id,
        name: oi.item.name,
        quantity: oi.quantity,
        unitPrice: Number(oi.unitPrice),
        subtotal: Number(oi.subtotal),
        taxAmount: Number(oi.taxAmount),
        serviceAmount: Number(oi.serviceAmount),
        total: Number(oi.total),
        specialInstructions: oi.specialInstructions,
        status: oi.status,
      })),
      subtotal: Number(order.subtotal),
      taxAmount: Number(order.taxAmount),
      serviceAmount: Number(order.serviceAmount),
      discountAmount: Number(order.discountAmount || 0),
      grandTotal: Number(order.grandTotal),
      createdAt: order.createdAt,
    };
  }
}
```

---

## 2.3 Kitchen Printer Service (Complete Implementation)

```typescript
// backend/src/services/kitchenPrinterService.ts

import { prisma } from "@/config/database";
import { io } from "@/config/socket";
import { printerManager } from "./printerService";
import { OrderItemStatus } from "@prisma/client";

interface KitchenTicketData {
  orderId: number;
  orderNumber: string;
  table?: string;
  items: TicketItem[];
  timestamp: Date;
  notes?: string;
}

interface TicketItem {
  itemId: number;
  name: string;
  quantity:
