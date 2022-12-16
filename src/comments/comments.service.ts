import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentsDto } from 'src/DTO/createComments.dto';
import { UpdateCommentDto } from 'src/DTO/updateComment.dto';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comments) private repo: Repository<Comments>) { }

    async create(createCommentsDto: CreateCommentsDto){
        const comment = await this.repo.create(createCommentsDto)
        return this.repo.save(comment)
    }

    async findOne(id: number){
        if(!id){
            throw new NotFoundException('comment not found')
        }
        return this.repo.findOne(
            { where: { id } }
        );

    }

    async update(id: number, attrs: Partial<Comments>){
        const comment = await this.findOne(id);
        if(!comment){
            throw new NotFoundException('comment like this doesnt exist');
        }
        Object.assign(comment, attrs);
        return this.repo.save(comment);
    }

    async remove(id: number){
        const comment = await this.findOne(id);
        if(!comment){
            throw new NotFoundException("Comment not found")
        }
        return this.repo.remove(comment)
    }
}
