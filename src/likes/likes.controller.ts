import { BadRequestException, Body, Controller, Delete, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';

@ApiSecurity('JWT-auth')
@ApiBearerAuth('jwt')
@ApiTags('Likes')
@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) { }

    @Post('create')
    async create(@Query('userId') userId: number, @Query('postsId') postsId: number, id: number) {

        const unlike = await this.likesService.findOne(userId, postsId, )
        
        if(unlike){
            return this.likesService.remove(userId, postsId, )
        }
        return this.likesService.create(userId, postsId, )

       
    }
    
}
