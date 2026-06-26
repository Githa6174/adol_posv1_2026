import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { itemsRouter } from './routes/items.routes';
import { ordersRouter } from './routes/orders.routes';
import { tablesRouter } from './routes/tables.routes';
import { kitchenRouter } from './routes/kitchen.routes';
import { paymentsRouter } from './routes/payments.routes';
import { reportRouter } from './routes/reports';
import { expenseRouter } from './routes/expenses.routes';
import { usersRouter } from './routes/users.routes';
import { customersRouter } from './routes/customers.routes';
import { productsSettingsRouter } from './routes/productsSettings.routes';
import { printerRouter } from './routes/printers.routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/kitchen', kitchenRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/reports', reportRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/users', usersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/product-settings', productsSettingsRouter);
app.use('/api/printers', printerRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
