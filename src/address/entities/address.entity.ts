import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Client } from "../../clients/entities/client.entity";



@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
    id_address: number

    @Column()
    zip_code: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    neighborhood: string

    @Column()
    street: string

    @Column()
    number: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @OneToOne(() => Client, client => client.address)
    client: Client


}
