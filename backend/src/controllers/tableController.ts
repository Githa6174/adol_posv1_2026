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
}
