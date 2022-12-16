import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './likes.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Likes) private readonly likesRepository: Repository<Likes>
    ) {
    }

   async create(userId: number, postsId: number, ) {
    
        return this.likesRepository.save({ userId, postsId, })
        
    }

    async findOne(userId: number, postsId: number) {
        // if(!userId){
        //      throw new NotFoundException('nnn');
        //         }
        return this.likesRepository.findOne(
            { where: { userId, postsId } }
        );

    } 

    async remove( userId: number, postsId: number,) {
        const like = await this.findOne(userId, postsId  );
        if (!like) {
            throw new NotFoundException(' not found');
        }
        return this.likesRepository.remove(like);
    }

}
