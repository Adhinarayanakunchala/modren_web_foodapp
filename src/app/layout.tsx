import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Header } from "@/components/Header"
import { ReduxProvider } from "@/store/provider"
import { DataInitializer } from "@/store/DataInitializer"
import { Toaster } from "@/components/ui/toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FreshStore - Fresh Groceries Delivered Fast",
    template: "%s | FreshStore"
  },
  description: "Get farm-fresh produce, quality meats, and pantry essentials delivered to your door in as little as 30 minutes. Shop now for the best deals on groceries!",
  keywords: ["groceries", "fresh produce", "online shopping", "food delivery", "organic", "meat", "dairy", "pantry"],
  authors: [{ name: "FreshStore Team" }],
  creator: "FreshStore",
  publisher: "FreshStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://freshstore.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#10B981" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "FreshStore - Fresh Groceries Delivered Fast",
    description: "Get farm-fresh produce, quality meats, and pantry essentials delivered to your door in as little as 30 minutes.",
    url: "https://freshstore.com",
    siteName: "FreshStore",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FreshStore - Fresh Groceries Delivered Fast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreshStore - Fresh Groceries Delivered Fast",
    description: "Get farm-fresh produce, quality meats, and pantry essentials delivered to your door in as little as 30 minutes.",
    images: ["/og-image.jpg"],
    creator: "@freshstore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  category: "e-commerce",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#10B981" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          themes={[
            "light",
            "dark", 
            "system",
            "theme-green",
            "theme-professional",
            "theme-purple", 
            "theme-rose"
          ]}
        >
          <ReduxProvider>
            <DataInitializer />
            <div className="min-h-screen bg-background transition-all duration-300">
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
