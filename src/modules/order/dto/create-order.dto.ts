import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateOrderDto {

    // @ApiProperty()
    @IsOptional()
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

    @IsString()
    @IsOptional()
    createAt: string

    @IsString()
    @IsOptional()
    updateAt: string

}
