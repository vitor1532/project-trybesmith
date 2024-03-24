import express from 'express';
import ProductsController from '../controllers/products.controller';

const router = express.Router();

router.put('/', ProductsController.update);

export default router;