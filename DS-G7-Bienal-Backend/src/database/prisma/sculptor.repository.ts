import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';

@Injectable()
export class SculptorRepository {
    constructor(private readonly prisma: PrismaService) {}

    get db() {
        return this.prisma.sculptor;
      }

    async findSculptorById(id:number){
        return this.prisma.sculptor.findUnique({where: {userId:id}})
    }

    findAllSculptors(){
        return this.prisma.sculptor.findMany({
            include: {
                user: true,
              },
        })
    }


}
