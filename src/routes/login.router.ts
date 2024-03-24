import express from 'express';
import LoginController from '../controllers/login.controller';
import verifyLoginFields from '../middlewares/verifyLoginFields.middleware';

const router = express.Router();

router.post('/', verifyLoginFields, LoginController.login);

export default router;