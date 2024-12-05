import { Evento } from "@bienal/app/types/eventosType";
import { Event } from "./Event";
import { EventCard } from "./EventCard";

export function EventList({events, search}:{events:Evento[], search:string}) {
    const today = new Date();
    

    const filteredEvents = search === '' || search.toLowerCase() === 'todos' 
      ? events 
      : events.filter((event: Evento) => 
          event.tematic.name.toLowerCase() === search.toLowerCase()
    );

    const eventosActuales = filteredEvents.filter(evento => {
        const startDate = new Date(evento.dateStart);
        const endDate = new Date(evento.dateEnd);
        
        return today > startDate && today <= endDate;
    });


    const eventosFuturos = filteredEvents.filter(evento => {
        const startDate = new Date(evento.dateStart);
        
        return startDate > today;
    });
    
    const eventosPasados = filteredEvents.filter(evento => {
        const endDate = new Date(evento.dateEnd);
        
        return endDate < today;
    });

    return (
        search === '' || search.toLowerCase() === 'todos'
            ? 
            <div>
                {
                eventosActuales.length !== 0 
                &&
                <>
                <h3 className="w-full my-10 text-center text-xl font-bold">Eventos actuales</h3>
                {
                    eventosActuales.map((evento:Evento, index:number) => (
                    <EventCard isOngoing={true} evento={evento} index={index} key={index} />
                    ))
                }
                </>
                }
                {
                eventosFuturos.length !== 0 
                &&
                <>
                <h3 className="w-full my-10 text-center text-xl font-bold">Eventos próximos</h3>
                {
                    eventosFuturos.map((evento:Evento, index:number) => (
                    <EventCard isOngoing={false} evento={evento} index={index} key={index} />
                    ))
                }
                </>
                }
                {
                eventosPasados.length !== 0
                &&
                <>
                <h3 className="w-full my-10 text-center text-xl font-bold">Eventos pasados</h3>
                {
                    eventosPasados.map((evento:Evento, index:number) => (
                    <EventCard isOngoing={false} evento={evento} index={index} key={index} />
                    ))
                }
                </>
                }
            </div>
            : 
            <div>
                {
                    eventosActuales.length !== 0 
                    &&
                    <>
                    <h3 className="w-full my-10 text-center text-xl font-bold">Eventos actuales</h3>
                    {
                        eventosActuales.map((evento:Evento, index:number) => (
                        <Event evento={evento} index={index} key={index} />
                        ))
                    }
                    </>
                    }
                {
                eventosFuturos.length !== 0 
                &&
                <>
                <h3 className="w-full my-10 text-center text-xl font-bold">Eventos próximos</h3>
                {
                    eventosFuturos.map((evento:Evento, index:number) => (
                    <Event evento={evento} index={index} key={index} />
                    ))
                }
                </>
                }
                {
                eventosPasados.length !== 0
                &&
                <>

                <h3 className="w-full my-10 text-center text-xl font-bold">Eventos pasados</h3>
                    
                {
                    eventosPasados.map((evento:Evento, index:number) => (
                        <Event evento={evento} index={index} key={index} />
                    ))
                }
                </>
                
                }
            </div>
    );
}
