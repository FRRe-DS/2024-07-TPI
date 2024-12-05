'use client';

import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Sculpture } from '@bienal/app/types/scultureType';
import Button from '@bienal/app/ui/components/Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const GET_QR_CODE = gql`
  query GenerateQRCode($sculptureId: String!) {
    generateQRCode(sculptureId: $sculptureId)
  }
`;

export default function OwnSculptureCard({
  sculpture, reFetchSculptures
}: {
  reFetchSculptures: ()=>void,
  sculpture: Omit<Sculpture, 'sculptor'>;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [msg, setMsg] = useState<string|null>(null)
  const router = useRouter();

  const redirectToEdit = () => {
    return router.push(`/obras/edit/${sculpture.uuid}`)
  }

  const { data, loading, error, refetch } = useQuery(GET_QR_CODE, {
    variables: { sculptureId: sculpture.uuid },
    skip: !sculpture.uuid, // Asegura que sculpture.uuid exista
  });

  useEffect(() => {
    if (!loading && !error) {
      // Refresca el QR cada minuto
      const interval = setInterval(() => {
        refetch();
      }, 60000);

      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [loading, error, refetch]);

  const deleteImage = async() => {
    try {
      const token = localStorage.getItem('accessToken')

      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}sculpture/delete/${sculpture.id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          } 
        }
      )
      

      
    } catch{
      setMsg('Error al intentar eliminar')
    } finally {
      reFetchSculptures()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sculpture.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sculpture.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-sm w-full m-8 cursor-pointer hover:shadow-xl rounded overflow-hidden shadow-lg bg-white">
      <div className="relative h-64">
        {sculpture.images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`${sculpture.name} - Imagen ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="px-6 py-4">
        <p className="text-sm font-medium mb-2 text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
          {sculpture.name}
        </p>
        <p className="text-gray-700 text-base mb-2">{sculpture.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          Creado el: {new Date(sculpture.createdAt).toLocaleDateString()}
        </p>

        <div className="flex justify-center mt-4">
          {loading ? (
            <p>Cargando QR...</p>
          ) : error ? (
            <p>Error al cargar el QR</p>
          ) : (
            <img
              src={data.generateQRCode}
              alt="Código QR"
              onError={() => console.error('Error al cargar la imagen')}
              style={{ maxWidth: '100%', maxHeight: '200px' }} // Asegura un tamaño adecuado
            />
          )}
        </div>

        <div className="flex space-x-4 mt-4">
            <Button text="Editar" onClick={redirectToEdit}/>
          

            <Button text="Eliminar" onClick={deleteImage}/>
        </div>
          {msg&&<p className='text-center w-full text-red-600'>{msg}</p>}
      </div>
    </div>
  );
}
