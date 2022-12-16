import { ApiProperty } from "@nestjs/swagger";
import { isString, IsString } from "class-validator";

export class UpdateUserDto{
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