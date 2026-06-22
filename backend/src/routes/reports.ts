import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);
router.use(requireAdmin);

router.get('/dashboard', reportController.getDashboardSummary);

export const reportRouter = router;
