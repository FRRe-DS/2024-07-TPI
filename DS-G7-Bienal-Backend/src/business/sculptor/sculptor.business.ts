import { ResponseClass } from "@handdles";
import { ResponseInterface } from '@interfaces';
import { SculptorInterface } from '@interfaces/services/users.interface';
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@prisma";
import { SculptorRepository } from '@prisma/sculptor.repository';


@Injectable()
export class SculptorBusiness extends ResponseClass{
    constructor(
        private readonly sculptorRepository:SculptorRepository,
        private readonly userRepository: UserRepository,

    ){super()}

    public async getSculptors(): Promise<ResponseInterface<SculptorInterface[]>> {
        let sculptors = await this.sculptorRepository.findAllSculptors() as SculptorInterface[]
        return this.success(sculptors)
    }

    public async sculptorDetail(id:number): Promise<ResponseInterface<SculptorInterface>>{
        let sculptor = await this.sculptorRepository.findSculptorById(id) as SculptorInterface
        if (!sculptor) return this.badRequest('Error, perfil de escultor inexistente')
        return this.success(sculptor)
    }

    public async editSculptor(
        userId: number,
        updateData: Partial<SculptorInterface>
      ): Promise<ResponseInterface<SculptorInterface>> {
        // Extraer datos relacionados con el usuario y el escultor desde `updateData.user`
        const { name, lastname, phoneNumber } = updateData.user || {};
        const { biografia } = updateData;
        userId = Number(userId)
        // Verificar si el escultor existe
        const existingSculptor = await this.sculptorRepository.db.findUnique({
          where: { userId },
          include: { user: true },
        });
    
        if (!existingSculptor) {
          this.badRequest('No se encontro el usuario');
        }
    
        // Actualizar datos del usuario si se proporcionan
        if (name || lastname || phoneNumber) {
          await this.userRepository.db.update({
            where: { id: userId },
            data: {
              name,
              lastname,
              phoneNumber,
            },
          });
        }
    
        // Actualizar datos del escultor si se proporciona `biografia`
        let updatedSculptor = existingSculptor;
        if (biografia) {
          updatedSculptor = await this.sculptorRepository.db.update({
            where: { userId },
            data: {
              biografia,
            },
            include: { user: true },
          });
        }
    
        // Retornar respuesta
        return this.success(updatedSculptor)
      }

    
}