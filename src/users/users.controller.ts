import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/DTO/createUser.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/DTO/updateUser.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    // @ApiOperation({ summary: 'Signup a user' })
    // @Post('/signup')
    // @ApiCreatedResponse({
    //     description: 'Sign Up',

    // })
    // @ApiBadRequestResponse({
    //     description: 'User cannot register. Try again.'
    // })

    // async createUser(@Body() createUserDto: CreateUserDto) {
    //     //const hashedPassword = await bcrypt.hash(password, 12);       
    //     const userExists = await this.usersService.findOne(createUserDto.email);
    //     if (userExists) {
    //         throw new BadRequestException('User already exists!')
    //         // return this.usersService.remove(createUserDto.email)
    //     }
    //     const user = await this.usersService.create(createUserDto);
    //     return user;
    // }

    @ApiSecurity('JWT-auth')
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Get('findUser')
    async findOne(@Req() req, @Query('email') email: string) {
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new BadRequestException('User not found.');
        }
        return user;
    }
    @ApiSecurity('JWT-auth')
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Patch('updateUser/:id')
    updateUser(@Param('id') id: number, email: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, email, body);
    }

    @ApiSecurity('JWT-auth')
    @ApiBearerAuth('jwt')
    @UseGuards(JwtAuthGuard)
    @Delete('/remove')
    removeUser(@Query('email') email: string) {
        return this.usersService.remove(email)
    }
}
