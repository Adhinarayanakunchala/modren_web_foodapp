"use client"

import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Truck, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"
import { useCategories, useFeaturedProducts, usePopularProducts } from "@/store/hooks"

export default function Home() {
  const categories = useCategories()
  const featuredProducts = useFeaturedProducts()
  const popularProducts = usePopularProducts()

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover fresh, quality products across all your favorite categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked favorites and best deals
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Products
            </h2>
            <p className="text-gray-600">
              Customer favorites and trending items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FreshStore?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing the best shopping experience with quality products and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Fast Delivery</CardTitle>
                  <CardDescription>
                    Get your groceries delivered in as little as 30 minutes
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Quality Guarantee</CardTitle>
                  <CardDescription>
                    100% fresh products with our quality guarantee
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>24/7 Support</CardTitle>
                  <CardDescription>
                    Round-the-clock customer support for your convenience
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Best Prices</CardTitle>
                  <CardDescription>
                    Competitive prices with regular deals and discounts
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
