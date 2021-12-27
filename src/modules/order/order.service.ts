import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrder } from './dto/filter.order.paginate';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private clientService: ClientsService,
    private userService: UserService
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    const { id_client, id_user } = createOrderDto
    const order = this.orderRepository.create(createOrderDto)

    const query = await this.orderRepository.createQueryBuilder('inf')
      .select('MAX(inf.number_os)', 'number_os')
      .getRawMany()
      
      console.log(query)
    const [{number_os:number}] = query  
      
    order.number_os = `${+number+1}` 

    const isRegistered = await this.getOrderByNumber(order.number_os)
    if (isRegistered) {
      throw new BadRequestException('Ordem já cadastrada!!')
    }

    const client = await this.clientService.findOne(id_client)
    const user = await this.userService.findOne(id_user)
    order.client = client
    order.user = user

    console.log(order)

    return this.orderRepository.save(order)
  }

  async getOrderByNumber(number: string): Promise<Order> {
    return this.orderRepository.findOne({ number_os: number })
  }

  async findAll(filter: FilterOrder): Promise<Pagination<Order>> {
    const { orderBy, sort } = filter
    const queryBuilder = this.orderRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.user', 'user')
      .leftJoinAndSelect('inf.client', 'client')
      .leftJoinAndSelect('inf.product', 'product')

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_order', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Order>(queryBuilder, filter)
  }

  async findOne(id: number) {
    return this.orderRepository.findOne({ id_order: id })
  }

  async findClientByName(name: string): Promise<Client> {
    return await this.clientService.getByName(name)
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {

    const order = await this.orderRepository.preload({
      id_order: id,
      ...updateOrderDto
    })

    return this.orderRepository.save(order)
  }


}
