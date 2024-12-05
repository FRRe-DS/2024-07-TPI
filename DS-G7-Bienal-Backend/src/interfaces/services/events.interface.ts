import { eventsDto } from "@dto/events.dto";

export interface EventsListInterface {
    events: eventsDto[];
    
}


export interface EventInterface {
    id:number
    uuid:string
    name:string
    dateStart:Date
    dateEnd:Date
    lugar:string
    descripcion:string
    tematic:string
}

export interface CreateEventInterface {
    message?: string;

    
}