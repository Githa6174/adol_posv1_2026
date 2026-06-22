import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { requireAuth } from '../middleware/auth.middleware';

export const ordersRouter = Router();
const orderController = new OrderController();

ordersRouter.use(requireAuth);

ordersRouter.get('/', orderController.getOrders);
ordersRouter.post('/', orderController.createOrder);
ordersRouter.put('/:id/discount', orderController.applyDiscount);
ordersRouter.post('/:id/items', orderController.addItems);
ordersRouter.put('/:id/items/:itemId/discount', orderController.updateItemDiscount);
ordersRouter.delete('/:id', orderController.deleteOrder);
ordersRouter.patch('/:id/customer', orderController.assignCustomer);
