"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  Share2,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/ProductCard"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addToCart, updateQuantity } from "@/store/slices/cartSlice"
import { toggleFavorite } from "@/store/slices/userSlice"
import { showSuccessNotification } from "@/store/slices/uiSlice"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Product } from "@/types"
import { RootState } from "@/store"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  
  const { products } = useAppSelector((state: RootState) => state.products)
  const { items: cartItems } = useAppSelector((state: RootState) => state.cart)
  const { favorites } = useAppSelector((state: RootState) => state.user)
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isZoomed, setIsZoomed] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  
  // Find product by ID
  const product = products.find(p => p.id === params.id)
  const cartItem = cartItems.find(item => item.product.id === params.id)
  const isFavorite = favorites.some(fav => fav.id === params.id)
  
  // Mock additional product data
  const productImages = product?.images || [
    product?.image || "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500"
  ]
  
  const relatedProducts = products.filter((p: Product) => 
    p.category.id === product?.category.id && p.id !== product?.id
  ).slice(0, 4)
  
  const reviews = [
    {
      id: "1",
      user: "John Doe",
      rating: 5,
      comment: "Excellent product! Exactly as described.",
      date: "2024-01-15",
      helpful: 12
    },
    {
      id: "2", 
      user: "Jane Smith",
      rating: 4,
      comment: "Good quality, fast delivery. Recommended!",
      date: "2024-01-10",
      helpful: 8
    }
  ]
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => router.push("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    )
  }
  
  const handleAddToCart = () => {
    dispatch(addToCart({ 
      product, 
      quantity,
      selectedSize,
      selectedColor
    }))
    dispatch(showSuccessNotification("Added to cart!"))
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem) {
      dispatch(updateQuantity({ 
        productId: product.id, 
        quantity: newQuantity 
      }))
    }
  }
  
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product))
    dispatch(showSuccessNotification(
      isFavorite ? "Removed from wishlist" : "Added to wishlist"
    ))
  }
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length)
  }
  
  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span 
              className="cursor-pointer hover:text-primary"
              onClick={() => router.push("/")}
            >
              Home
            </span>
            <span>/</span>
            <span 
              className="cursor-pointer hover:text-primary"
              onClick={() => router.push("/products")}
            >
              Products
            </span>
            <span>/</span>
            <span 
              className="cursor-pointer hover:text-primary"
              onClick={() => router.push(`/products?category=${product.category.slug}`)}
            >
              {product.category.name}
            </span>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-square bg-muted rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full cursor-zoom-in"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Share button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </motion.div>
            
            {/* Thumbnail images */}
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0",
                    index === selectedImageIndex ? "border-primary" : "border-transparent"
                  )}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline">
                  {product.category.icon} {product.category.name}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <Badge variant="destructive">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              {/* Stock status */}
              <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  product.inStock ? "text-green-600" : "text-red-600"
                )}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            
            {/* Size/Color selection (if applicable) */}
            {product.category.name === "Clothing" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Size</h3>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex gap-2">
                    {["Red", "Blue", "Green", "Black"].map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-3 py-1 border-x">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={cn(
                    "transition-colors",
                    isFavorite && "text-red-500 border-red-500"
                  )}
                >
                  <Heart className={cn(
                    "h-4 w-4",
                    isFavorite && "fill-red-500"
                  )} />
                </Button>
              </motion.div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-sm">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <RefreshCw className="h-4 w-4 text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="flex gap-8">
              {["description", "reviews", "specifications"].map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "py-2 px-1 border-b-2 text-sm font-medium capitalize transition-colors",
                    activeTab === tab 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p>{product.description}</p>
                    <p>This premium product offers exceptional quality and value. Perfect for everyday use with long-lasting durability.</p>
                  </div>
                )}
                
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{review.user}</span>
                          <div className="flex">
                            {Array.from({ length: review.rating }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {review.helpful}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Product Details</h3>
                      <ul className="space-y-1 text-sm">
                        <li><strong>Brand:</strong> Premium Brand</li>
                        <li><strong>Model:</strong> {product.name}</li>
                        <li><strong>Category:</strong> {product.category.name}</li>
                        <li><strong>Weight:</strong> 1.2 kg</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Features</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Premium quality materials</li>
                        <li>• Durable construction</li>
                        <li>• Easy to use</li>
                        <li>• Warranty included</li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: Product, index: number) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}