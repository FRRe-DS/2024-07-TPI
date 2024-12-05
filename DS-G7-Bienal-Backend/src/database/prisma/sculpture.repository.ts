import { CreateScultureDto, EditScultureDto } from '@dto/sculture.dto';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { Image, Sculpture } from '@prisma/client';

@Injectable()
export class SculptureRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createSculpture(data:CreateScultureDto): Promise<Sculpture | null>{
        
        
        return await this.prisma.sculpture.create({data:{
            eventId: data.eventId,
            sculptorId: data.scultorId,
            name: data.name,
            description: data.description,
            
        }})
    }

    async createImage(url:string, sculptureId:number):Promise<Image|null>{
        return await this.prisma.image.create({data:{url:url, sculptureId:sculptureId}})
    }

    async deleteSculpture(sculptorId:number, sculptureId:number):Promise<boolean>{
        const sculpture = await this.findSculptureById(sculptureId)
        if(sculpture.sculptorId === sculptorId) {
            await this.prisma.sculpture.delete({where:{id:sculpture.id}})
            return true
        }
        return false
    }

    async editSculpture(data:EditScultureDto, uuid:string): Promise<Sculpture>{
        console.log(data)
        const sculp = await this.findSculptureByUuid(uuid)
        if (!sculp) throw new Error('Escultura no encontrado');
        const [response] = await this.prisma.$transaction([
            this.prisma.sculpture.update({
                where: {uuid},
                data:{
                    name: data.name || sculp.name,
                    eventId: +data.eventId || sculp.eventId,
                    description: data.description || sculp.description,
                    qr: data.qr || sculp.qr
                }
            })
        ])

        return response
    }

    async findAllSculptures(): Promise<Sculpture[] | null> {
        return await this.prisma.sculpture.findMany()
    }

    async findSculptureByUuid(uuid:string): Promise<Sculpture | null> {
        return await this.prisma.sculpture.findUnique({where:{uuid}})
    }

    async findSculptureById(id:number): Promise<Sculpture | null> {
        return await this.prisma.sculpture.findUnique({where:{id}})
    }

    async listSculpturesByEvent(id_event:number): Promise<Sculpture[]>{
        return await this.prisma.sculpture.findMany({where:{eventId:id_event}})
    }

    async listSculpturesBySculptor(id_sculptor:number):Promise<Sculpture[]>{
        return await this.prisma.sculpture.findMany({where:{sculptorId:id_sculptor}})
    }

}
