import { CreateScultureDto } from '@dto/sculture.dto';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { Image, Sculpture } from '@prisma/client';

@Injectable()
export class SculptureRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createSculpture(data:CreateScultureDto): Promise<Sculpture | null>{
        
        
        return this.prisma.sculpture.create({data:{
            eventId: data.eventId,
            sculptorId: data.scultorId,
            name: data.name,
            description: data.description,
            
        }})
    }

    async createImage(url:string, sculptureId:number):Promise<Image|null>{
        return this.prisma.image.create({data:{url:url, sculptureId:sculptureId}})
    }

    async findAllSculptures(): Promise<Sculpture[] | null> {
        return this.prisma.sculpture.findMany()
    }

    async findSculptureById(id:number): Promise<Sculpture | null> {
        return this.prisma.sculpture.findUnique({where:{id}})
    }

}
