"use client";

import StoreProvider from '@bienal/app/StoreProvider';
import SculptorGuard from './SculptorGuard';
import BodySculptor from './components/BodySculptor';


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
      <StoreProvider>
            <SculptorGuard>
                <BodySculptor>
                  {children}
                </BodySculptor>
            </SculptorGuard>
      </StoreProvider>
      
  );
}