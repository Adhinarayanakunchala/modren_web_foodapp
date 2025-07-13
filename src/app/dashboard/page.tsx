"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  ShoppingCart, 
  Heart, 
  Clock, 
  Package, 
  CreditCard, 
  User,
  Star,
  TrendingUp,
  Gift
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ProductCard"
import { useRecentOrdersData, useRecommendedProducts, useUserStats } from "@/store/hooks"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = React.useState<any>(null)
  const recentOrders = useRecentOrdersData()
  const recommendedProducts = useRecommendedProducts()
  const userStats = useUserStats()

  React.useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const breadcrumbItems = [
    { title: "Dashboard", icon: <User className="w-4 h-4" /> }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to access your dashboard</h1>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-green-100">Ready to discover fresh groceries today?</p>
              </div>
              <div className="hidden md:flex items-center">
                <Gift className="h-12 w-12 text-green-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">{userStats.totalOrders}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Wishlist Items</p>
                    <p className="text-2xl font-bold">{userStats.wishlistCount}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Savings</p>
                    <p className="text-2xl font-bold">${userStats.totalSavings}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Loyalty Points</p>
                    <p className="text-2xl font-bold">{userStats.loyaltyPoints}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump to your frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/shop">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    Shop Now
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/orders">
                    <Package className="h-6 w-6 mb-2" />
                    My Orders
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/wishlist">
                    <Heart className="h-6 w-6 mb-2" />
                    Wishlist
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/cart">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    Cart
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/profile">
                    <User className="h-6 w-6 mb-2" />
                    Profile
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-col h-20">
                  <Link href="/payments">
                    <CreditCard className="h-6 w-6 mb-2" />
                    Payments
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link href="/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.slice(0, 3).map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your previous purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}