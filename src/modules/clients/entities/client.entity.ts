import { Address } from "src/modules/address/entities/address.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('Clients')
export class Client {

    @PrimaryGeneratedColumn()
    id_client:number

    @Column()
    name:string

    @Column()
    register:string

    @Column()
    email:string

    @Column()
    phone:string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToOne(() => Address, address => address.client,{eager:true})
    @JoinColumn()
    address : Address
}
