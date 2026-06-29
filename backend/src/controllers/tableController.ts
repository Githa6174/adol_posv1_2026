import { Request, Response } from 'express';
import { TableService } from '../services/tableService';

const tableService = new TableService();

export class TableController {
  getZones = async (req: Request, res: Response) => {
    res.json(await tableService.getZones());
  }

  createZone = async (req: Request, res: Response) => {
    res.json(await tableService.createZone(req.body));
  }

  getTables = async (req: Request, res: Response) => {
    res.json(await tableService.getTables());
  }

  createTable = async (req: Request, res: Response) => {
    res.json(await tableService.createTable(req.body));
  }

  updateTableStatus = async (req: Request, res: Response) => {
    res.json(await tableService.updateTableStatus(Number(req.params.id), req.body.status));
  }

  updateTable = async (req: Request, res: Response) => {
    try {
      const updated = await tableService.updateTable(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteTable = async (req: Request, res: Response) => {
    try {
      await tableService.deleteTable(Number(req.params.id));
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
