import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { CreatePartsOrServiceDto } from './dto/create-parts-or-service.dto';
import { FilterPOS } from './dto/filterPOS.paginate';
import { UpdatePartsOrServiceDto } from './dto/update-parts-or-service.dto';
import { PartsOrService } from './entities/parts-or-service.entity';

@Injectable()
export class PartsOrServiceService {

  constructor(
    @InjectRepository(PartsOrService)
    private readonly posRepository: Repository<PartsOrService>,
    private prodService:ProductService
  ) { }



  async create(createPartsOrServiceDto: CreatePartsOrServiceDto) {

    const { id_product } = createPartsOrServiceDto

    const pos = this.posRepository.create(createPartsOrServiceDto)

    const product = await this.prodService.findOne(id_product)

    if(!product){
      throw new NotFoundException('Produto não encontrado')
    }

    pos.product = product

    return this.posRepository.save(pos)
  }

  async findAll(filter: FilterPOS): Promise<Pagination<PartsOrService>> {
    const { orderBy, sort } = filter
    const queryBuilder = this.posRepository.createQueryBuilder('inf')
      .leftJoinAndSelect('inf.product', 'product')


    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_order', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<PartsOrService>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<PartsOrService> {
    return await this.posRepository.findOne({ id_parts_or_service: id })
  }

  async update(id: number, updatePartsOrServiceDto: UpdatePartsOrServiceDto): Promise<PartsOrService> {

    const isRegistered = await this.posRepository.findOne(id)

    if (!isRegistered) {
      throw new NotFoundException('Nenhum registro para peças ou serviços encontrados!!')
    }

    const pos = await this.posRepository.preload({
      id_parts_or_service: id,
      ...updatePartsOrServiceDto
    })

    await this.posRepository.save(pos)

    return await this.posRepository.findOne(id)
  }

  async remove(id: number) {

    const pos = await this.posRepository.findOne(id)

    if (!pos) {
      throw new NotFoundException('Nenhum registro para peças ou serviços encontrados!!')
    }

    this.posRepository.remove(pos)

  }
}
