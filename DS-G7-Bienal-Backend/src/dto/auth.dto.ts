import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class EditProfileDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  dni:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  @IsEmail()
  email:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  lastname:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  name:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  phoneNumber:string
  
  @IsOptional()
  @ApiProperty()
  @IsString()
  biografia:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  qr:string

  @IsOptional()
  @ApiProperty()
  @IsString()
  obrasPrevias:string
}


export class RegisterUsuarioDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  dni: string;


}