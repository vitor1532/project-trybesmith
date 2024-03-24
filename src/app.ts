import express from 'express';
import ProductsRouter from './routes/product.router';
import UsersRouter from './routes/user.router';
import LoginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/users', UsersRouter);
app.use('/login', LoginRouter);

export default app;
