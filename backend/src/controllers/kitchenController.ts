import { Request, Response } from 'express';
import { KitchenService } from '../services/kitchenService';

const kitchenService = new KitchenService();

export class KitchenController {
  getPendingItems = async (req: Request, res: Response) => {
    res.json(await kitchenService.getPendingItems());
  }

  updateItemStatus = async (req: Request, res: Response) => {
    res.json(await kitchenService.updateItemStatus(Number(req.params.id), req.body.status));
  }
}
