import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);

router.get('/dashboard', reportController.getDashboardSummary);

export const reportRouter = router;
