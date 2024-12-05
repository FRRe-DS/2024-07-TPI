import { AuthBusiness } from '@business';
import { JwtAuthGuard, JwtRoleAdminGuard } from '@business/auth/jwt.guard';
import { LoginDto, RegisterUsuarioDto } from '@dto';
import { ResponseInterface } from '@interfaces';
import { LoginResponseInterface } from '@interfaces/services/login.interface';
import { SculptorInterface, UserInterface } from '@interfaces/services/users.interface';
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
  public async getMe(@Req() req) {
    const user = req.user
    //let profile:SculptorInterface | null = null
    const sculptor = await this.authBusiness.getSculptorProfile(user.id)
    console.log(sculptor)

    let response:UserInterface = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      dni:user.dni,
   
    }

    if(sculptor !== null){
      console.log("********************")
      response.escultor = {
        qr: sculptor.qr,
        obrasPrevias: sculptor.obrasPrevias,
        biografia: sculptor.biografia
      }
    }



    return response;  
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

