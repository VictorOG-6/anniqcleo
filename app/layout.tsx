import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/lib/provider";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
        "h-full scroll-smooth",
        "antialiased",
        plusJakartaSans.variable,
        cormorant.variable,
        "font-sans",
      )}
    >
      <body
        className={cn(
          plusJakartaSans.variable,
          cormorant.variable,
          "antialiased flex min-h-full flex-col items-center",
        )}
      >
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
