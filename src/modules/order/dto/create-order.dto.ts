import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateOrderDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    number_os: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    value: number

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_client: number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_user: number

    @ApiProperty()
    @IsOptional()
    initialDate: string

    @ApiProperty()
    @IsOptional()
    finalDate: string

    @ApiProperty()
    @IsOptional()
    createAt: string

    @ApiProperty()
    @IsOptional()
    updateAt: string

}
