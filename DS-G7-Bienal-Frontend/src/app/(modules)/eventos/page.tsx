import { Evento } from "@bienal/app/types/eventosType";
import { Search } from "./components/Search";
import StoreProvider from "@bienal/app/StoreProvider";
import Navbar from "@bienal/app/ui/components/Navbar";
import { EventList } from "./components/EventList";


export default async function Page({searchParams}: {searchParams:{event? :string}}){

    const search = searchParams?.event || ''

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/list`, {
      cache: "no-store"
    });
    const data = await res.json();
  
    let eventos:Evento[] = []
    eventos = await data.payload.events;
    
    /*const eventos: Evento[] = [
        {
          nombre: "Esculturas en vivo",
          fechaInicio: new Date('2024-11-20T09:00:00'),
          fechaFin: new Date('2024-11-20T17:00:00'),
          lugar: "Parque Central",
          descripcion: "Escultores locales e internacionales mostrarán sus habilidades creando impresionantes esculturas en tiempo real.",
          tematica: {
            nombre: "Escultura en piedra"
          }
        },
        {
          nombre: "Exposición de esculturas clásicas",
          fechaInicio: new Date('2024-11-21T10:00:00'),
          fechaFin: new Date('2024-11-21T18:00:00'),
          lugar: "Museo de Arte Moderno",
          descripcion: "Una exhibición de las mejores esculturas clásicas de artistas célebres, con enfoque en la técnica y la historia.",
          tematica: {
            nombre: "Escultura clásica"
          }
        },
        {
          nombre: "Escultura en madera: Taller interactivo",
          fechaInicio: new Date('2024-11-22T14:00:00'),
          fechaFin: new Date('2024-11-22T17:00:00'),
          lugar: "Centro Cultural del Arte",
          descripcion: "Taller práctico donde los asistentes podrán aprender y practicar técnicas de escultura en madera.",
          tematica: {
            nombre: "Escultura en madera"
          }
        },
        {
          nombre: "Premios a la mejor escultura",
          fechaInicio: new Date('2024-11-23T19:00:00'),
          fechaFin: new Date('2024-11-23T21:00:00'),
          lugar: "Teatro Principal",
          descripcion: "Ceremonia de premiación para las mejores esculturas creadas durante el evento, con jurado especializado.",
          tematica: {
            nombre: "Premios y reconocimiento"
          }
        },
        {
          nombre: "Escultura en metal: Exhibición y demostración",
          fechaInicio: new Date('2024-11-24T10:00:00'),
          fechaFin: new Date('2024-11-24T16:00:00'),
          lugar: "Auditorio Municipal",
          descripcion: "Exhibición de esculturas metálicas de gran tamaño y demostración en vivo de las técnicas de soldadura y forja.",
          tematica: {
            nombre: "Escultura en metal"
          }
        }
    ];*/

    
  

    


    return (
        <>
            <StoreProvider>
                <Navbar/>

            </StoreProvider>
        
            <main className="flex w-full">
            
            
                <section className="mt-20 w-full">
                    

                  <Search/>
                  <EventList events={eventos} search={search} />
                    
                </section>
            </main>
        </>
    )
}