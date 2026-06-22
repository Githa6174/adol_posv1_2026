import { Router } from 'express';
import { KitchenController } from '../controllers/kitchenController';
import { requireAuth } from '../middleware/auth.middleware';

export const kitchenRouter = Router();
const kitchenController = new KitchenController();

kitchenRouter.use(requireAuth);

kitchenRouter.get('/pending', kitchenController.getPendingItems);
kitchenRouter.patch('/:id/status', kitchenController.updateItemStatus);
