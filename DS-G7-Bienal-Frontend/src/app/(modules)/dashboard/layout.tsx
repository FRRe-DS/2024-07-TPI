"use client";

import BodyDashboard from './BodyDashboard';
import StoreProvider from '@bienal/app/StoreProvider';
import AdminGuard from './AdminGuard';


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
      <StoreProvider>
            <AdminGuard>
              <BodyDashboard>

                {children}
              </BodyDashboard>
          </AdminGuard>
      </StoreProvider>
      
  );
}