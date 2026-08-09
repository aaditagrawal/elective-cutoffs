import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
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
  description:
    "Compare MIT Manipal elective CGPA cutoffs across VI and VII semester allocation datasets.",
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
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="font-sans antialiased">
        <header className="border-b border-white/5 bg-neutral-950 z-50">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-serif text-white">
              Elective Cutoffs
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
