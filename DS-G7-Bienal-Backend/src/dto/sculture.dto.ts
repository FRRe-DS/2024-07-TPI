import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScultureDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    eventId:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    scultorId: number;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    qr: string;

}

export class CreateScultureRequestDto {
    
    @IsNotEmpty()
    @ApiProperty()
    eventId:number
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name:string
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    description:string
    
    @IsOptional()
    @IsArray()
    @ApiProperty()
    images: Express.Multer.File[]
}

