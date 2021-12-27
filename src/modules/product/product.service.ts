import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Repository } from 'typeorm';
import { OrderService } from '../order/order.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProduct } from './dto/filter.product.paginate';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly prodRepository: Repository<Product>,
    private orderService: OrderService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {

    const { id_order } = createProductDto

    const product = this.prodRepository.create(createProductDto)
    const order = await this.orderService.findOne(id_order)
    if (!order) {
      throw new NotFoundException('Ordem não encontrada!!')
    }

    product.order = order

    return this.prodRepository.save(product)
  }

  async findAll(filter: FilterProduct): Promise<Pagination<Product>> {
    const { orderBy, sort } = filter
    const queryBuilder = this.prodRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.order', 'order')
      .leftJoinAndSelect('inf.pos','pos')


    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_order', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if(orderBy == SortingType.DATE){

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }else{

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)
      
    }

    return paginate<Product>(queryBuilder, filter)
  }

  async findOne(id: number) {
    return await this.prodRepository.findOne({ id_product: id })
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {

    const product = await this.findOne(id)

    if (!product) {
      throw new NotFoundException('Produto não encontrado!!')
    }

    const prod = await this.prodRepository.preload({
      id_product: id,
      ...updateProductDto
    })

    await this.prodRepository.save(prod)

    return await this.prodRepository.findOne(id)
  }

  async remove(id: number) {
    const product = await this.findOne(id)

    if (!product) {
      throw new NotFoundException('Produto não encontrado!!')
    }
    return await this.prodRepository.remove(product)
  }
}
