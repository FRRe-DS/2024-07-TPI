'use client'

import React, { useEffect, useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import Input from '@bienal/app/ui/components/Input'
import Button from '@bienal/app/ui/components/Button'
import { CreateEvento, Evento } from '@bienal/app/types/eventosType'
import axios from 'axios'

interface Props {
  params: {
    id: number;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;

  const [evento, setEvento] = useState<Evento | null>(null)

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/detail-id/${id}`)
      if (res.status === 200) {
        setEvento(await res.data.payload)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [reFetch, setReFetch] = useState<boolean>(false)

  useEffect(() => {
    fetchEvent()
  }, [reFetch])

  const [formData, setFormData] = useState<CreateEvento>({
    name: '',
    dateStart: new Date(),
    dateEnd: new Date(),
    lugar: '',
    descripcion: '',
    tematic: ''
  })

  const [payloadS, setPayloadS] = useState<string>('')
  const [payloadE, setPayloadE] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dateStart' || name === 'dateEnd' ? new Date(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Filtrar campos no vacíos
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== '' && value !== null)
    )

    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}event/edit/${id}`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 200) {
        setEvento(res.data.payload)
        setPayloadS('Evento actualizado correctamente')
        setReFetch(!reFetch)
        setFormData({
          name: '',
          dateStart: new Date(),
          dateEnd: new Date(),
          lugar: '',
          descripcion: '',
          tematic: ''
        })
      }
    } catch (error) {
      setPayloadE('Error al actualizar el evento')
      console.error(error)
    }
  }

  const formatDate = (date: string | Date): string => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().slice(0, 16) // Formato para datetime-local
  }

  if (!evento) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className='mt-10'>Error</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Evento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            label="Nombre del evento"
            value={formData.name}
            placeholder={evento.name}
            onChange={handleChange}
          />
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
                value={formatDate(formData.dateStart)}
                placeholder={formatDate(evento.dateStart)}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateEnd" className="block text-sm font-medium text-emerald-800">Fecha de Fin</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <CalendarIcon className="absolute inset-y-0 left-0 pl-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                id="dateEnd"
                name="dateEnd"
                value={formatDate(formData.dateEnd)}
                placeholder={formatDate(evento.dateEnd)}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <Input
            type="text"
            id="lugar"
            name="lugar"
            label="Lugar"
            value={formData.lugar}
            onChange={handleChange}
            placeholder={evento.lugar}
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-emerald-800">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            value={formData.descripcion}
            onChange={handleChange}
            className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder={evento.descripcion}
          />
        </div>

        <div>
          <Input
            label="Temática"
            type="text"
            id="tematic"
            name="tematic"
            value={formData.tematic}
            onChange={handleChange}
            placeholder={evento.tematic.name}
          />
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Button text="Actualizar Evento" type="submit" />
          </div>
        </div>
      </form>
      {payloadS && !payloadE && <p className="text-center w-full font-bold text-green-600">{payloadS}</p>}
      {payloadE && !payloadS && <p className="text-center w-full font-bold text-red-600">{payloadE}</p>}
    </div>
  )
}
