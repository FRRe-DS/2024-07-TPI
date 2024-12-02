"use client";

import { useSelector } from 'react-redux';
import store, { RootState } from "@bienal/store/store";
import { UserCircle } from 'lucide-react';
import Navbar from '@bienal/app/ui/components/Navbar';
import Button from '@bienal/app/ui/components/Button';
import { useRouter } from 'next/navigation';


export default function BodySculptor({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user);

  const redirectAlta = () => {
    return router.push('/obras/alta')
  }
  return (
    
    <>
      <Navbar/>
      <main className="pt-20">
          <div className="min-h-screen bg-white p-8">
              <header className="mb-10">
              <div className="flex items-center w-full">
                  <div className="flex items-center justify-between w-full">
                      <span>

                        <UserCircle className="h-8 w-8 text-emerald-800 mr-4" />
                        <div>
                          <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
                          <p className="text-md text-emerald-800">{user?.role}</p>
                        </div>
                      </span>
                      <span>

                        <Button onClick={redirectAlta} text='Nueva Escultura'/>
                      </span>

                      
                  </div>
              </div>
              </header> 
              <h2 className="text-2xl font-semibold text-gray-900 m-6 text-center">Dashboard</h2>
              {children}

          </div>
      </main>
    </>
      
  );
}