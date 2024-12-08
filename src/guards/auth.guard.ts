// nestjs
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// jwt
import { JwtService } from "@nestjs/jwt";
// types & interfaces
import { IUserJwtPayload } from "src/auth/types/auth.types";
import { IUserRequest } from "src/interface/req.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {};

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // get request
        const req: IUserRequest = context.switchToHttp().getRequest();
        // get authorization header
        const { authorization } = req.headers;
        if(!authorization || !authorization.trim())
            throw new BadRequestException("Please login to your account!");
        // pick up token
        const [, token] = authorization.split(" ")
        if(!token)
            throw new BadRequestException("Please login to your account!");
        // verify token
        let user: IUserJwtPayload
        try {
            user = await this.verfiyToken(token);
        } catch (error) {
            console.log(error);
            throw new BadRequestException("token expired!");
        }
        // save user data
        req.user = user;
        // success
        return true;
    };

    async verfiyToken(token: string): Promise<IUserJwtPayload> {
        const payload: IUserJwtPayload = await this.jwtService.verify(token, { secret: this.configService.get<string>("JWT_SECRET_KEY") });
        if(!payload)
            throw new BadRequestException("token is not valid");
        return payload;
    }   
}