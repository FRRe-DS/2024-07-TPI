import { Evento } from '@bienal/app/types/eventosType';
import { MapPin, Calendar } from 'lucide-react';

export function Event({ evento, index }: { evento: Evento; index: number }) {
  return (
    <article key={index} className="group relative m-4 p-6 rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg z-0 overflow-hidden">
      <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300" />
      <div className="relative z-10 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
          {evento.name}
        </h3>
        <p className="text-sm font-medium text-emerald-600 bg-emerald-100 inline-block px-2 py-1 rounded">
          {evento.tematic.name}
        </p>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
          <span>{evento.lugar}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
          <span>
            {new Date(evento.dateStart).toLocaleString()} - {new Date(evento.dateEnd).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-700 line-clamp-3">{evento.descripcion}</p>
      </div>
    </article>
  )
}