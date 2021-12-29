import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FilterUserPaginate } from './dto/filter.user.paginate';
import { SortingType } from 'src/helper/Enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from 'src/helper/Utils';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async create(createUserDto: CreateUserDto) {

    const { profile } = createUserDto
    const user = this.userRepository.create(createUserDto)
    user.name = Utils.getInstance().getValidName(user.name)

    if (profile === 'Admin') {
      user.profile = 'Admin'
    } else {
      user.profile = 'Atendente'
    }

    const isRegistered = await this.getByName(user.name)

    if (isRegistered) {
      throw new BadRequestException('Usuário já cadastrado!!')
    }

    user.password = await Utils.getInstance().encryptPassword(user.password)

    return this.userRepository.save(user)
  }


  async getByName(name: string): Promise<User> {
    return this.userRepository.findOne({ name: name })
  }

  async findAll(options: FilterUserPaginate): Promise<Pagination<User>> {
    const { name, orderBy, sort } = options
    const queryBuilder = this.userRepository.createQueryBuilder('inf')

    if (name) {
      return paginate<User>(
        queryBuilder.where('inf.name like :name', { name: `%${name.toUpperCase()}%` }), options
      )
    }

    if (orderBy == SortingType.ID) {

      queryBuilder.orderBy('inf.iduser', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else if (orderBy == SortingType.DATE) {

      queryBuilder.orderBy('inf.createAt', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    } else {

      queryBuilder.orderBy('inf.name', `${sort === 'DESC' ? 'DESC' : 'ASC'}`)

    }

    return paginate<User>(queryBuilder, options)
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ idUser: id })
  }

  async findByEmail(email: string){
    return await this.userRepository.findOne({email:email})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      idUser: id,
      ...updateUserDto
    })

    user.name = Utils.getInstance().getValidName(user.name)

    await this.userRepository.save(user)

    return this.findOne(id)
  }

  async remove(id: number) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException('Usuário não existe!!')
    }

    return this.userRepository.remove(user)
  }
}
