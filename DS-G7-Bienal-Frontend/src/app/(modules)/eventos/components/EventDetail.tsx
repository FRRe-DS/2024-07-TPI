import { Evento } from '@bienal/app/types/eventosType';
import { Sculpture } from '@bienal/app/types/scultureType';
import { MapPin, Calendar } from 'lucide-react';
import SculptureCard from './Sulpture';

export async function EventDetail({ uuid }: { uuid:string }) {

  const fetchEvent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/detail/${uuid}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return { success: false, error: 'Error' }; 
      }

      const data = await res.json();
      return { success: true, data }; 
    } catch (error: any) {
      return { success: false, error: error.message }; 
    }
  };

  

  const response = await fetchEvent();


  if (!response.success) {
    return (
      <div className="p-6 bg-red-100 text-red-700 rounded-md">
        <p>Error al cargar el evento: {response.error}</p>
      </div>
    );
  }

  const evento: Evento = response.data.payload;

  const fetchSculptures = async(): Promise<Sculpture[]> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/list-by-event/${evento.id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return []; 
      }

      const responseSculpture = await res.json();
      return responseSculpture.payload
    } catch (error: any) {
      return []; 
    }
  }


  const sculptures:Sculpture[] = await fetchSculptures()

  return (
    <>
    <header className=" relative m-4 p-6 bg-white z-0 overflow-hidden">
      <div className="absolute inset-0 opacity-0" />
      <div className="relative z-10 flex flex-row items-center gap-x-4 flex-wrap justify-between">
        <h3 className="text-2xl m-0 font-bold text-gray-900 my-2">
          {evento.name}
        </h3>
        
        <p className="text-sm font-medium text-emerald-600 my-2 bg-emerald-100 px-2 py-1 rounded">
          {evento.tematic.name}
        </p>
        <div className="flex items-center text-gray-600 my-2">
          <MapPin className="h-5 w-5 text-emerald-600" />
          <span>{evento.lugar}</span>
        </div>
        <div className="flex items-center text-gray-600 my-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          <span>
            {new Date(evento.dateStart).toLocaleString()} - {new Date(evento.dateEnd).toLocaleString()}
          </span>
        </div>
      </div>
      <p className=" w-full text-center my-4 text-gray-700 line-clamp-3">{evento.descripcion}</p>
    </header>
    <h1 className='text-center text-xl font-bold'>Esculturas del evento</h1>
    <article className='flex flex-row flex-wrap gap-x-12'>
      {
        sculptures.map(
          (sculp, index) => (
            <SculptureCard sculpture={sculp} key={index} />
          )
        )
      }
    </article>
    </>
  )
}