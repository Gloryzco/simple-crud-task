import { Response } from "express";

export class ResponseFormat {
    static successResponse<T>(res: Response, message: string, data: T, statusCode: number = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        })
    }

    static sendResponse<T>(res: Response, message: string, statusCode: number = 200) {
        return res.status(statusCode).json({
            success: true,
            message
        })
    }

    static failureResponse<T>(res: Response, message: string, error: T, statusCode: number = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        })
    }
}
