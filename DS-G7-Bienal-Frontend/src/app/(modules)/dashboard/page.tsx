"use client"

import Navbar from "@bienal/app/ui/components/Navbar";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import Link from "next/link";


export default function Dashboard() { 
    
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEvent,setIsOpenEvent] =useState(false)
    return (
        <>
            
            

            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-6 py-4 text-left bg-emerald-800 text-white hover:bg-emerald-700 transition-colors duration-200"
                >
                    <span className="text-lg font-semibold">Administrar Escultores</span>
                    {isOpen ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
                </button>
                {isOpen && (
                    <div className="p-6 space-y-4">
                    <Link href="dashboard/escultores/ver" className="block text-gray-900 hover:text-emerald-800 transition-colors duration-200">Ver escultores</Link>
                    <Link href="dashboard/escultores/alta" className="block text-gray-900 hover:text-emerald-800 transition-colors duration-200">Alta de escultores</Link>                            
                    </div>
                )}
            </div>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                    onClick={() => setIsOpenEvent(!isOpenEvent)}
                    className="mt-10 flex items-center justify-between w-full px-6 py-4 text-left bg-emerald-800 text-white hover:bg-emerald-700 transition-colors duration-200"
                >
                    <span className="text-lg font-semibold">Administrar Eventos</span>
                    {isOpenEvent ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
                </button>
                {isOpenEvent && (
                    <div className="p-6 space-y-4">
                    <Link href="dashboard/eventos/ver" className="block text-gray-900 hover:text-emerald-800 transition-colors duration-200">Ver Eventos</Link>
                    <Link href="dashboard/eventos/alta" className="block text-gray-900 hover:text-emerald-800 transition-colors duration-200">Crear Evento</Link>                            
                    </div>
                )}
            </div>
                
        </>  

    )
}
