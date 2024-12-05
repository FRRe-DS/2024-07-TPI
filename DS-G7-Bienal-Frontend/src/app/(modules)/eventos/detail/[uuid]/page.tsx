import StoreProvider from "@bienal/app/StoreProvider";
import Navbar from "@bienal/app/ui/components/Navbar";
import { EventDetail } from "../../components/EventDetail";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function Page({ params }: Props){

    const { uuid } = params;



    return (
      <>
        <StoreProvider>
            <Navbar/>
        </StoreProvider>
    
        <main className="flex w-full">
        
        
          <section className="mt-20 w-full">
            <EventDetail uuid={uuid}/>
            
          </section>
        </main>
      </>
    )
}