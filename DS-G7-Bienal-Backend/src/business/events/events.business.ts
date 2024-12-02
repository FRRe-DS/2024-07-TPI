import { CreateEventDto, eventsDto } from '@dto/events.dto';
import { TematicRepository } from './../../database/prisma/tematic.repository';
import { ResponseClass } from "@handdles";
import { Injectable } from "@nestjs/common";
import { EventsRepository } from "@prisma";


@Injectable()
export class EventBusiness extends ResponseClass{
    constructor(
        private readonly eventRepository:EventsRepository,
        private readonly tematicRepository:TematicRepository
    ){super()}

    async createEvent(data:CreateEventDto){
        let event = await this.eventRepository.createEvent(data)
        if (!event) return this.badRequest('Error al crear la propiedad')
        return this.success({
            message:'Evento creado'
        })
    }

    async getEvents(){
        const events = await this.eventRepository.getEvents()
        
        let result:eventsDto[] = []


        for (let event of events){
            let tematic = await this.tematicRepository.findTematicById(event.tematicId) 
            
            let actEvent:eventsDto = {
                id: event.id,
                name: event.name,
                dateStart: event.dateStart,
                dateEnd: event.dateEnd,
                lugar: event.lugar,
                descripcion: event.descripcion,
                tematic: tematic
            }

            result.push(actEvent)
        }
        return this.success({
            events: result
        })
    }
}