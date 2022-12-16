import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostsDto } from 'src/DTO/createPosts.dto';
import { UpdatePostsDto } from 'src/DTO/updatePost.dto';
import { Repository } from 'typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private repo: Repository<Posts>) { }

    create(createPostsDto: CreatePostsDto): Promise<Posts> {

        const posts = this.repo.create(createPostsDto);

        return this.repo.save(posts)
    }

    async findOne(id: number) {
        if (!id) {
            throw new NotFoundException('Post not found')
        }
        return this.repo.findOne(
            { where: { id }, loadRelationIds: { relations: ['likes'] } }
        );

    }

    async findAll() {
        return this.repo.find({ relations: ['likes'] });
    }

    async update(id: number, attrs: Partial<Posts>) {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        Object.assign(post, attrs);
        return this.repo.save(post);
    }



    async remove(id: number) {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return this.repo.remove(post);
    }


}
