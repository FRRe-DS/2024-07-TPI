"use client";

import { useSelector } from 'react-redux';
import  { RootState } from "@bienal/store/store";
import { UserCircle } from 'lucide-react';
import Navbar from '@bienal/app/ui/components/Navbar';


export default function BodyDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = useSelector((state: RootState) => state.user.user);

  return (
    
    <>
        <Navbar/>
        <main className="pt-20">
            <div className="min-h-screen bg-white p-8">
                <header className="mb-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <UserCircle className="h-8 w-8 text-emerald-800 mr-4" />
                        <div>
                        <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
                        <p className="text-md text-emerald-800">{user?.role}</p>
                        </div>
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