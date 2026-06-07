import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//@ts-ignore
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import ThemeContex from "@/components/Theme-Contex";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Create your own company and jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


      <ThemeContex >

        {/* <NavBar /> */}
        {/* <div className="h-20"></div> */}
        {children}
      </ThemeContex>
      </body>
    </html>
  );
}
