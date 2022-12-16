import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  providers: [TokensService],
  exports: [TokensService],
  controllers: [TokensController]
})
export class TokensModule {}
