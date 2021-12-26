import { Product } from "src/modules/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('parts_or_service')
export class PartsOrService {


    @PrimaryGeneratedColumn()
    id_parts_or_service:number

    @Column()
    name:string

    @Column('decimal', { precision: 7, scale: 2 })
    value:number

    @Column()
    quantity:number

    @Column()
    isActive: boolean

    @CreateDateColumn()
    createAt: string

    @UpdateDateColumn()
    updateAt: string

    @ManyToOne(() => Product, product => product.pos)
    product:Product

}
