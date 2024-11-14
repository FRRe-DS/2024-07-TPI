"use client"
import { Evento } from "@bienal/app/types/eventosType";
import { EventEditCard } from "../../components/EventEditCard";


export default function Page(){
    const eventos: Evento[] = [
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
    ];


    return(
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-emerald-800 mb-6">Eventos de Escultura</h1>
            <div className="space-y-6">
                {
                    
                        eventos.map((evento, index) => (
                            <EventEditCard
                                evento={evento}
                                index={index}
                            />
                        ))
                    
                }
            </div>
        </section>
    )
}