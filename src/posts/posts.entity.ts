import { Comments } from "src/comments/comments.entity";
import { File } from "src/file/file.entity";
import { Likes } from "src/likes/likes.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(() => User, (user) => user.posts, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "user_Id" })
    user: User;

    @Column({ name: "user_Id", nullable: true})
    userId: number;

    @OneToMany(() => Comments, (comments) => comments.posts)
    comments: Comments;

    // @OneToMany(() => File, (file) => file.posts)
    // file: File

    @OneToMany(() => Likes, (likes) => likes.posts)
    likes: Likes[];

}