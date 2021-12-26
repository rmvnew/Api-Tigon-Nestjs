import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PartsOrServiceService } from './parts-or-service.service';
import { CreatePartsOrServiceDto } from './dto/create-parts-or-service.dto';
import { UpdatePartsOrServiceDto } from './dto/update-parts-or-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterPOS } from './dto/filterPOS.paginate';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PartsOrService } from './entities/parts-or-service.entity';

@ApiTags('PartsOrService')
@Controller('parts-or-service')
export class PartsOrServiceController {
  constructor(private readonly partsOrServiceService: PartsOrServiceService) { }

  @Post()
  async create(@Body() createPartsOrServiceDto: CreatePartsOrServiceDto) {
    return this.partsOrServiceService.create(createPartsOrServiceDto);
  }

  @Get()
  async findAll(
    @Query() filter: FilterPOS
  ): Promise<Pagination<PartsOrService>> {
    const { limit } = filter

    filter.limit = limit > 10 ? 10 : limit;

    return this.partsOrServiceService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.partsOrServiceService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePartsOrServiceDto: UpdatePartsOrServiceDto) {
    return this.partsOrServiceService.update(+id, updatePartsOrServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.partsOrServiceService.remove(+id);
  }
}
