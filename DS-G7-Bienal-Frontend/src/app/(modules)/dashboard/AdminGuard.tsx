"use client";

import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@bienal/store/store';
import { ReactNode, useEffect, useState } from 'react';
import { fetchUserByToken } from '@bienal/store/slices/userSlice';
import NavbarSkeleton from '@bienal/app/ui/skeletons/NavbarSkeleton';
import axios from 'axios';

interface AuthGuardProps {
  children: ReactNode;
}

export default function FetchUser({children,}: Readonly<{children: React.ReactNode;}>) {
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    //const dispatch: AppDispatch = useDispatch();

    
    
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
                if (role !=='ADMIN'){
                    return router.push('/')
                };

                setLoading(false)
            } catch (error: any) {
                 
                setLoading(false)
            }
        }

        getRole()

        
    }, []);

    if (loading) {
        return <NavbarSkeleton/>; 
    }

    return <>{children}</>;
};

