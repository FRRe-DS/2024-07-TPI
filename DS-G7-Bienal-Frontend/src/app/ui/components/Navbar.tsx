"use client"

import {logout, User } from '@bienal/store/slices/userSlice';
import React from 'react';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import Button from './Button';
import bienalIcon from '@bienal/assets/bienal-icon.png'
import { AppDispatch, RootState } from '@bienal/store/store';
import { useDispatch, useSelector } from 'react-redux';
import RenderLinks from '@bienal/app/(modules)/auth/components/RenderLinksByRole';

import FetchUser from '@bienal/app/(modules)/auth/components/FetchUser';
import RenderLinksMobile from '@bienal/app/(modules)/auth/components/RenderLinksByRoleMobile';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    
}



const Navbar: React.FC<NavbarProps> = ({  }) => {
    const dispatch: AppDispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter();
    const role = useSelector((state:RootState) => state.user.user?.role)
    const isAuth = useSelector((state:RootState) => state.user.isAuth)
    const logoutHandle = () => {
        dispatch(logout())
        return router.push('/')
    }

    

    return (
        <FetchUser>

        
            <nav className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md fixed w-full z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Link className="flex-shrink-0" href='/'>
                                    <Image 
                                        src={bienalIcon}
                                        alt='bienal icon'
                                        width={130}
                                        height={50}
                                        className='bg-emerald-900 p-1 rounded-md'
                        
                                    />
                                </Link>
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <div className="hidden md:block">
                                    <Link
                                        href="/eventos"
                                        className="text-gray-800 hover:bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                                    >
                                        Eventos
                                    </Link>
                                    {
                                        role &&
                                        <RenderLinks userRole={role}/>
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                
                                {
                                    !isAuth?
                                    <Link className="text-gray-800 bg-gray-100 hover:text-emerald-900 px-3 py-2 rounded-md text-sm font-semibold transition duration-300" href='/auth/login'>Iniciar Sesion</Link>
                                    :
                                    <Button text='Cerrar Sesion' onClick={logoutHandle} />
                                }
                                    
                                    
                                
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                aria-expanded="false"
                                >
                                    <span className="sr-only">Abrir menú principal</span>
                                    {/* Icono de menú */}
                                    <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    {/* Icono de cerrar */}
                                    <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                        <Link href="/" className="text-gray-800 hover:bg-blue-100 hover:emerald-blue-900 block px-3 py-2 rounded-md text-base font-medium transition duration-300">Inicio</Link>
                        {
                            role ? <RenderLinksMobile userRole={role} /> : <Link href="/auth/login" className="text-gray-800 hover:bg-blue-100 hover:emerald-blue-900 block px-3 py-2 rounded-md text-base font-medium transition duration-300">Iniciar sesion</Link>

                        }
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                            <div className="px-2">
                            
                                {
                                    role&&
                                    <Button text='Cerrar Sesion' onClick={logoutHandle}/>
                                }
                                    
                            </div>
                        </div>
                    </div>
            </nav>
        </FetchUser>
    );
}

export default Navbar;