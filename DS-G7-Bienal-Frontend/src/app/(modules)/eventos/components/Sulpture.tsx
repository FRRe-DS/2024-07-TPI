'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Sculpture } from '@bienal/app/types/scultureType'
import Button from '@bienal/app/ui/components/Button'
import { VoteModal } from './VoteModal'
import axios from 'axios'
import StarRatings from 'react-star-ratings'
import StoreProvider from '@bienal/app/StoreProvider'
import Link from 'next/link'



export default function SculptureCard({ sculpture }: { sculpture: Sculpture }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [reFetch, setReFetch] = useState<boolean>(false)

  const handleReFetch = () => {
    setReFetch(!reFetch)
  }

  const [votes, setVotes] = useState<number>(0)
  const [average, setAvegare] = useState<number>(0)

  const handleModal = (event: React.MouseEvent) =>{
    event.stopPropagation();
    setOpenModal(!openModal)
  }

  const handleCloseModal = () =>{
    
    setOpenModal(false)
  }
  
  const getStatsVote = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}votes/stats/${sculpture.id}`);
      
      const data = await res.data.payload

      setVotes(data.count)
      setAvegare(data.average)
      
    }catch (error: any) {
      setVotes(0)
      setAvegare(0)
    }
  }

  useEffect(() => {

    getStatsVote()
  },[reFetch])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === sculpture.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? sculpture.images.length - 1 : prevIndex - 1
    )
  }

  return (
    
    <div className="max-w-sm w-full m-8 cursor-pointer hover:shadow-xl rounded overflow-hidden shadow-lg bg-white">
      <Link href={`/sculpture/${sculpture.uuid}`}>
      <div className="relative h-64">
        {sculpture.images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`${sculpture.name} - Imagen ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            />
        ))}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      </Link>

      <div className="px-6 py-4">
        <Link href={`/sculpture/${sculpture.uuid}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-bold text-xl text-emerald-800 mb-1">{sculpture.name}</h2>
            <p className="text-gray-600 text-sm">
              por {sculpture.sculptor.name} {sculpture.sculptor.lastname}
            </p>
          </div>
          {sculpture.images[0] && (
            <img
                src={sculpture.images[0].url}
                alt="QR Code"
                className="w-12 h-12 rounded"
            />
          )}
        </div>
        <p className="text-gray-700 text-base mb-2">{sculpture.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          Creado el: {new Date(sculpture.createdAt).toLocaleDateString()}
        </p>
        <span className="flex justify-start items-center text-sm text-gray-500 mb-4">
          <p className='mr-4'>{votes} {votes === 1? 'Voto': 'Votos'}</p> 
          <StarRatings
            rating={average}
            starRatedColor="gold"
            starEmptyColor="gray"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
          />
        </span>
        </Link>
        
        <Button
          onClick={(e) => handleModal(e)}
          text='Votar'
        />
        
        
      </div>
      { 
        <StoreProvider>
          {openModal&&<VoteModal reFetch={handleReFetch} closeModal={(e) => handleModal(e)} sculptureId={sculpture.id} sculptureName={sculpture.name}/>}
        </StoreProvider>
      }
    </div>
  )
}