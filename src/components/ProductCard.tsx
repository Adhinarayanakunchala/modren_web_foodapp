"use client"

import { Product } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useIsProductInCart, useIsProductFavorite } from "@/store/hooks"
import { addToCart } from "@/store/slices/cartSlice"
import { toggleFavorite } from "@/store/slices/userSlice"
import { addToRecentlyViewed } from "@/store/slices/productsSlice"
import { showSuccessNotification } from "@/store/slices/uiSlice"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index?: number
  variant?: "default" | "compact" | "wide"
  className?: string
}

export function ProductCard({ 
  product, 
  index = 0, 
  variant = "default",
  className 
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const isInCart = useIsProductInCart(product.id)
  const isFavorite = useIsProductFavorite(product.id)
  const discountPercentage = product.discount || 0
  const isOnSale = discountPercentage > 0
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  // Get images array (fallback to single image if images array doesn't exist)
  const images = product.images || [product.image]
  
  const handleAddToCart = () => {
    if (product.inStock) {
      dispatch(addToCart({ product, quantity: 1 }))
      dispatch(showSuccessNotification(`${product.name} added to cart!`))
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(product))
    dispatch(showSuccessNotification(
      isFavorite ? 'Removed from favorites' : 'Added to favorites'
    ))
  }

  const handleProductClick = () => {
    dispatch(addToRecentlyViewed(product))
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const cardVariants = {
    default: "max-w-sm",
    compact: "max-w-xs",
    wide: "max-w-md"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn("group", cardVariants[variant], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-sm hover-lift beam-effect">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`} onClick={handleProductClick}>
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Image Navigation */}
              {images.length > 1 && isHovered && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === currentImageIndex ? "bg-white" : "bg-white/50"
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentImageIndex(i)
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Badges */}
              {isOnSale && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 left-2 z-10 pulse-effect"
                >
                  {discountPercentage}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2 z-10"
                >
                  Out of Stock
                </Badge>
              )}
              
              {/* Quick View Button */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-12 z-20 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // TODO: Implement quick view modal
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </Link>
          
          {/* Wishlist Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 right-2 z-20"
          >
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-white/80 hover:bg-white transition-all duration-200",
                isFavorite ? "text-red-500 bg-red-50" : ""
              )}
              onClick={handleToggleFavorite}
            >
              <Heart className={cn(
                "h-4 w-4 transition-all duration-200",
                isFavorite ? "fill-red-500 scale-110" : ""
              )} />
            </Button>
          </motion.div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
          
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/products/${product.id}`} onClick={handleProductClick}>
              {product.name}
            </Link>
          </CardTitle>
          
          <CardDescription className="line-clamp-2 text-sm">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category.icon} {product.category.name}
            </Badge>
          </div>

          <div className="flex gap-2 mb-3">
            {product.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full" 
              disabled={!product.inStock}
              variant={product.inStock ? "default" : "secondary"}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {!product.inStock ? "Out of Stock" : isInCart ? "In Cart" : "Add to Cart"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Compact variant for grid layouts
export function CompactProductCard({ product, index }: ProductCardProps) {
  return (
    <ProductCard 
      product={product} 
      index={index} 
      variant="compact"
      className="w-full"
    />
  )
}

// Wide variant for list layouts
export function WideProductCard({ product, index }: ProductCardProps) {
  return (
    <ProductCard 
      product={product} 
      index={index} 
      variant="wide"
      className="w-full"
    />
  )
}