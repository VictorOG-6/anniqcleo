import type { Metadata } from "next";
import { Roboto, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
  description:
    "At Anniqcleo, we believe in the power of nature to nurture and restore your skin. Our products are crafted with the purest organic ingredients, harnessing the gifts of the earth to create a radiant, healthy glow for your skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        roboto.variable,
        inter.variable,
        "font-sans",
        robotoMono.variable,
      )}
    >
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${inter.variable} antialiased flex flex-col items-center`}
      >
        {children}
      </body>
    </html>
  );
}
