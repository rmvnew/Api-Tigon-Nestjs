import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { CreateAddressDto } from "src/address/dto/create-address.dto"
import { Address } from "src/address/entities/address.entity"


export class CreateClientDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    register:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @ApiProperty()
    @IsOptional()
    address:CreateAddressDto

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string


}
