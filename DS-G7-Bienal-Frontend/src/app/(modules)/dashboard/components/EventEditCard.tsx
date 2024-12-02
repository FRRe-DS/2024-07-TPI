"use client"
import { Evento } from '@bienal/app/types/eventosType';
import {PencilIcon, TrashIcon, CalendarIcon, MapPinIcon } from 'lucide-react';

export function EventEditCard({ evento, index }: { evento: Evento; index: number }) {
    const handleEdit = (evento: Evento) => {
        console.log("Editar evento:", evento)
    }

    const handleDelete = (evento: Evento) => {
        console.log("Eliminar evento:", evento)
    }

    const formatDate = (date: Date) => {
        return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
    <div key={index} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex justify-between items-start">
            <div>
            <h2 className="text-2xl font-semibold text-emerald-800 mb-2">{evento.name}</h2>
            <p className="text-gray-600 mb-2">{evento.tematic.name}</p>
            </div>
            <div className="flex space-x-2">
            <button
                onClick={() => handleEdit(evento)}
                className="p-2 text-emerald-800 hover:bg-emerald-100 rounded-full transition-colors duration-200"
                aria-label="Editar evento"
            >
                <PencilIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => handleDelete(evento)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                aria-label="Eliminar evento"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
            </div>
        </div>
        <div className="mt-4 space-y-2">
            <p className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2 text-emerald-800" />
            {formatDate(evento.dateStart)} - {formatDate(evento.dateEnd)}
            </p>
            <p className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2 text-emerald-800" />
            {evento.lugar}
            </p>
        </div>
        
    </div>
  )
}