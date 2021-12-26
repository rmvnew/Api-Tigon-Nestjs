import { Order } from "src/modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id_product: number

    @Column()
    brand: string

    @Column()
    model: string

    @Column()
    serial: string

    @Column()
    defect: string

    @Column()
    note: string

    @Column()
    condition: string

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => Order, order => order.product)
    order:Order

}
