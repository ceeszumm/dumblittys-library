import type { Metadata } from "next";
import { Inter, Courier_Prime, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-retro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-vintage",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dumblitty's Library | Personal Music Archive",
  description: "A personal music library showcasing original tracks with retro vintage street art vibes. Raw beats, no filters.",
  keywords: ["music", "audio", "dumblitty", "library", "street art", "hip hop", "original", "tracks", "retro", "vintage"],
  authors: [{ name: "Dumblitty" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Dumblitty's Library",
    description: "Personal music archive with retro street vibes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${courierPrime.variable} ${permanentMarker.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
