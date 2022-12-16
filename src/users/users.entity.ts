import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "src/comments/comments.entity";
import { File } from "src/file/file.entity";
import { Likes } from "src/likes/likes.entity";
import { Posts } from "src/posts/posts.entity";
import { RefreshToken } from "src/tokens/refreshToken.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    email: string;

    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @OneToMany(() => Posts, (posts) => posts.user)
    posts: Posts

    @OneToMany(() => Comments, (comments) => comments.user )
    comments: Comments;

    @OneToMany(() => Likes, (likes) => likes.user)
    likes: Likes;
  
    @OneToMany(() => File, (file) => file.user)
    file: File

    @OneToOne(() => RefreshToken, (refreshtoken) => refreshtoken.user)
    refreshtoken: RefreshToken;

}