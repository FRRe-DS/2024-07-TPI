import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TematicDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}