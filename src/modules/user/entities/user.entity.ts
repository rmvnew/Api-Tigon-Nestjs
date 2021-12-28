import { UserProfile } from "src/helper/Enums";
import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    idUser: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({select:false})
    password: string

    @Column()
    profile: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToMany(() => Order, order => order.user)
    order:Order[]

}
