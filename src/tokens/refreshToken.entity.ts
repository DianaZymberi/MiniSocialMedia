import { Exclude } from "class-transformer";
import { User } from "src/users/users.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refresh_token: string;

    @OneToOne(() => User, (user) => user.refreshtoken)
    user: User;

    @Exclude()
    public currentHashedRefreshToken?: string;
}