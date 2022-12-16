import { Controller, Get, Post, UseGuards, Request, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { loginDto } from './DTO/login.dto';
import { TokensService } from './tokens/tokens.service';
import { User } from './users/users.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }
}
