"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BeamsEffect } from "@/components/ui/beams-effect"
import { AuthModal } from "@/components/auth/AuthModal"
import { motion } from "framer-motion"
import { ShoppingCart, Truck, Star, Clock, User, LogIn } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [authModalOpen, setAuthModalOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (user) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
  }

  const handleSignup = () => {
    setAuthMode("signup")
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    window.location.reload() // Refresh to update the entire app
  }

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20 overflow-hidden">
      {/* Beams Effect */}
      <BeamsEffect />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-4 transform rotate-12 scale-150">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="aspect-square bg-primary rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="mb-4">
              🎉 New customers get 20% off their first order
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Fresh Groceries
            <br />
            <span className="text-primary">Delivered Fast</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Get farm-fresh produce, quality meats, and pantry essentials delivered to your door in as little as 30 minutes.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            {isLoggedIn ? (
              <>
                <Button
                  asChild
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/shop">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/dashboard">
                    <User className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleLogin}
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
                <Button
                  onClick={handleSignup}
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <User className="mr-2 h-5 w-5" />
                  Sign Up
                </Button>
              </>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30min Delivery</h3>
              <p className="text-gray-600">Fast delivery to your door</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">4.9★ Rating</h3>
              <p className="text-gray-600">Customer satisfaction guaranteed</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer service</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </section>
  )
}