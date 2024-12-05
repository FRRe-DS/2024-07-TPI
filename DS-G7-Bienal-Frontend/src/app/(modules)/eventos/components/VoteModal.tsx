"use client"

import { RootState } from "@bienal/store/store";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";

export function VoteModal({sculptureName, sculptureId, closeModal, reFetch}: {sculptureName:string,sculptureId:number, closeModal:(event:React.MouseEvent)=>void, reFetch:()=>void}){

    const [msg, setMsg] = useState<string | null>(null)
    const isAuth = useSelector((state:RootState) => state.user.isAuth)
    const handleCloseModal = (event:React.MouseEvent) => {
        event.stopPropagation()
        closeModal(event)
        
    }
    const [rating, setRating] = useState<number>(0)
    const [enable, setEnable] = useState<boolean>(false)
    const [canVote, setCanVote] = useState<boolean>(false)

    useEffect(() => {
        const canVote = async () => {
            try {
                const token = localStorage.getItem('accessToken')
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}votes/can-vote/${sculptureId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                console.log(sculptureId)
    
                if (res.status===200){
                    setCanVote(true)
                } else {
                    setCanVote(false)
                }
            }   catch (error: any) {
                console.log(sculptureId)
                setCanVote(false)
            }
        }

        canVote()
    })

    const submitVote = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}votes/vote/`,{
                calification:rating,
                id_sculpture:sculptureId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            console.log(res)

            if (res.status===201){
                setMsg("Voto enviado")
                setEnable(false)
            } else {
                setMsg("Error al votar")
                setEnable(false)
            }
        }   catch (error: any) {
            console.log(error)
            setMsg("Error")
            setEnable(false)
        }
    }

    const handleRatingChange = (newRating: number) => {
        console.log(newRating)
        if(newRating>0 && newRating <= 5) {
            setEnable(true)
        } else {
            setEnable(false)
        }
        setRating(newRating);
    };



    const onClickSubmit = async () => {
        console.log("Asdasdasdsa")
        await submitVote()
        reFetch()
        
    }

    return(
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                {
                    isAuth?
                    <>
                        <h3 className="text-lg font-semibold text-center text-gray-900">Califica a {sculptureName}</h3>
                        <div className="flex my-2 items-center flex-col">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#ffd700"
                                changeRating={handleRatingChange}
                                numberOfStars={5}
                                name="rating"
                                starDimension="30px"
                                starSpacing="5px"
                            />
                        </div>
                        {
                            canVote?
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
                                <div className="mt-4 flex justify-center w-full items-center gap-x-4">
                                    
                                    <button disabled={!enable} onClick={onClickSubmit} className={`${enable? "bg-green-600 hover:bg-green-700 text-white font-semibold":"bg-gray-300 text-gray-700 font-semibold"}mx-2 w-1/3 text-center px-4 py-2  rounded  transition-colors duration-200`} >
                                        Enviar
                                    </button>
                                    <span className="text-gray-700 font-semibold hover:text-gray-800" onClick={handleCloseModal}>Cancelar</span>
                                </div>
                                </>
                            }
                            </div>
                            :
                            <div className="flex mt-4 flex-col justify-center items-center">
                            <p className="text-center text-sm text-gray-900">Ya voto en esta escultura</p>
                            <button onClick={handleCloseModal} className="mx-2 mt-4 w-1/3 text-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors duration-200">
                                Cerrar
                            </button>
                            </div>
                        }
                
                        <div className="mt-4">
                            {
                                msg&&<p className="text-center text-sm text-gray-900">{msg}</p>
                            }
                        </div>
                    </>
                    :
                    <>
                        <h3 className="text-lg font-semibold text-center text-gray-900">Para votar debes iniciar sesion</h3>
                        <div className="flex my-2 items-center flex-col">
                            <Link className="text-emerald-700 font-bold hover:text-emerald-800" href={'/auth/login'}>Iniciar sesion</Link>

                            <span className="text-gray-700 font-semibold hover:text-gray-800" onClick={handleCloseModal}>Cancelar</span>

                        </div>
                    </>
                }
                
            </div>
        </div>
    )
}