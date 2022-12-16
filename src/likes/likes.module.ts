import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
