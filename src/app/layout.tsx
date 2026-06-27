import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAM — Visit Anatolia and Mesopotamia",
  description: "Doğu Anadolu ve Mezopotamya'nın kadim toprakları için kültürel turizm platformu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
