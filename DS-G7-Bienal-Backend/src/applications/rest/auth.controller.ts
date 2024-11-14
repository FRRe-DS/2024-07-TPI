import { AuthBusiness } from '@business';
import { GetUser } from '@business/auth/auth.decorators';
import { JwtAuthGuard } from '@business/auth/jwt.guard';
import { LoginDto, RegisterUsuarioDto } from '@dto';
import { ResponseInterface } from '@interfaces';
import { LoginResponseInterface } from '@interfaces/services/login.interface';
import { Controller, Post, Body, UnauthorizedException, ValidationPipe, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authBusiness : AuthBusiness) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public async login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<ResponseInterface<LoginResponseInterface>>  {
    return await this.authBusiness.login(loginDto) as Promise<
      ResponseInterface<LoginResponseInterface>
    >;;  
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async register(
    @Body(new ValidationPipe()) registerDto: RegisterUsuarioDto
  ): Promise<ResponseInterface<{message : string}>> {
    return await this.authBusiness.registerUsuario(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me') 
  getMe(@Req() req) {
    
    return req.user;  
  }


  @Post('registerAdmin')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async registerAdmin(
    
  ): Promise<ResponseInterface<{message : string}>> {
    return await this.authBusiness.registerAdmin();
  }
}

