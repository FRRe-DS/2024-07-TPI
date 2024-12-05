import { CreateEventDto, EditEventDto, eventsDto } from '@dto/events.dto';
import { TematicRepository } from './../../database/prisma/tematic.repository';
import { ResponseClass } from "@handdles";
import { Injectable } from "@nestjs/common";
import { EventsRepository } from "@prisma";
import { ResponseInterface } from '@interfaces';
import { EventInterface } from '@interfaces/services/events.interface';


@Injectable()
export class EventBusiness extends ResponseClass{
    constructor(
        private readonly eventRepository:EventsRepository,
        private readonly tematicRepository:TematicRepository
    ){super()}

    async getEventById(id:number): Promise<ResponseInterface<eventsDto>>{
        const event = await this.eventRepository.findEventById(id)
        if (!event) return this.badRequest('Error, evento inexistente')
        const tematic = await this.tematicRepository.findTematicById(event.tematicId)
        if (!tematic) return this.badRequest('Error, tematica del evento inexistente')
        
        const response:eventsDto = {
            id: event.id,
            uuid: event.uuid,
            name: event.name,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            lugar: event.lugar,
            descripcion: event.descripcion,
            tematic: tematic
        }
        
        return this.success(response)
    }

    async getEventByUuid(uuid:string): Promise<ResponseInterface<eventsDto>>{
        const event = await this.eventRepository.findEventByUuid(uuid)
        if (!event) return this.badRequest('Error, evento inexistente')
        const tematic = await this.tematicRepository.findTematicById(event.tematicId)
        if (!tematic) return this.badRequest('Error, tematica del evento inexistente')
        
        const response:eventsDto = {
            id: event.id,
            uuid: event.uuid,
            name: event.name,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            lugar: event.lugar,
            descripcion: event.descripcion,
            tematic: tematic
        }
        
        return this.success(response)
    }

    async editEvent(data:EditEventDto, id_event:number):Promise<ResponseInterface<EventInterface>>{
        const event = await this.eventRepository.editEvent(id_event,data)
        if(!event) return this.badRequest('Error al intentar editar el evento')
        const currentTematic = await this.tematicRepository.findTematicById(event.tematicId)
        let response:EventInterface = {
            id:event.id,
            uuid:event.uuid,
            name:event.name,
            dateStart:event.dateStart,
            dateEnd:event.dateEnd,
            lugar:event.lugar,
            descripcion:event.descripcion,
            tematic:currentTematic.name,
        }

        if (data.tematicId){
            const tematic = await this.tematicRepository.findTematicById(data.tematicId)
            if(!tematic) return this.badRequest('Erroral acceder a la tematica seleccionada')
            response.tematic = tematic.name
        }


        return this.success(response)
    }

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
                uuid: event.uuid,
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