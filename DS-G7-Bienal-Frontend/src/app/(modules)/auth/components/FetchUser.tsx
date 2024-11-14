"use client";

import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { AppDispatch, RootState } from '@bienal/store/store';
import { ReactNode, useEffect, useState } from 'react';
import { fetchUserByToken } from '@bienal/store/slices/userSlice';
import NavbarSkeleton from '@bienal/app/ui/skeletons/NavbarSkeleton';

interface AuthGuardProps {
  children: ReactNode;
}

export default function FetchUser({children,}: Readonly<{children: React.ReactNode;}>) {
    const [loading, setLoading] = useState(true); 
    const user = useSelector((state: RootState) => state.user.user);
    //const router = useRouter();
    //const pathname = usePathname();

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        //const unprotectedRoutes = ["/auth/login", "/auth/register"];
        //const pathIsProtected = !unprotectedRoutes.includes(pathname);

        const checkUser = async () => {
        if (!user) {
            await dispatch(fetchUserByToken());
        }
        setLoading(false); 
        };

        checkUser();

        
       { /*if (!loading && pathIsProtected && !user) {
        router.push("/auth/login");
        } else if (pathname === "/" && user?.role === "ADMIN") {
        router.push("/dashboard");
        }*/ }
    }, []);

    if (loading) {
        return <NavbarSkeleton/>; 
    }

    return <>{children}</>;
};

