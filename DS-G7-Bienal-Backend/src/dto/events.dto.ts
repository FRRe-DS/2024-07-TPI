import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { TematicDto } from './tematic.dto';


export class CreateEventDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    dateStart: Date;

    @ApiProperty()
    @IsNotEmpty()
    dateEnd: Date;

    @ApiProperty()
    @IsNotEmpty()
    lugar: string;

    @ApiProperty()
    @IsNotEmpty()
    descripcion: string;
        
    @ApiProperty()
    @IsNotEmpty()
    tematic: string;
}

export class EditEventDto {
    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    dateStart: Date;

    @ApiProperty()
    @IsOptional()
    dateEnd: Date;

    @ApiProperty()
    @IsOptional()
    lugar: string;

    @ApiProperty()
    @IsOptional()
    descripcion: string;
        
    @ApiProperty()
    @IsOptional()
    tematicId: number;
}


export class eventsDto {
    
    @ApiProperty()
    @IsNotEmpty()
    id: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    uuid:string

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    dateStart: Date;

    @ApiProperty()
    @IsNotEmpty()
    dateEnd: Date;

    @ApiProperty()
    @IsNotEmpty()
    lugar: string;

    @ApiProperty()
    @IsNotEmpty()
    descripcion: string;
        
    @ApiProperty()
    @IsNotEmpty()
    tematic: TematicDto;
}
