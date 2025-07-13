"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCartItemCount, useAppDispatch } from "@/store/hooks"
import { toggleCart } from "@/store/slices/cartSlice"
import { setSearchQuery, toggleMobileMenu } from "@/store/slices/uiSlice"

export function Header() {
  const cartItemCount = useCartItemCount()
  const dispatch = useAppDispatch()

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  const handleMobileMenuClick = () => {
    dispatch(toggleMobileMenu())
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary"
            >
              🥗 FreshStore
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 pr-4 w-full"
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search button for mobile */}
            <Button size="icon" variant="ghost" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Button size="icon" variant="ghost" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* User Account */}
            <Button size="icon" variant="ghost" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button size="icon" variant="ghost" className="relative" onClick={handleCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                </motion.div>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={handleMobileMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-10 pr-4 w-full"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}