"use client";

import { Sculpture } from "@bienal/app/types/scultureType";
import { User } from "@bienal/app/types/usersType";
import Button from "@bienal/app/ui/components/Button";
import Input from "@bienal/app/ui/components/Input";
import { RootState } from "@bienal/store/store";
import axios from "axios";
import { PlusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

interface Props {
    params: {
      uuid: string;
    };
}

export default function Page({ params }: Props) {
    
    const { uuid } = params;
    
    const [msg, setMsg] = useState<string | null>(null);
    const [sculpture, setSculpture] = useState<Omit<Sculpture, 'sculptor'> | null>(null)
    const [events, setEvents] = useState<Event[]>([])
    
    const fetchSculpture = async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/detail/bounded/${uuid}`)
            if(res.status===200){
                setSculpture(res.data.payload)
            } else {
                setSculpture(null)
            }
        }catch{
            setSculpture(null)
        }
    }
    
    useEffect(() => {

        fetchSculpture()
    },[])

    useEffect(() => {
        const getEventList = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/list`)
                setEvents(res.data.payload.events as Event[])
            } catch {
                setEvents([])
            }
        }
        getEventList()
    }, [])

    const [formData, setFormData] = useState<SculptureFormData>({
        name: '',
        description: '',
        eventId: 0,
        images: []
    })

    const user: User | null = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    
    useEffect(() => {
        setMsg(null);
    }, []);
    
    /*useEffect(() => {
        if (!sculpture) {
            return router.push("/");
        }
    }, [user, router]);*/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setFormData(prev => ({
            ...prev,
            [name]: name === "eventId" ? parseInt(value) || 0 : value, // Convertir a número si es eventId
        }));
    };
    

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


    
    
    
    
    

    const submitSculptureData = async() => {
        try {
            const token = localStorage.getItem("accessToken");
            
            const form = new FormData();
            form.append('name', formData.name);
            form.append('description', formData.description);
            form.append('eventId', String(formData.eventId)); 
            formData.images.forEach((image) => {
                form.append('images', image);
            });

            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/edit/${uuid}`,
                form,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                } 
            )
            console.log(res)
            if (res.status === 200) {
                setMsg("Escultura editado correctamente");
                setFormData({
                    name: '',
                    description: '',
                    eventId: 0,
                    images: []
                })
                await fetchSculpture()
            } else {
                setMsg("Error");
            }
        } catch(error) {
            setMsg("Error");
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await submitSculptureData()
    }

    if (!sculpture) {
        return (
          <>
            <main className="flex w-full justify-center items-center h-screen">
              <p className="text-2xl text-red-600">Error: Escultura no encontrada</p>
            </main>
          </>
        );
    }

    return (
        <>
            
            
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar la escultura</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Input
                            label='Nombre de la escultura'
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            placeholder={sculpture.name}
                            onChange={handleChange}
                        />
                    
                    </div>

                    <div>
                    <label htmlFor="description" className="block text-sm font-medium text-emerald-800">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        placeholder={sculpture.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    ></textarea>
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
                    </div>

                    <div>
                    <label className="block text-sm text-emerald-800">Imágenes</label>
                    <p className="text-gray-500 text-sm">Subir nuevas imagenes reemplaza las anteriores</p>
                    <div className="flex gap-x-2 my-2">
                    {   
                        
                        sculpture.images.map((img, index) => (
                            <img key={index} src={img.url} alt={`Imagen ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                        ))
                    }
                    </div>
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
                        text='Editar'
                        type='submit'
                    />
                    </div>
                </form>
                {
                    msg&&<p className='my-4 text-center font-semibold'>{msg}</p>
                }
            </div>
            
        </>
    );
}
