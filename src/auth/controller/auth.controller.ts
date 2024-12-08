import { Body, Controller, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IUserJwtPayload } from "../types/auth.types";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    @Post("/login")
    async login(
        @Body() loginDto: LoginDto
    ) {
        const password = this.configService.get<string>("password");
        const username = this.configService.get<string>("username");
        if(loginDto.username !== username)
            throw new UnauthorizedException("username is not correct")
        if(loginDto.password !== password)
            throw new UnauthorizedException("password is not correct")
        
        const payload = {
            password,
            username
        }
        const jwt = await this.generateJwtToken(payload);

        return {
            status: HttpStatus.OK,
            jwt
        }
    }

    async generateJwtToken(payload: IUserJwtPayload) {
        // generate jwt token
        return await this.jwtService.signAsync( payload, {secret: this.configService.get<string>("JWT_SECRET_KEY"), expiresIn: "12h" })
    }
}