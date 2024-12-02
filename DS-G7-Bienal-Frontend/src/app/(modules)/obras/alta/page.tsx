'use client'

import React, { useState, useEffect } from 'react'
import { PlusIcon, XIcon } from 'lucide-react'
import Input from '@bienal/app/ui/components/Input'
import Button from '@bienal/app/ui/components/Button'
import axios from 'axios'

interface Event {
  id: number
  name: string
}

interface SculptureFormData {
  name: string
  description: string
  eventId: number
  images: File[]
}

interface SculptureErrors {
    name: string
    description: string
    eventId: string
    images: string
}

export default function CreateSculptureForm() {
  const [formData, setFormData] = useState<SculptureFormData>({
    name: '',
    description: '',
    eventId: 0,
    images: []
  })

  const [msg, setMsg] = useState<string|null>(null)

  const [errors, setErrors] = useState<Partial<SculptureErrors>>({
    name: '',
    description: '',
    eventId: '',
    images: ''
  })

  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const getEventList = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/list`)
            console.log(res.data)
            setEvents(res.data.payload.events as Event[])
        } catch {
            setEvents([])
        }
    }
    getEventList()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files as FileList)]
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const createSculpture = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setErrors({ ...errors, images: "No autorizado. Por favor, inicia sesión." });
        return 'Error, no autorizado'
      }
  
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('eventId', String(formData.eventId)); 
      formData.images.forEach((image) => {
        form.append('images', image);
      });
  
      
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/create`, form, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log(res)
      if (res.status === 201) {
        setFormData({ name: '', description: '', eventId: 0, images: [] });
        return 'Escultura creada exitosamente'
      } else{
        return 'Error'
      }
    } catch (error: any) {
        return 'Error al crear escultura'
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors: Partial<SculptureErrors> = {}

    if (!formData.name) newErrors.name = "El nombre es requerido"
    if (!formData.description) newErrors.description = "La descripción es requerida"
    if (formData.eventId === 0) newErrors.eventId = "Debes seleccionar un evento"
    if (formData.images.length === 0) newErrors.images = "Debes subir al menos una imagen"

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    } else {
        const response = await createSculpture()
        setMsg(response)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Escultura</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <Input
                label='Nombre de la escultura'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
            />
        
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-emerald-800">Descripción</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          ></textarea>
          {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="eventId" className="block text-sm text-emerald-800">Evento</label>
          <select
            id="eventId"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value={0}>Selecciona un evento</option>
            {
                events.map((event) => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                ))
            }
          </select>
          {errors.eventId && <p className="mt-2 text-sm text-red-600">{errors.eventId}</p>}
        </div>

        <div>
          <label className="block text-sm text-emerald-800">Imágenes</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md text-emerald-800 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Subir imágenes</span>
                  <input id="images" name="images" type="file" className="sr-only" multiple onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP hasta 5MB</p>
            </div>
          </div>
          {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}
        </div>

        {formData.images.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Imágenes seleccionadas:</h4>
            <div className="flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`Imagen ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            text='Crear'
            type='submit'
          />
        </div>
      </form>
      {
        msg&&<p className='my-4 text-center font-semibold'>{msg}</p>
      }
    </div>
  )
}