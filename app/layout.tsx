import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import { InquiryProvider } from '@/components/ui/InquiryContext';

export const metadata: Metadata = {
  title: 'Aurelle Studio — Interiors of Quiet, Lasting Luxury',
  description:
    'Aurelle Studio shapes calm, considered interiors and architectural residences where natural materials, soft light and precise detailing come together.',
  keywords: [
    'Interior Design',
    'Luxury Architecture',
    'Quiet Luxury',
    'Residential Design',
    'Bespoke Interiors',
    'Minimalist Architecture',
    'Aurelle Studio',
  ],
  authors: [{ name: 'Aurelle Studio' }],
  openGraph: {
    title: 'Aurelle Studio — Interiors of Quiet, Lasting Luxury',
    description:
      'We shape calm, considered interiors where natural materials, soft light and precise detailing come together for spaces that feel effortless to live in.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Aurelle Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurelle Studio — Interiors of Quiet, Lasting Luxury',
    description:
      'We shape calm, considered interiors where natural materials, soft light and precise detailing come together for spaces that feel effortless to live in.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#EAE8E0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#EAE8E0] text-[#303030] font-body min-h-screen selection:bg-[#DE6800] selection:text-white">
        <SmoothScroll>
          <InquiryProvider>
            <CustomCursor />
            {children}
          </InquiryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
