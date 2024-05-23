import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) =>{
  throw new AppError(`Sorry, the resource does not exist`, 404);
}

export default notFoundRoute;
