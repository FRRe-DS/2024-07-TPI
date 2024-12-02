"use client"

import { AbsUser } from "@bienal/store/slices/userSlice"
import axios from "axios";
import { useState } from "react";

export function UpgradeModal({user, closeModal, reFetch}: {user:AbsUser, closeModal:()=>void, reFetch:()=>void}){

    const [msg, setMsg] = useState<string | null>(null)

    const handleCloseModal = () => {
        closeModal()
        reFetch()
    }

    const submitUpgrade = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/upgrade/${user.id}`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            return res.data.payload.message
        }   catch (error: any) {
            
            return 'Error'
        }
    }

    const onClickSubmit = async () => {
        console.log(user)
        const response = await submitUpgrade()
        console.log(response)
        setMsg(response)
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold text-center text-gray-900">¿Seguro que desea hacer escultor a el usuario {user.name}, {user.lastname}?</h3>
                <div className="flex my-2 items-center flex-col">
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">DNI: {user.dni}</p>
                    <p className="text-sm text-gray-600">{user.phoneNumber}</p>
                </div>
                <div className="flex justify-center">
                    {
                        msg?
                        <>
                            <button onClick={handleCloseModal} className="mx-2 w-1/3 text-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors duration-200">
                                Cerrar
                            </button>
                        </>
                        :
                        <>
                            <button onClick={onClickSubmit} className="mx-2 w-1/3 text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200">
                                Confirmar
                            </button>
                            <button onClick={closeModal} className="mx-2 w-1/3 text-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200">
                                Cancelar
                            </button>
                        </>
                    }
                </div>
                <div className="mt-4">
                    {
                        msg&&<p className="text-center text-sm text-gray-900">{msg}</p>
                    }
                </div>
            </div>
        </div>
    )
}