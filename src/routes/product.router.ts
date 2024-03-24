import express from 'express';
import ProductsController from '../controllers/products.controller';

const router = express.Router();

router.post('/', ProductsController.create);

router.put('/', ProductsController.update);

export default router;