import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { RegisterUsuarioDto } from '@dto';
import * as bcrypt from 'bcryptjs';
import { UserAllObjectType } from '@graph-ql/models/user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  get db() {
    return this.prisma.user;
  }

  async findByEmail(email: string) {    
    return this.prisma.user.findUnique({ where: { email } });
  }

  async registerUsuario(data: RegisterUsuarioDto) {
    return this.prisma.user.create({ data });
  }

  async registerAdmin() {
    const hashedPassword = await bcrypt.hash('admin', 10);
    return this.prisma.user.create({  data: {
      name: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      dni: '1111110',
      password: hashedPassword,
      role: 'ADMIN', // Establecer el rol a ADMIN
    }, });
  }

  async findAll(): Promise<UserAllObjectType[]> {
    return await this.prisma.user.findMany({
      where: {
        role: 'VISITANTE'
      }
    });

  }
}