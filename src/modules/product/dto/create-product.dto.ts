import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    brand: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    model: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_order: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    serial: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    defect: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    note: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    condition: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @IsOptional()
    @IsString()
    createAt: string

    @IsOptional()
    @IsString()
    updateAt: string


}
