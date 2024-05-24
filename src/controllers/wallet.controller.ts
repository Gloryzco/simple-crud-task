import { NextFunction, Request, Response } from 'express';
import { ResponseFormat } from '../shared/utils/responseHandler';
import catchAsync from '../shared/utils/catchAsync';
import walletService from '../services/wallet.service';
import {
  ChargeWalletDTO,
  CreateWalletDTO,
  FundWalletDTO,
} from '../dtos/wallet.dto';

const get = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
    userId: string,
  ): Promise<Response | any> => {
    const { id } = req.params;
    const data = await walletService.getByUserId(+id);
    ResponseFormat.successResponse(res, 'successful', data);
  },
);

const create = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { user_id } = req.body;
    const data = await walletService.createWallet(user_id);
    ResponseFormat.successResponse(
      res,
      'Wallet created successfully',
      data,
      201,
    );
  },
);

const charge = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { amount, user_id } = req.body;
    const { id } = req.params;
    const data = await walletService.chargeWallet(
      parseInt(id),
      amount,
      user_id,
    );
    ResponseFormat.successResponse(
      res,
      'wallet charged successfully',
      data,
      200,
    );
  },
);

const getBalance = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { user_id } = req.body;
    const { id } = req.params;
    const data = await walletService.getBalance(
      parseInt(id),
      user_id,
    );
    ResponseFormat.successResponse(
      res,
      'Balance fetched successfully',
      data,
      200,
    );
  },
);

const fund = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { amount, user_id } = req.body;
    const { id } = req.params;
    const data = await walletService.fundWallet(
      parseInt(id),
      amount,
      user_id,
    );
    ResponseFormat.successResponse(
      res,
      'wallet funded successfully',
      data,
      200,
    );
  },
);

const remove = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { user_id } = req.body;
    const { id } = req.params;
    const data = await walletService.deleteWallet(parseInt(id), user_id);
    ResponseFormat.successResponse(
      res,
      'wallet deleted successfully',
      data,
      200,
    );
  },
);

const walletController = {
  get,
  create,
  charge,
  fund,
  remove,
  getBalance,
};

export default walletController;

