import { Router } from 'express';
import { printerController } from '../controllers/printerController';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', printerController.getPrinters);
router.post('/', printerController.createPrinter);
router.put('/:id', printerController.updatePrinter);
router.delete('/:id', printerController.deletePrinter);
router.post('/:id/test', printerController.testPrinter);

export const printerRouter = router;
