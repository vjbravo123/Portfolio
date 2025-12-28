// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const domain = "https://techhportfolio.netlify.app";
const ogImage = `${domain}/vj2.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: {
    default: "Vivek Joshi — Full Stack MERN Developer",
    template: "%s | Vivek Joshi",
  },

  description:
    "Vivek Joshi — Full Stack MERN Developer skilled in React, Node.js, MongoDB, Next.js & Tailwind CSS. Based in Ghaziabad, India.",
  keywords: [
    "Full Stack MERN Developer",
    "React.js Developer",
    "Next.js Developer",
    "Portfolio Developer",
    "Full Stack Developer Ghaziabad",
    "React Developer Noida",
    "Freelance MERN Developer",
    "JavaScript & TypeScript Developer",
  ],
  alternates: { canonical: domain },
  authors: [{ name: "Vivek Joshi" }],
  creator: "Vivek Joshi",
  publisher: "Vivek Joshi",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: domain,
    siteName: "Vivek Joshi Portfolio",
    title: "Vivek Joshi — Full Stack MERN Developer",
    description: "Building production-grade web apps with MERN & Next.js.",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vivekjoshi",
    creator: "@vivekjoshi",
    title: "Vivek Joshi | Full Stack Developer",
    description: "MERN Stack Developer & Next.js Enthusiast — Building scalable web apps.",
    images: [ogImage],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" href={domain} hrefLang="en" />

        {/* Publish + Modified SEO */}
        <meta name="date" content="2025-01-01" />
        <meta name="last-modified" content="2025-01-01" />

        {/* OG Update Time */}
        <meta property="og:updated_time" content="2025-01-01T00:00:00Z" />

        {/* Schema.org JSON */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Vivek Joshi",
                jobTitle: "Full Stack MERN Developer",
                url: domain,
                image: ogImage,
                sameAs: [
                  "https://github.com/vjbravo123",
                  "https://linkedin.com/in/vivek-joshi0101"
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Vivek Joshi Portfolio",
                url: domain,
                potentialAction: {
                  "@type": "SearchAction",
                  target: `${domain}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Vivek Joshi",
                url: domain,
                logo: ogImage,
              },
            ]),
          }}
        />
      </head>

      <body
        className={`${inter.className} bg-[#020617] text-white antialiased selection:bg-blue-500/30 overflow-x-hidden`}
      >
        <main className="relative min-h-screen pb-32 lg:pb-20">{children}</main>
        <BottomNav />

        {/* Chatbase Widget */}
        <Script id="chatbase-config" strategy="afterInteractive">
          {`
            window.chatbaseConfig = {
              chatbotId: "tRRteUqTyrj8-iVDcOevU",
              domain: "www.chatbase.co"
            };
          `}
        </Script>
        <Script
          src="https://www.chatbase.co/embed.min.js"
          id="tRRteUqTyrj8-iVDcOevU"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
