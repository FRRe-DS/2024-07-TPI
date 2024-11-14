"use client"

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from 'lucide-react'
import Link from "next/link";
import { Escultor } from "@bienal/store/slices/userSlice";

function EsculptorPreview({ escultor, isExpanded, toggleExpand }: { escultor: Omit<Escultor, 'id'>, isExpanded: boolean, toggleExpand: () => void }) {
    return (
      <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
        <div className="p-4 flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{escultor.name} {escultor.lastname}</h3>
            <p className="text-sm text-gray-600">DNI: {escultor.dni}</p>
          </div>
          {isExpanded ? <ChevronUpIcon className="h-5 w-5 text-emerald-800" /> : <ChevronDownIcon className="h-5 w-5 text-emerald-800" />}
        </div>
        {isExpanded && (
          <div className="px-4 pb-4">
            <p><strong>Email:</strong> {escultor.email}</p>
            <p><strong>Teléfono:</strong> {escultor.phoneNumber}</p>
            <p><strong>Biografía:</strong> {escultor.biografia}</p>
            <div className="mt-4 flex space-x-2">
              <button className="px-4 py-2 bg-emerald-800 text-white rounded hover:bg-emerald-700 transition-colors duration-200 flex items-center">
                <PencilIcon className="h-4 w-4 mr-2" />
                Editar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-colors duration-200 flex items-center">
                <TrashIcon className="h-4 w-4 mr-2" />
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

const escultores: Omit<Escultor, 'id'>[] = [
    {
    email: 'juan@example.com',
    name: 'Juan',
    lastname: 'Pérez',
    phoneNumber: '123456789',
    dni: '12345678A',
    biografia: 'Juan es un escultor especializado en mármol...',
    role: 'ESCULTOR'
    },
    {
    email: 'maria@example.com',
    name: 'María',
    lastname: 'García',
    phoneNumber: '987654321',
    dni: '87654321B',
    biografia: 'María es una escultora contemporánea que trabaja con metal...',
    role: 'ESCULTOR'
    },
    
]

export default function VerEscultores() { 
    
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (dni: string) => {
        setExpandedId(expandedId === dni ? null : dni)
    }

    return (
        <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Lista de Escultores</h1>
        <div className="space-y-4">
            {escultores.map((escultor) => (
            <EsculptorPreview
                key={escultor.dni}
                escultor={escultor}
                isExpanded={expandedId === escultor.dni}
                toggleExpand={() => toggleExpand(escultor.dni)}
            />
            ))}
        </div>
        </div>
    )
}
