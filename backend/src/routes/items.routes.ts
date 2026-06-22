import { Router } from 'express';
import { ItemController } from '../controllers/itemController';
import { requireAuth } from '../middleware/auth.middleware';

export const itemsRouter = Router();
const itemController = new ItemController();

itemsRouter.use(requireAuth); // Protect all item routes

itemsRouter.get('/categories', itemController.getCategories);
itemsRouter.post('/categories', itemController.createCategory);
itemsRouter.put('/categories/:id', itemController.updateCategory);
itemsRouter.delete('/categories/:id', itemController.deleteCategory);

itemsRouter.get('/departments', itemController.getDepartments);
itemsRouter.post('/departments', itemController.createDepartment);

itemsRouter.get('/', itemController.getItems);
itemsRouter.get('/:id', itemController.getItemById);
itemsRouter.post('/', itemController.createItem);
itemsRouter.put('/:id', itemController.updateItem);
itemsRouter.delete('/:id', itemController.deleteItem);
