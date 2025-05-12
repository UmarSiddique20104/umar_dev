import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { LoadingProvider } from "@/contexts/LoadingContext";
import CookieConsent from "@/components/CookieConsent";

// Import Glide.js styles directly (Next.js will optimize these)
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

const inter = Inter({ subsets: ['latin'] });

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Full Stack Engineer | React & Next.js Expert',
  description: 'Full Stack Developer in Lahore, Pakistan. Expert in React.js, Next.js, Node.js, TypeScript & Modern Web Development. 3+ years experience building high-performance web applications. Hire professional web developer today!',
  keywords: 'web developer lahore, full stack developer pakistan, react developer lahore, nextjs developer, typescript expert, frontend developer pakistan, backend developer lahore, mern stack developer, javascript programmer, software engineer lahore, web application developer, react.js expert pakistan, node.js developer lahore, web consultant pakistan, ecommerce developer',
  openGraph: {
    title: 'Top Rated Web Developer Lahore | Full Stack Engineer | React & Next.js Expert',
    description: 'Elite Full Stack Developer in Lahore, Pakistan. Expert in React.js, Next.js, Node.js, TypeScript & Modern Web Development. Delivering high-performance web solutions.',
    url: 'https://www.umarxdev.me',
    siteName: "Umar's Professional Portfolio",
    images: [
      {
        url: 'https://www.umarxdev.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Umar Shafique- Web Developer & Full Stack Engineer Lahore',
      }
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Developer Lahore | Full Stack Engineer | React & Next.js Expert',
    description: 'Full Stack Developer specializing in modern web technologies. Building scalable solutions in Pakistan.',
    images: ['https://www.umarxdev.me/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.umarxdev.me',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    },
  },
  verification: {
    google: 'your-google-verification-id',
  },
  authors: [
    { name: 'Umar - Professional Web Developer' }
  ],
  creator: 'Umar - Full Stack Python Developer',
  publisher: 'Umar Shafique Technologies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for geo location */}
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Lahore, Pakistan" />
        <meta name="geo.position" content="31.5204;74.3587" />
        <meta name="ICBM" content="31.5204, 74.3587" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <Navbar />
            {children}
            <CookieConsent />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
