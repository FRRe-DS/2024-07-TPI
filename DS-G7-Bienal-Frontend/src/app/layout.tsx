import type { Metadata } from "next";
import "./globals.css";
import {inter} from "@bienal/app/fonts"


export const metadata: Metadata = {
  title: "Bienal App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}:Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        
      </body>
    </html>
  );
}
