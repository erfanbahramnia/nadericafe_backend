import { Request } from "express";
import { IUserJwtPayload } from "src/auth/types/auth.types";

export interface IUserRequest extends Request {
    user: IUserJwtPayload
}