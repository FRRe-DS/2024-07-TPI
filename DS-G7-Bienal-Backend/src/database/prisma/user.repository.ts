import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { EditProfileDto, RegisterUsuarioDto } from '@dto';
import * as bcrypt from 'bcryptjs';
import { Role, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  get db() {
    return this.prisma.user;
  }

  async findByEmail(email: string) {    
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id:number){
    return this.prisma.user.findUnique({ where: { id } });
  }

  async registerUsuario(data: RegisterUsuarioDto) {
    return this.prisma.user.create({ data });
  }

  async findAllUsersVisitantes(): Promise<User[]>{
    return await this.prisma.user.findMany({where:{role:Role.VISITANTE}})
  }

  async editProfileUser(data:EditProfileDto, user_id:number): Promise<User>{
    const user = await this.findUserById(user_id)

    if (!user) throw new Error('Usuario no encontrado');

    const sculpt = await this.prisma.sculptor.findUnique({where:{userId:user_id}}) || null

    if(sculpt){
      const [updateSculptor] = await this.prisma.$transaction([
        this.prisma.sculptor.update({
          where : {userId:user_id},
          data:{
            biografia: data.biografia || sculpt.biografia,
            qr: data.qr || sculpt.qr,
            obrasPrevias: data.obrasPrevias || sculpt.obrasPrevias
          }
        }),
        
      ])
    }
    const [updateUser] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: {id:user_id},
        data: {
          name: data.name || user.name,
          lastname: data.lastname || user.lastname,
          dni: data.dni || user.dni,
          email: data.email || user.email,
          phoneNumber: data.phoneNumber || user.phoneNumber
        }
      })
    ])

    return updateUser
  }


  async updateRoleUser(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) throw new Error('Usuario no encontrado');
    
    if (user.role === Role.ESCULTOR)throw new Error('El usuario ya tiene el rol de ESCULTOR');

    const existingSculptor = await this.prisma.sculptor.findUnique({
      where: { userId: id },
    });
    
    if (existingSculptor) {
      console.log(existingSculptor)
      throw new Error('Ya existe una entidad Sculptor asociada a este usuario');
    }

    const [updatedUser] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: id },
        data: {
          role: 'ESCULTOR',
        },
      }),
      this.prisma.sculptor.create({
        data: {
          userId:id,
        },
      }),
    ]);
  

    return updatedUser;
  }

  async registerAdmin() {
    const hashedPassword = await bcrypt.hash('admin', 10);
    return this.prisma.user.create({  data: {
      name: 'Admin',
      lastname: 'User',
      email: 'admin@example.com',
      dni: '1111110',
      password: hashedPassword,
      role: 'ADMIN', 
    }, });
  }
}
