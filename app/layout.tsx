import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tano Pedia · Platform Digital",
  description: "Akses Apps Premium, Harga Bikin Senyum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Menyisipkan Font Awesome Asli */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        {/* Menyisipkan Font Inter Asli */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-['Inter',_sans-serif] bg-[#f3f0fa] text-[#1a1a2e] min-h-screen pb-[94px]">
        {children}
      </body>
    </html>
  );
}
