"use client"

import { motion } from "framer-motion"
import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { CategoryMarquee, ReviewMarquee, HotelMarquee } from "@/components/ui/marquee"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Truck, Shield, Clock, ArrowRight } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { RootState } from "@/store"
import { categoryMarqueeData, reviews, hotels } from "@/data/dummy-data"
import { useMeta, metaConfigs } from "@/lib/use-meta"
import { Product } from "@/types"
import Link from "next/link"

export default function HomePage() {
  const { products } = useAppSelector((state: RootState) => state.products)
  
  // Set dynamic meta tags for home page
  useMeta(metaConfigs.home)
  
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8)
  
  // Get popular products (products with high ratings)
  const popularProducts = products
    .filter((product: Product) => product.rating >= 4.5)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Categories Marquee */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Discover fresh products across all your favorite categories
            </p>
          </motion.div>
          <CategoryMarquee categories={categoryMarqueeData} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-lg text-muted-foreground">
                Handpicked selections of our finest products
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: Product, index: number) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/products">
              <Button className="w-full">
                View All Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Products</h2>
            <p className="text-lg text-muted-foreground">
              Customer favorites with excellent ratings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product: Product, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreshStore?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering the freshest products with exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center h-full hover-lift beam-effect">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Fast Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get your groceries delivered in as little as 30 minutes with our express delivery service.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center h-full hover-lift beam-effect">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Quality Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We guarantee the freshness and quality of every product with our 100% satisfaction promise.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center h-full hover-lift beam-effect">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Free Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Enjoy free delivery on orders over $50. No hidden fees, no surprise charges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Marquee */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Real reviews from real customers who love FreshStore
            </p>
          </motion.div>
          <ReviewMarquee reviews={reviews} />
        </div>
      </section>

      {/* Hotels Marquee (Partner Locations) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner Locations</h2>
            <p className="text-lg text-muted-foreground">
              Find FreshStore pickup points at premium partner locations
            </p>
          </motion.div>
          <HotelMarquee hotels={hotels} />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Fresh with Us</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest deals, seasonal products, and exclusive offers delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background"
              />
              <Button className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Join over 50,000 happy customers. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
