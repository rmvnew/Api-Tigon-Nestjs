import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class CreatePartsOrServiceDto {



    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_product:number
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    value:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number

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
