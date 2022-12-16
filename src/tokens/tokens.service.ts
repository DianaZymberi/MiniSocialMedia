import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refreshToken.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt' 

@Injectable()
export class TokensService {

    constructor(
        @InjectRepository(RefreshToken) private tokenRepository: Repository<RefreshToken>
    ){}

    async setCurrentRefreshToken(refresh_token: string, userId: number){
        const currentHashedRefreshToken = await bcrypt.hash(refresh_token, 10);
        // await this.tokenRepository.update(userId,{
        //   currentHashedRefreshToken
        // });
    }
    
}
