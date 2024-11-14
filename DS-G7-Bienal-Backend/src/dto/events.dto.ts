import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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


export class eventsDto {
    
    @ApiProperty()
    @IsNotEmpty()
    id: number;

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
