import { Module } from '@nestjs/common';
import { PartsOrServiceService } from './parts-or-service.service';
import { PartsOrServiceController } from './parts-or-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsOrService } from './entities/parts-or-service.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([PartsOrService]),
    ProductModule
  ],
  controllers: [PartsOrServiceController],
  providers: [PartsOrServiceService]
})
export class PartsOrServiceModule {}
