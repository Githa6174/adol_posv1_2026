import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';
import { requireAuth } from '../middleware/auth.middleware';

export const paymentsRouter = Router();
const paymentController = new PaymentController();

paymentsRouter.use(requireAuth);

paymentsRouter.get('/methods', paymentController.getPaymentMethods);
paymentsRouter.get('/table/:tableId/order', paymentController.getOrderByTable);
paymentsRouter.post('/order/:orderId', paymentController.processPayment);
