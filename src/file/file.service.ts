import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private repo: Repository<File>) { }

    async dbsave(file: Express.Multer.File, userId: number){
        return this.repo.save({ ...file, userId })
    }

    async findOne(filename: string){
        if(!filename){
            throw new NotFoundException('file not found')
        }
        return this.findOne(filename)
    }

    async findAll() {
        return this.repo.find();
    }
}
