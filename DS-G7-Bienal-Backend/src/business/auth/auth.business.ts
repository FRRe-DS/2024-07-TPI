import { SculptorRepository } from '@prisma/sculptor.repository';
import { LoginDto, RegisterUsuarioDto } from '@dto';
import { ResponseClass } from '@handdles';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthBusiness extends ResponseClass {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly sculptorRepository: SculptorRepository
  ) {
    super();
  }

  async getSculptorProfile(id_user:number) {
    const profile = await this.sculptorRepository.findSculptorById(id_user)
    return profile || null
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    
    if (!user) {
      return this.forbidden('No se encontró el usuario');
    }

    const passwordValid = await bcrypt.compare(loginDto.password, user.password);

    if (passwordValid) {
      const payload = { email: user.email, sub: user.id };

    

      return this.success({
        access_token: this.jwtService.sign(payload),
        user: user
      });
    }

    return this.forbidden('Credenciales inválidas');
  }

  async registerUsuario(registerDto: RegisterUsuarioDto) {
    const existingUser = await this.userRepository.findByEmail(registerDto.email);
    
    if (existingUser) {
      return this.badRequest('Ya existe una cuenta con ese email');
    }
    
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    registerDto.password = hashedPassword;

    await this.userRepository.registerUsuario(registerDto);

    return this.success({
      message: 'Usuario creado',
    });
  }


  async upgradeUserRole(id:number){
    const user = await this.userRepository.updateRoleUser(id)
    if(!user) return this.badRequest('Error, no se pudo obtener el usuario');
    return this.success({
      message: `Usuario ${user.name} ahora es un escultor`,
    });
  }

  async registerAdmin() {
    await this.userRepository.registerAdmin();

    return this.success({
      message: 'Usuario creado',
    });
  }
}
