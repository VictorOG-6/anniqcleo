import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anniqcleo",
  description: "At Anniqcleo, we believe in the power of nature to nurture and restore your skin. Our products are crafted with the purest organic ingredients, harnessing the gifts of the earth to create a radiant, healthy glow for your skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${inter.variable} h-full antialiased`}
    >
      <body className={`${roboto.variable} antialiased flex flex-col items-center`}>{children}</body>
    </html>
  );
}
