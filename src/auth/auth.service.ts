import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService, private tokenService: TokensService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }  
        throw new NotFoundException('Email or password is incorrect');
    }
    
    async getRefreshToken(userId: number){
        const payload = { user: userId}

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn:  '1d' //`${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        })
        return token;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            user,
            access_token: this.jwtService.sign(payload),       
                
           
        }
    }
   
}