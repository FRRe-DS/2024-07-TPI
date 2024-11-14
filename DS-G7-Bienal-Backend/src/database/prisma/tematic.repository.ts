import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';

@Injectable()
export class TematicRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findTematicById(id:number){
        return this.prisma.tematic.findUnique({where: {id}})
    }

    async findTematicByName(name:string){
        return this.prisma.tematic.findUnique({where:{name}})
    }

    async getTematic(){
        return this.prisma.tematic.findMany()
    }

}
