"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeSelector } from "@/components/ui/theme-selector"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  User, 
  Heart, 
  UserCircle, 
  Package, 
  LogOut,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCartItemCount, useAppDispatch, useAppSelector } from "@/store/hooks"
import { toggleCart } from "@/store/slices/cartSlice"
import { setSearchQuery, toggleMobileMenu } from "@/store/slices/uiSlice"
import { logout } from "@/store/slices/userSlice"
import { showSuccessNotification } from "@/store/slices/uiSlice"
import { RootState } from "@/store"

export function Header() {
  const cartItemCount = useCartItemCount()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.user)
  const { favorites } = useAppSelector((state: RootState) => state.user)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  const handleMobileMenuClick = () => {
    dispatch(toggleMobileMenu())
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(showSuccessNotification("Successfully logged out"))
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b"
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
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search button for mobile */}
            <Button size="icon" variant="ghost" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* Favorites */}
            <Button size="icon" variant="ghost" className="hidden sm:flex relative">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {favorites.length}
                  </Badge>
                </motion.div>
              )}
            </Button>

            {/* User Account Dropdown */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="relative rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name ? getUserInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="icon" variant="ghost" className="hidden sm:flex">
                <Link href="/auth/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

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