"use client";

import StoreProvider from '@bienal/app/StoreProvider';
import FetchUser from '../auth/components/FetchUser';


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <StoreProvider>
      <FetchUser>

        {children}
      </FetchUser>
    </StoreProvider>
      
  );
}