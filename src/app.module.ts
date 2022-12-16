import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.entity';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/comments.entity';
import { LikesModule } from './likes/likes.module';
import { FileModule } from './file/file.module';
import { File } from './file/file.entity';
import { Likes } from './likes/likes.entity';
import { RefreshToken } from './tokens/refreshToken.entity';
import { TokensModule } from './tokens/tokens.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: '',
    database: 'task_1',
    entities: [User, Posts, Comments, File, Likes, RefreshToken],
    synchronize: true,
    autoLoadEntities: true
  }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FileModule,
    TokensModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
