import express from 'express';
import ProductsController from '../controllers/products.controller';
import verifyCreateProductFields from '../middlewares/verifyCreateProductFields.middleware';

const router = express.Router();

router.get('/', ProductsController.getAll);

router.post('/', verifyCreateProductFields, ProductsController.create);

router.put('/', ProductsController.update);

export default router;