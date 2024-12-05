"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavbarSkeleton from '@bienal/app/ui/skeletons/NavbarSkeleton';
import axios from 'axios';


export default function FetchUser({children,}: Readonly<{children: React.ReactNode;}>) {
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    
    
    useEffect(() => {
        async function getRole() {
            let accessToken = localStorage.getItem('accessToken');
            if (!accessToken){
                return router.push('/')
            };
            try {
                setLoading(true)
                
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}` 
                    }
                });
                console.log(response)
                
                const role = response.data.role 
                if (role !=='ADMIN'){
                    return router.push('/')
                };

                setLoading(false)
            } catch (error: any) {
                setLoading(false)
                return router.push('/')
            }
        }

        getRole()

        
    }, []);

    if (loading) {
        return <NavbarSkeleton/>; 
    }

    return <>{children}</>;
};

