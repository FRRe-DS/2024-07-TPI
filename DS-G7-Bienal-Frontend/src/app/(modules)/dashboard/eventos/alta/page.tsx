'use client'

import React, { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import Input from '@bienal/app/ui/components/Input'
import Button from '@bienal/app/ui/components/Button'
import { CreateEvento } from '@bienal/app/types/eventosType'
import axios from 'axios'

export default function Page() {
  const [evento, setEvento] = useState<CreateEvento>({
    name: '',
    dateStart: new Date(),
    dateEnd: new Date(),
    lugar: '',
    descripcion: '',
    tematic: ''
  })

  interface Error{
    name:string,
    dateStart:string ,
    dateEnd:string,
    lugar:string,
    descripcion:string,
    tematic:string
  }

  const [errors, setErrors] = useState<Partial<Error>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEvento(prev => ({
      ...prev,
      [name]: name === 'dateStart' || name === 'dateEnd' ? new Date(value) : value,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Error> = {}
    if (!evento.name) newErrors.name = 'El nombre del evento es requerido'
    if (!evento.dateStart) newErrors.dateStart = 'La fecha de inicio es requerida'
    if (!evento.dateEnd) newErrors.dateEnd = 'La fecha de fin es requerida'
    if (!evento.lugar) newErrors.lugar = 'El lugar es requerido'
    if (!evento.descripcion) newErrors.descripcion = 'La descripción es requerida'
    if (!evento.tematic) newErrors.tematic = 'La temática es requerida'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const [payloadS, setPayloadS] = useState<string>('')
  const [payloadE, setPayloadE] = useState<string>('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/create`, evento)

        const msg = await response.data.payload.message
        setPayloadS(msg)
        setPayloadE('')
      } catch (error:any) {
        setPayloadE(error.toString())
        setPayloadS('')
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            label="Nombre del evento"
            value={evento.name}
            onChange={handleChange}
            placeholder="Exposición de Esculturas"
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="dateStart" className="block text-sm font-medium text-emerald-800">Fecha de Inicio</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <CalendarIcon className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                id="dateStart"
                name="dateStart"
                value={evento.dateStart.toISOString().slice(0, 16)}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.dateStart && <p className="mt-2 text-sm text-red-600">{errors.dateStart}</p>}
          </div>

          <div>
            <label htmlFor="dateEnd" className="block text-sm font-medium text-emerald-800">Fecha de Fin</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <CalendarIcon className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                id="dateEnd"
                name="dateEnd"
                value={evento.dateEnd.toISOString().slice(0, 16)}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            {errors.dateEnd && <p className="mt-2 text-sm text-red-600">{errors.dateEnd}</p>}
          </div>
        </div>

        <div>
          <Input
            type="text"
            id="lugar"
            name="lugar"
            label="Lugar"
            value={evento.lugar}
            onChange={handleChange}
            placeholder="Galería de Arte Moderno"
          />
          {errors.lugar && <p className="mt-2 text-sm text-red-600">{errors.lugar}</p>}
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-emerald-800">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            value={evento.descripcion}
            onChange={handleChange}
            className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Breve descripción del evento..."
          />
          {errors.descripcion && <p className="mt-2 text-sm text-red-600">{errors.descripcion}</p>}
        </div>

        <div>
          <Input
            label="Temática"
            type="text"
            id="tematic"
            name="tematic"
            value={evento.tematic}
            onChange={handleChange}
            placeholder="Arte Contemporáneo"
          />
          {errors.tematic && <p className="mt-2 text-sm text-red-600">{errors.tematic}</p>}
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Button text="Crear Evento" type="submit" />
          </div>
        </div>
      </form>
      {
        payloadE===''
        &&
        <p className='text-center w-full font-bold text-green-600'>{payloadS}</p>
      }
      {
        payloadS === ''
        &&
        <p className='text-center w-full font-bold text-red-600'>{payloadE}</p>
      }
    </div>
  )
}
