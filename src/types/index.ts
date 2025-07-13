export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: Category
  image: string
  images?: string[]
  rating: number
  reviews: number
  inStock: boolean
  features?: string[]
  nutritionInfo?: NutritionInfo
  tags?: string[]
  discount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  image?: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  discount?: number
  shippingCost?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  addresses?: Address[]
  orders?: Order[]
  preferences?: UserPreferences
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
  updatedAt: Date
  shippingAddress: Address
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  currency: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  dietary: string[]
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  comment: string
  createdAt: Date
  helpful: number
  verified: boolean
  user: {
    name: string
    avatar?: string
  }
}

export interface FilterOptions {
  category?: string[]
  priceRange?: [number, number]
  rating?: number
  inStock?: boolean
  tags?: string[]
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  pageSize: number
  filters: FilterOptions
  facets: {
    categories: { id: string; name: string; count: number }[]
    priceRanges: { min: number; max: number; count: number }[]
    ratings: { rating: number; count: number }[]
    tags: { tag: string; count: number }[]
  }
}