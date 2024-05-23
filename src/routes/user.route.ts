import express from 'express';
import userController from '../controllers/user.controller';
import { validateData } from '../shared/middlewares/validation.middleware';
import { CreateDto } from '../dtos/user.dto';
import walletRouter from './wallet.route';

const router = express.Router({ mergeParams: true });

router.post('/', validateData(CreateDto), userController.create);

router.use('/', walletRouter);
export default router;
