"use client";

import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@bienal/store/store';
import { ReactNode, useEffect, useState } from 'react';
import NavbarSkeleton from '@bienal/app/ui/skeletons/NavbarSkeleton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UserState } from '@bienal/store/slices/userSlice';


export default function SculptorGuard({children,}: Readonly<{children: React.ReactNode;}>) {
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    const user = useSelector((state:UserState) => state.user)

    useEffect(() => {
        async function getRole() {
            try {
                setLoading(true)
                let accessToken = localStorage.getItem('accessToken');
                
                if (!accessToken){
                    return router.push('/')
                };
    
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}` 
                    }
                });
                
                const role =response.data.role 
                if (role !=='ESCULTOR'){
                    return router.push('/')
                };

                
            } catch (error: any) {
                 
                
            } finally{
                setLoading(false)
            }
        }

        getRole()

        
    }, []);

    if (user && user.role === 'ESCULTOR' ) {
        return <NavbarSkeleton/>; 
    }

    return <>{children}</>;
};

