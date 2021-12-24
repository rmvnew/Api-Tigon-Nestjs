import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsOptional, IsString } from "class-validator"

export class FilterUserPaginate {


    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 1 })
    page: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 10 })
    limit: number

    @IsOptional()
    @IsString()
    @ApiProperty({ required: true, default: 'DESC', enum: ['ASC', 'DESC'] })
    sort: string

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    name: string

    @IsOptional()
    @ApiProperty({ required: true, default: 'NAME', enum: ['ID', 'NAME', 'DATE'] })
    orderBy: string


}