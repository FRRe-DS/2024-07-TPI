"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

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

    const tematicas = [
        'Escultura en piedra',
        'Escultura en madera',
        'Escultura en arena'
    ];

    return (
        <div className="flex mx-5 space-x-20">
            {tematicas.map((tem, index) => (
                <p
                    onClick={() => handleSearch(tem)}
                    key={index}
                    className={`cursor-pointer text-sm font-medium text-emerald-600 ${
                        selectedEvent === tem ? 'bg-emerald-100 border-solid border-2 border-emerald-600' : 'bg-gray-100 border-solid border-2 border-gray-200'
                    } inline-block px-2 py-1 rounded`}
                >
                    {tem}
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
    );
}
