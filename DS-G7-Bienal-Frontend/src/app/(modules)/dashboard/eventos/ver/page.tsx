import { Evento } from "@bienal/app/types/eventosType";
import { EventEditCard } from "../../components/EventEditCard";


export default async function Page(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/list`, {
    cache: "no-store"
  });
  const data = await res.json();

  
  const eventos: Evento[] = data.payload.events || [];


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