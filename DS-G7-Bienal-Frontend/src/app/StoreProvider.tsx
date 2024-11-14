"use client";

import { Provider } from 'react-redux';
import store from "@bienal/store/store";
import AuthGuard from "@bienal/app/(modules)/auth/components/FetchUser"


export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children} 
    </Provider>
  );
}