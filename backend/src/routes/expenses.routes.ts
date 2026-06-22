import { Router } from 'express';
import { expenseController } from '../controllers/expenseController';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);
// Admin only, optional, adjust later if other roles need access
router.use(requireAdmin);

router.get('/', expenseController.getExpenses);
router.post('/', expenseController.createExpense);
router.delete('/:id', expenseController.deleteExpense);

router.get('/categories', expenseController.getCategories);
router.post('/categories', expenseController.createCategory);

export const expenseRouter = router;
