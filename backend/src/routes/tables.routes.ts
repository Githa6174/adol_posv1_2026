import { Router } from 'express';
import { TableController } from '../controllers/tableController';
import { requireAuth } from '../middleware/auth.middleware';

export const tablesRouter = Router();
const tableController = new TableController();

tablesRouter.use(requireAuth);

tablesRouter.get('/zones', tableController.getZones);
tablesRouter.post('/zones', tableController.createZone);
tablesRouter.get('/', tableController.getTables);
tablesRouter.post('/', tableController.createTable);
tablesRouter.patch('/:id/status', tableController.updateTableStatus);
tablesRouter.put('/:id', tableController.updateTable);
tablesRouter.delete('/:id', tableController.deleteTable);
