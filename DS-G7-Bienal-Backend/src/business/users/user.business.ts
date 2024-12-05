import { EditProfileDto, LoginDto, RegisterUsuarioDto } from '@dto';
import { ResponseClass } from '@handdles';
import { ResponseInterface } from '@interfaces';
import { UserInterface } from '@interfaces/services/users.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@prisma';
import { SculptorRepository } from '@prisma/sculptor.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserBusiness extends ResponseClass {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly sculptorRespository:SculptorRepository
  ) {
    super();
  }

  async editUserProfile(data:EditProfileDto, user_id:number):Promise<ResponseInterface<UserInterface>>{
    const user = await this.userRepository.editProfileUser(data,user_id)
    const scultpor = await this.sculptorRespository.findSculptorById(user_id)
    let response:UserInterface = user as UserInterface
    if(scultpor){
      response.escultor = scultpor
    }
    return this.success(response);
  }

  async findAllUsersVisitantes():Promise<ResponseInterface<UserInterface[]>>{
    const users = await this.userRepository.findAllUsersVisitantes()

    let response:UserInterface[] = []

    for (let user of users){
      let userResponse:UserInterface = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        dni: user.dni,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role: user.role,
      }
      response.push(userResponse)
    }

    return this.success(response);
  }

}
