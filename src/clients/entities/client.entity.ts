import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


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
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string
}
