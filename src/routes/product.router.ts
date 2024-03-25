import express from 'express';
import ProductsController from '../controllers/products.controller';
import verifyCreateProductFields from '../middlewares/verifyCreateProductFields.middleware';
import verifyUpdateFieldsMiddleware from '../middlewares/verifyUpdateProductFields.middleware';

const router = express.Router();

router.get('/', ProductsController.getAll);

router.post('/', verifyCreateProductFields, ProductsController.create);

router.put('/', verifyUpdateFieldsMiddleware, ProductsController.update);

export default router;