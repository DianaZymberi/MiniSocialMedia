import { use } from "passport";
import { Likes } from "src/likes/likes.entity";
import { Posts } from "src/posts/posts.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalname: string;

    @Column()
    mimetype: string;

    @Column()
    destination: string;
    
    @Column()
    filename: string;

    @Column()
    path: string;
    
    @ManyToOne(() => User, (user) => user.file, {onDelete: 'SET NULL', onUpdate: 'SET NULL'})
    @JoinColumn({ name: "user_Id" })
    user: User;

    @Column({ name: "user_Id", nullable: true})
    userId: number;
    
    @OneToMany(() => Likes, (like) => like.file)
    like: Likes[];
}