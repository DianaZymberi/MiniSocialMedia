import { Max, Min } from "class-validator";
import { Posts } from "src/posts/posts.entity";
import { User } from "src/users/users.entity";
import { File } from "src/file/file.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "user_Id" })
    user: User;

    @Column({ name: "user_Id", nullable: true})
    userId: number;
   
    @ManyToOne(() => Posts, (posts) => posts.likes, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "posts_Id" })
    posts: Posts;

    @Column({ name: "posts_Id", nullable: true })
    postsId: number;
    
    @ManyToOne(() => File, (file) => file.like, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "file_id" })
    file: File;

    @Column({ name: "file_id", nullable: true })
    fileId: number;

    

}