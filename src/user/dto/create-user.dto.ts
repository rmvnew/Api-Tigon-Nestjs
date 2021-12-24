import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { UserProfile } from "src/helper/Enums"



export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(5)
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    profile: string

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
