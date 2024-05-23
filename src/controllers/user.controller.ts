import { NextFunction, Request, Response } from 'express';
import { ResponseFormat } from '../shared/utils/responseHandler';
import catchAsync from '../shared/utils/catchAsync';
import userService from '../services/user.service';

const create = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | any> => {
    const { username, email } = req.body;
    const data = await userService.createUser(username, email);
    ResponseFormat.successResponse(res, 'User created successfully', data, 201);
  },
);

const userController = {
  create,
};

export default userController;
