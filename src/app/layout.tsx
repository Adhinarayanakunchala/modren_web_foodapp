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
  title: "FreshStore - Fresh Groceries Delivered Fast",
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
