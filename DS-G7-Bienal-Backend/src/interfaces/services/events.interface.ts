import { eventsDto } from "@dto/events.dto";

export interface EventsListInterface {
    events: eventsDto[];
    
}

export interface CreateEventInterface {
    message?: string;

    
}