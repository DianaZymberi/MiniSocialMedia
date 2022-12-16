import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentsDto } from 'src/DTO/createComments.dto';
import { UpdateCommentDto } from 'src/DTO/updateComment.dto';
import { Posts } from 'src/posts/posts.entity';
import { CommentsService } from './comments.service';

@ApiSecurity('JWT-auth')
@ApiBearerAuth('jwt')
@ApiTags('Comments')
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService){}

    @Post('/create')
    async create(@Body() createCommentsDto: CreateCommentsDto){
        // const user = await this.commentsService.findOne(createCommentsDto.userId)
        // if(!user){
        //     throw new NotFoundException('User not found')
        // }
        // const post = await this.commentsService.findOne(createCommentsDto.postsId)
        // if(!post){
        //     throw new NotFoundException('Post not found')
        // }
        return this.commentsService.create(createCommentsDto)
    }

    @Get('findComment/:id')
    async findComment(@Param('id') id: number){
        const comment = await this.commentsService.findOne(id);
        if(!comment){
            throw new NotFoundException(' Comment not found');
        }
        return comment;
    }

    @Patch('updateComment/:id')
    async update(@Param('id') id: number, @Body() updateComment: UpdateCommentDto){
        return await this.commentsService.update(id, updateComment);
    }
   
    @Delete('deleteComment/:id')
    async removeComment(@Param('id') id: number){
        return await this.commentsService.remove(id);
    }
    


}
