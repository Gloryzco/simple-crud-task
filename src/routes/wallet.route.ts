import express from 'express';
import walletController from '../controllers/wallet.controller';

const router = express.Router();

router.post('/', walletController.create);
router.get('/:id/wallet', walletController.get);
router.put('/:id/charge', walletController.charge);
router.get('/:id/balance', walletController.getBalance);
router.put('/:id/fund', walletController.fund);
router.delete('/:id', walletController.remove);

export default router;
