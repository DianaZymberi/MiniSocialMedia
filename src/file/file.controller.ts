import { Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { buffer, Observable, of } from 'rxjs';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';
import path, { extname, join } from 'path';
import { createReadStream } from 'fs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { stringify } from 'querystring';
import { IsBase64 } from 'class-validator';


export const storage = { storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
        const filename: string = uuidv4();
        cb(null, `${filename}${extname(file.originalname)}`)
    }
})}

@ApiSecurity('JWT-auth')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@ApiTags('Files')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService){}
    
    @Post('upload/:userId')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
              comment: { type: 'string' },
              outletId: { type: 'integer' },
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
    })
    @UseInterceptors(FileInterceptor('file', storage))
    async uploadFile(@UploadedFile() file, @Param('userId') userId: number){ 
        console.log(file);    
        return this.fileService.dbsave(file, userId);
                
    }

    
    @Get('findAll')
    async findAll() {
        const post = await this.fileService.findAll();
        return post;
    }

   
}
