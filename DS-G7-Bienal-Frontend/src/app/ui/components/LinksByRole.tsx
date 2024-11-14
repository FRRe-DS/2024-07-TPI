import React from 'react'
import Link from 'next/link'
import { Home, ShoppingBag, Users, BarChart2, Settings, Menu } from 'lucide-react'

interface SidebarProps {
    userName: string;
    userRole: string;
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarMenu: React.FC<SidebarProps> =({
    userName,
    userRole,
    isOpen,
    toggleSidebar,
}) => {

    return (
        <div className="ml-10 flex items-baseline space-x-4">
            <Link href="/" className="text-gray-800 hover:bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Enlace 1</Link>
            <Link href="/" className="text-gray-800 hover:bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Enlace 2</Link>
            <Link href="/" className="text-gray-800 hover:bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Enlace 3</Link>
        </div>
    )
}