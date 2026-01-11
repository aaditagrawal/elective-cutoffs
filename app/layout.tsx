import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif"
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Elective Cutoff Analysis | MIT Manipal",
  description: "Explore CGPA cutoffs for Open Electives and Program Electives at MIT Manipal. Find the right courses based on your CGPA.",
  keywords: ["MIT Manipal", "electives", "cutoff", "CGPA", "PE", "OE", "course selection"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} dark`}>
      <body
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
