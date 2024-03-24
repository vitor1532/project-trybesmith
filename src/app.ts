import express from 'express';
import ProductsRouter from './routes/product.router';
import UsersRouter from './routes/user.router';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/users', UsersRouter);

export default app;
