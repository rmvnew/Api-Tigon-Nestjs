import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FilterClientPaginate } from './dto/filter.client.paginate';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly addressService:AddressService,
      
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {

    const client = this.clientRepository.create(createClientDto)
    client.name = Utils.getInstance().getValidName(client.name)
    const isRegistered = await this.getByName(client.name)

    // console.log(await this.addressService.create(client.address))
    client.address = await this.addressService.create(client.address)
          

    if (isRegistered) {
      throw new BadRequestException('O cliente já esta registrado!!')
    }

       
    return this.clientRepository.save(client)
    

  }

  async getByName(name: string): Promise<Client> {
    return await this.clientRepository.findOne({ name: name })
  }

  async findAll(filter: FilterClientPaginate): Promise<Pagination<Client>> {
    const { name, orderBy, sort } = filter
    const queryBuilder = this.clientRepository.createQueryBuilder('inf')
    .leftJoinAndSelect('inf.address','adress')
    
    
    if (name) {
      return paginate<Client>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_client', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Client>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Client> {
    return await this.clientRepository.findOne({ id_client: id })
  }

  async update(id: number, updateClientDto: UpdateClientDto) {

    const client = await this.clientRepository.preload({
      id_client: id,
      ...updateClientDto
    })

    client.name = Utils.getInstance().getValidName(client.name)

    if (!client) {
      throw new NotFoundException('Client não encontrado!!')
    }

    this.clientRepository.save(client)

    return await this.findOne(id)
  }

  async remove(id: number) {

    const client = await this.findOne(id)

    if (!client) {
      throw new NotFoundException('Cliente não foi encontrado!!')
    }

    return this.clientRepository.remove(client)
  }
}
