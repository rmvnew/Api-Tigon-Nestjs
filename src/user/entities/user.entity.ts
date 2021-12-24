import { UserProfile } from "src/helper/Enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    idUser: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    profile: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

}
