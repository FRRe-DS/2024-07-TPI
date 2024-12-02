"use client"

import { Tematic } from "@bienal/app/types/tematicType";
import FilterTematicSkeleton from "@bienal/app/ui/skeletons/FilterTematicSkeleton";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [tematicas, setTematicas] = useState<Tematic[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const getTematics = async() => {
            setLoading(true)
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}tematic/list`)
                
                setTematicas(res.data.payload )   
            } catch (error:any){
                setTematicas([])
            } finally {
                setLoading(false)
            }
        }
        
        getTematics()
    },[])

    const selectedEvent = searchParams.get('event') || '';

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('event', term);
        } else {
            params.delete('event');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    /*const tematicas = [
        'Escultura en piedra',
        'Escultura en madera',
        'Escultura en arena'
    ];*/

    return (
        
            loading ?
            (
                <FilterTematicSkeleton/>
            )
            :
            (
                <div className="flex mx-5 space-x-20">
                    {tematicas.map((tem, index) => (
                        <p
                        onClick={() => handleSearch(tem.name)}
                            key={index}
                            className={`cursor-pointer text-sm font-medium text-emerald-600 ${
                                selectedEvent === tem.name ? 'bg-emerald-100 border-solid border-2 border-emerald-600' : 'bg-gray-100 border-solid border-2 border-gray-200'
                            } inline-block px-2 py-1 rounded`}
                        >
                            {tem.name}
                        </p>
                    ))}
                    <p
                        onClick={() => handleSearch('todos')}
                        
                        className={`cursor-pointer text-sm font-medium text-emerald-600 ${
                            selectedEvent === 'todos' ? 'bg-emerald-100 border-solid border-2 border-emerald-600' : 'bg-gray-100 border-solid border-2 border-gray-200'
                    } inline-block px-2 py-1 rounded`}
                    >
                        Todos
                    </p>
                </div>
            )
    
        
    );
}
