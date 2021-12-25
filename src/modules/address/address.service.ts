import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { SortingType } from 'src/helper/Enums';
import { Utils } from 'src/helper/Utils';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { FilterAddress } from './dto/filter.address';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>
  ) { }

  async create(createAddressDto: CreateAddressDto) {

    const address = this.addressRepository.create(createAddressDto)
    address.city = Utils.getInstance().getValidName(address.city)
    address.neighborhood = Utils.getInstance().getValidName(address.neighborhood)
    address.street = Utils.getInstance().getValidName(address.street)

    return this.addressRepository.save(address)
  }

  async findAll(filter: FilterAddress): Promise<Pagination<Address>> {
    const { city, orderBy, sort } = filter
    const queryBuilder = this.addressRepository.createQueryBuilder('inf')

    if (city) {
      return paginate<Address>(
        queryBuilder.where('inf.city like :city', { city: `%${city.toUpperCase()}%` }), filter
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.id_address', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.city', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<Address>(queryBuilder, filter)
  }

  async findOne(id: number): Promise<Address> {
    return await this.addressRepository.findOne({ id_address: id })
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {

    const address = await this.addressRepository.preload({
      id_address: id,
      ...updateAddressDto
    })

    if (!address) {
      throw new NotFoundException('Endereço não encontrado!!')
    }

    this.addressRepository.save(address)

    return await this.findOne(id)
  }

  async remove(id: number) {

    const address = await this.findOne(id)

    if (!address) {
      throw new NotFoundException('Endereço não foi encontrado!!')
    }

    return this.addressRepository.remove(address)
  }
}
