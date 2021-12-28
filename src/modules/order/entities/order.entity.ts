import { Client } from "src/modules/clients/entities/client.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('order_of_service')
export class Order {

    @PrimaryGeneratedColumn()
    id_order:number

    @Column()
    number_os:string

    @Column('decimal', { precision: 7, scale: 2 })
    value:number

    @Column()
    isActive: boolean

    @Column({nullable:true})
    initialDate:Date

    @Column({nullable:true})
    finalDate:Date

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => User, user => user.order)
    user:User
    
    @ManyToOne(() => Client, client => client.order)
    client:Client

    @OneToMany(() => Product, product => product.order)
    product:Product

}
