import { CreateEventDto } from '@dto/events.dto';
import { Injectable } from '@nestjs/common';
import { Prisma as PrismaService } from '@prisma';
import { Event } from '@prisma/client';


@Injectable()
export class EventsRepository{
    constructor(private readonly prisma: PrismaService) {}

    async getEvents() {
        return this.prisma.event.findMany()
    }

    async findEventById(id:number): Promise<Event | null>{
        return this.prisma.event.findUnique({where:{id: +id,}})
    }

    async createEvent(data:CreateEventDto){
        
        let tematic = await this.prisma.tematic.findUnique({where:{name:data.tematic}})
        if (!tematic){
            tematic = await this.prisma.tematic.create({data:{name:data.tematic}})
        }
        return this.prisma.event.create({
            data:{
                name: data.name,
                dateStart: data.dateStart,
                dateEnd: data.dateEnd,
                descripcion: data.descripcion,
                lugar:data.lugar,
                tematicId:tematic.id
            }
        })
    }
}