import { BadRequestException, Body, Controller, Post, UseGuards, Request, Get, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/DTO/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { loginDto } from 'src/DTO/login.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/users.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService, private tokensS: TokensService){}

    @ApiOperation({ summary: 'Signup a user' })
    @Post('/signup')
    @ApiCreatedResponse({
        description: 'Sign Up',

    })
    @ApiBadRequestResponse({
        description: 'User cannot register. Try again.'
    })

    async createUser(@Body() createUserDto: CreateUserDto) {
        const userExists = await this.usersService.findOne(createUserDto.email);
        if (userExists) {
            throw new BadRequestException('User already exists!')
        }
        const user = await this.usersService.create(createUserDto);
        return user;
    }
   
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() loginDto: loginDto) {
    //   const {user} = req;
    //   const refreshToken = await  this.authService.getRefreshToken(user.userId)
    //   await this.tokensS.setCurrentRefreshToken(refreshToken, user.id)
     // await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
      return this.authService.login(req.user);
    }
    // @UseGuards(LocalAuthGuard)
    // @Post('logout')
    // async logout(@Request() req){
    //     this.authService.logout(req.user)
    // }
  
   
    @ApiSecurity('JWT-auth')
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
