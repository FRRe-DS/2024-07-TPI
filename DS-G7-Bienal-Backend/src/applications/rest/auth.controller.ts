import { AuthBusiness } from '@business';
import { JwtAuthGuard, JwtRoleAdminGuard } from '@business/auth/jwt.guard';
import { LoginDto, RegisterUsuarioDto } from '@dto';
import { ResponseInterface } from '@interfaces';
import { LoginResponseInterface } from '@interfaces/services/login.interface';
import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authBusiness : AuthBusiness) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public async login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<ResponseInterface<LoginResponseInterface>>  {
    console.log("asadsasadsadsdsa")
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

  @Patch('upgrade/:id')
  @UseGuards(JwtRoleAdminGuard)
  async upgradeUserRole(@Param('id', ParseIntPipe) id: number) {
    return await this.authBusiness.upgradeUserRole(id);
  }
}

