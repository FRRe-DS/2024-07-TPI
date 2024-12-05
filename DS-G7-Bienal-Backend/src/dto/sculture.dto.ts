import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

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

export class EditScultureDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : value))
    eventId:number

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    scultorId: number;

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    qr: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    images: Express.Multer.File[];
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

