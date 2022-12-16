import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/DTO/createUser.dto';
import { UpdateUserDto } from 'src/DTO/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    findOne(email: string) {
        if (!email) {
            throw null;
        }
        return this.userRepository.findOne(
            { where: { email } }
        );
    }

    findOnee(id: number) {
        if (!id) {
            return null;
        }
        return this.userRepository.findOne(
            { where: { id } }
        );
    }

    async update(id: number, email: string, attrs: Partial<User> ){
        const user = await this.findOnee(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async remove(email: string) {
        const user = await this.findOne(email)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.userRepository.remove(user);
    }
}

