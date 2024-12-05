import { IsInt, Min, Max } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  id_sculpture: number;

  @IsInt()
  @Min(1)
  @Max(5)
  calification: number;
}

export class CanVoteDto{
  @IsInt()
  id_sculpture: number;

}