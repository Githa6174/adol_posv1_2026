import { Router } from 'express';
import { userController } from '../controllers/userController';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// All user routes require admin role
router.use(requireAuth);
router.use(requireAdmin);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.put('/:id/reset-password', userController.resetPassword);
router.delete('/:id', userController.deleteUser);

export const usersRouter = router;
