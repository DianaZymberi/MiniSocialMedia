import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.startegy';
import { LocalStrategy } from './local.startegy';
import { AuthController } from './auth.controller';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [UsersModule, PassportModule, TokensModule,
    JwtModule.register({
      secret: 'secretOrKey',
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
