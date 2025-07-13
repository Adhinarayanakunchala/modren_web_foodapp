"use client"

import { Product } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useIsProductInCart, useIsProductFavorite } from "@/store/hooks"
import { addToCart } from "@/store/slices/cartSlice"
import { toggleFavorite } from "@/store/slices/userSlice"
import { addToRecentlyViewed } from "@/store/slices/productsSlice"
import { showSuccessNotification } from "@/store/slices/uiSlice"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const isInCart = useIsProductInCart(product.id)
  const isFavorite = useIsProductFavorite(product.id)
  const discountPercentage = product.discount || 0
  const isOnSale = discountPercentage > 0

  const handleAddToCart = () => {
    if (product.inStock) {
      dispatch(addToCart({ product, quantity: 1 }))
      dispatch(showSuccessNotification(`${product.name} added to cart!`))
    }
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product))
    dispatch(showSuccessNotification(
      isFavorite ? 'Removed from favorites' : 'Added to favorites'
    ))
  }

  const handleProductClick = () => {
    dispatch(addToRecentlyViewed(product))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`} onClick={handleProductClick}>
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isOnSale && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 left-2 z-10"
                >
                  {discountPercentage}% OFF
                </Badge>
              )}
              {!product.inStock && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2 z-10"
                >
                  Out of Stock
                </Badge>
              )}
            </div>
          </Link>
          
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 z-20 bg-white/80 hover:bg-white ${isFavorite ? 'text-red-500' : ''}`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
          </Button>
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

          <Button 
            className="w-full" 
            disabled={!product.inStock}
            variant={product.inStock ? "default" : "secondary"}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!product.inStock ? "Out of Stock" : isInCart ? "In Cart" : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}