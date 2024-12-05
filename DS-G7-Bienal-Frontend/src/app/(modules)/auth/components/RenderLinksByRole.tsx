import React from 'react'
import Link from 'next/link'


interface RenderLinksProps {
    
    userRole: 'ESCULTOR' | 'ADMIN' | 'VISITANTE' ; 
    
}

const RenderLinks: React.FC<RenderLinksProps> = ({
    
    userRole, 
    
}) => {
    const links = {
        ESCULTOR: [
            { href: '/profile', label: 'Perfil' },
            { href: '/obras', label: 'Mis Obras' },
        ],
        ADMIN: [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard/escultores/ver', label: 'Escultores' },
        ],
        VISITANTE: [
            { href: '/contact', label: 'Votaciones' },
        ],
    };

    return (
        <>
            {links[userRole]?.map((link, index) => (
                <Link key={index} href={link.href}  className="text-gray-800 hover:bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300">{link.label} </Link>
            ))}
        
        </>
    );
};

export default RenderLinks;