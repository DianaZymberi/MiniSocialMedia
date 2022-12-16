import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePostsDto } from 'src/DTO/createPosts.dto';
import { UpdatePostsDto } from 'src/DTO/updatePost.dto';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { Observable, of } from 'rxjs';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@ApiSecurity('JWT-auth')
@ApiBearerAuth('jwt')
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }

    @ApiBearerAuth('jwt')
    @ApiSecurity('JWT-auth')
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createPostsDto: CreatePostsDto) {
        // const user = await this.postsService.findOne(createPostsDto.userId)
        // // console.log(user);
        
        // if(!user){
        //     throw new NotFoundException('User with this id doesn\'t exist, write a valid userId')
        // }
        const post = this.postsService.create(createPostsDto)
        return post;
    }

    @Get('findPost/:id')
    async findPost(@Param('id') id: number) {
        const posts = await this.postsService.findOne(id);
        if (!posts) {
            throw new NotFoundException(' Post not found');
        }

        posts.likes = (posts?.likes?.length > 0 ? true : false) as any
        return posts;
    }

    @Get('findAll')
    async findAll() {
        const post = await this.postsService.findAll();
       
        return post;
    }
    @Patch('update/:id')
    async update(@Param('id') id: number, @Body() updatePost: UpdatePostsDto){
        return await this.postsService.update(id, updatePost);
    }

    @Delete('delete/:id')
    removePost(@Param('id') id: number) {
        return this.postsService.remove(id)
    }

  

  
  
}
