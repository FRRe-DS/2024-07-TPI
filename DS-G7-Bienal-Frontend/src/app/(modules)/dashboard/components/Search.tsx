"use client"

import Input from "@bienal/app/ui/components/Input";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Search(){
    const searchParams =useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const handleSearch = (term:string) => {
        const params = new URLSearchParams(searchParams)
        if (term){
            params.set('search', term)
        } else {
            params.delete('search')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Input 
            label="Buscar usuario" 
            id="search" 
            onChange={(event) => handleSearch(event.target.value)}
            defaultValue={searchParams.get('search')?.toString()}
        />
    )
}