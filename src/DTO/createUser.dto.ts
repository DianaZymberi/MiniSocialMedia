import { ApiProperty } from "@nestjs/swagger";
import { isString, IsString } from "class-validator";

export class CreateUserDto{
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsString()
    password: string;

}