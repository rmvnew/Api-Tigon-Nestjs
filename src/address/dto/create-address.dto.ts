import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Client } from "src/clients/entities/client.entity"


export class CreateAddressDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    zip_code: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    neighborhood: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    street: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    number: string

    @ApiProperty()
    @IsBoolean()
    isActive: boolean

    // @ApiProperty()
    // @IsOptional()
    // client:Client

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string
}
