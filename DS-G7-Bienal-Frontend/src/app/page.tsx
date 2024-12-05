import Image from "next/image";
import FetchUser from "./(modules)/auth/components/FetchUser";
import StoreProvider from "./StoreProvider";
import Navbar from "./ui/components/Navbar";
import bienalPhoto from "../assets/bienal.jpg"
import { Evento } from "./types/eventosType";
import { EventList } from "./(modules)/eventos/components/EventList";


export default async function Home() { 
  const  fetchEvents = async() => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}event/list`, {
        cache: "no-store"
      });
    
      return await res.json()

    } catch(error) {
      return []
    }
  }
  const data = await fetchEvents()
  
  const eventos: Evento[] = data?.payload?.events || [];
  

  return (
    <>
      <StoreProvider>
        
        <Navbar/>
        
      </StoreProvider>
        <main className="bg-gradient-to-r from-white to-gray-100">
          <section className="mt-15">
            <header className="flex justify-between items-center flex-wrap">
              <h1 className="md:text-6xl text-4xl text-emerald-800 mt-20 ml-10 font-bold">Bienal de esculturas, Chaco</h1>
              <Image alt="bienal" className="" width={550} height={550} src={bienalPhoto} />
            </header>
          </section>
          <section>
            <EventList
              events={eventos}
              search="todos"
            />
          </section>

        </main>
    </>

  )
}
