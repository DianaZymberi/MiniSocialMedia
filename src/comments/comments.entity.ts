import { Posts } from "src/posts/posts.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(() => User, (user) => user.comments, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "user_Id" })
    user: User;

    @Column({ name: "user_Id", nullable: true })
    userId: number

    @ManyToOne(() => Posts, (posts) => posts.comments, {onDelete: 'SET NULL'})
    @JoinColumn({ name: "posts_Id" })
    posts: Posts;

    @Column({ name: "posts_Id", nullable: true })
    postsId: number;
}