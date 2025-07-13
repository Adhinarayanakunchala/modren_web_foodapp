import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, Category, FilterOptions } from '@/types'

interface ProductsState {
  // Products
  products: Product[]
  featuredProducts: Product[]
  popularProducts: Product[]
  newProducts: Product[]
  
  // Categories
  categories: Category[]
  
  // Current view
  currentProducts: Product[]
  currentCategory: Category | null
  
  // Pagination
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  
  // Filters
  filters: FilterOptions
  
  // Loading states
  isLoading: boolean
  isLoadingMore: boolean
  
  // Error states
  error: string | null
  
  // Search
  searchResults: Product[]
  searchQuery: string
  searchLoading: boolean
  
  // Product details
  selectedProduct: Product | null
  productLoading: boolean
  
  // Recently viewed
  recentlyViewed: Product[]
  
  // Comparison
  compareList: Product[]
  
  // Cache
  lastUpdated: number
  cacheExpiry: number
}

const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  popularProducts: [],
  newProducts: [],
  categories: [],
  currentProducts: [],
  currentCategory: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 12,
  totalItems: 0,
  filters: {
    category: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: undefined,
    tags: [],
    sortBy: 'name',
    sortOrder: 'asc',
  },
  isLoading: false,
  isLoadingMore: false,
  error: null,
  searchResults: [],
  searchQuery: '',
  searchLoading: false,
  selectedProduct: null,
  productLoading: false,
  recentlyViewed: [],
  compareList: [],
  lastUpdated: 0,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Products
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.lastUpdated = Date.now()
    },
    
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    
    // Featured products
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload
    },
    
    setPopularProducts: (state, action: PayloadAction<Product[]>) => {
      state.popularProducts = action.payload
    },
    
    setNewProducts: (state, action: PayloadAction<Product[]>) => {
      state.newProducts = action.payload
    },
    
    // Categories
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
    },
    
    setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload
    },
    
    // Current view
    setCurrentProducts: (state, action: PayloadAction<Product[]>) => {
      state.currentProducts = action.payload
    },
    
    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload
    },
    
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload
    },
    
    // Filters
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload
    },
    
    updateFilter: (state, action: PayloadAction<{ key: keyof FilterOptions; value: FilterOptions[keyof FilterOptions] }>) => {
      const { key, value } = action.payload
      ;(state.filters as Record<string, FilterOptions[keyof FilterOptions]>)[key] = value
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: [],
        priceRange: [0, 1000],
        rating: 0,
        inStock: undefined,
        tags: [],
        sortBy: 'name',
        sortOrder: 'asc',
      }
    },
    
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload
    },
    
    // Error states
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    // Search
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.searchResults = action.payload
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload
    },
    
    clearSearch: (state) => {
      state.searchResults = []
      state.searchQuery = ''
      state.searchLoading = false
    },
    
    // Product details
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    },
    
    setProductLoading: (state, action: PayloadAction<boolean>) => {
      state.productLoading = action.payload
    },
    
    // Recently viewed
    addToRecentlyViewed: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      state.recentlyViewed = state.recentlyViewed.filter(p => p.id !== product.id)
      state.recentlyViewed.unshift(product)
      
      // Keep only last 10 items
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 10)
      }
    },
    
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = []
    },
    
    // Comparison
    addToCompare: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      if (!state.compareList.find(p => p.id === product.id) && state.compareList.length < 4) {
        state.compareList.push(product)
      }
    },
    
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.compareList = state.compareList.filter(p => p.id !== action.payload)
    },
    
    clearCompare: (state) => {
      state.compareList = []
    },
    
    // Sorting
    sortProducts: (state, action: PayloadAction<{ sortBy: 'name' | 'price' | 'rating' | 'popularity'; sortOrder: 'asc' | 'desc' }>) => {
      const { sortBy, sortOrder } = action.payload
      state.filters.sortBy = sortBy
      state.filters.sortOrder = sortOrder
      
      const sortFn = (a: Product, b: Product) => {
        let comparison = 0
        
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'price':
            comparison = a.price - b.price
            break
          case 'rating':
            comparison = a.rating - b.rating
            break
          case 'popularity':
            comparison = a.reviews - b.reviews
            break
        }
        
        return sortOrder === 'asc' ? comparison : -comparison
      }
      
      state.currentProducts.sort(sortFn)
    },
    
    // Bulk operations
    loadInitialData: (state, action: PayloadAction<{
      products: Product[]
      categories: Category[]
      featuredProducts: Product[]
      popularProducts: Product[]
      newProducts: Product[]
    }>) => {
      const { products, categories, featuredProducts, popularProducts, newProducts } = action.payload
      state.products = products
      state.categories = categories
      state.featuredProducts = featuredProducts
      state.popularProducts = popularProducts
      state.newProducts = newProducts
      state.lastUpdated = Date.now()
    },
    
    // Cache management
    invalidateCache: (state) => {
      state.lastUpdated = 0
    },
    
    // Reset state
    resetProducts: (state) => {
      return {
        ...initialState,
        categories: state.categories, // Keep categories
      }
    },
    
    // Inventory updates
    updateProductStock: (state, action: PayloadAction<{ productId: string; inStock: boolean }>) => {
      const { productId, inStock } = action.payload
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.inStock = inStock
      }
    },
    
    // Price updates
    updateProductPrice: (state, action: PayloadAction<{ productId: string; price: number; originalPrice?: number }>) => {
      const { productId, price, originalPrice } = action.payload
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.price = price
        if (originalPrice !== undefined) {
          product.originalPrice = originalPrice
        }
      }
    },
    
    // Rating updates
    updateProductRating: (state, action: PayloadAction<{ productId: string; rating: number; reviews: number }>) => {
      const { productId, rating, reviews } = action.payload
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.rating = rating
        product.reviews = reviews
      }
    },
  },
})

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setFeaturedProducts,
  setPopularProducts,
  setNewProducts,
  setCategories,
  setCurrentCategory,
  setCurrentProducts,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  setTotalItems,
  setFilters,
  updateFilter,
  clearFilters,
  setLoading,
  setLoadingMore,
  setError,
  clearError,
  setSearchResults,
  setSearchQuery,
  setSearchLoading,
  clearSearch,
  setSelectedProduct,
  setProductLoading,
  addToRecentlyViewed,
  clearRecentlyViewed,
  addToCompare,
  removeFromCompare,
  clearCompare,
  sortProducts,
  loadInitialData,
  invalidateCache,
  resetProducts,
  updateProductStock,
  updateProductPrice,
  updateProductRating,
} = productsSlice.actions

export default productsSlice.reducer

// Selectors
export const selectProducts = (state: { products: ProductsState }) => state.products.products
export const selectFeaturedProducts = (state: { products: ProductsState }) => state.products.featuredProducts
export const selectPopularProducts = (state: { products: ProductsState }) => state.products.popularProducts
export const selectNewProducts = (state: { products: ProductsState }) => state.products.newProducts
export const selectCategories = (state: { products: ProductsState }) => state.products.categories
export const selectCurrentProducts = (state: { products: ProductsState }) => state.products.currentProducts
export const selectCurrentCategory = (state: { products: ProductsState }) => state.products.currentCategory
export const selectCurrentPage = (state: { products: ProductsState }) => state.products.currentPage
export const selectTotalPages = (state: { products: ProductsState }) => state.products.totalPages
export const selectFilters = (state: { products: ProductsState }) => state.products.filters
export const selectIsLoading = (state: { products: ProductsState }) => state.products.isLoading
export const selectError = (state: { products: ProductsState }) => state.products.error
export const selectSearchResults = (state: { products: ProductsState }) => state.products.searchResults
export const selectSearchQuery = (state: { products: ProductsState }) => state.products.searchQuery
export const selectSelectedProduct = (state: { products: ProductsState }) => state.products.selectedProduct
export const selectRecentlyViewed = (state: { products: ProductsState }) => state.products.recentlyViewed
export const selectCompareList = (state: { products: ProductsState }) => state.products.compareList

// Complex selectors
export const selectProductById = (state: { products: ProductsState }, productId: string) => {
  return state.products.products.find(product => product.id === productId)
}

export const selectCategoryById = (state: { products: ProductsState }, categoryId: string) => {
  return state.products.categories.find(category => category.id === categoryId)
}

export const selectProductsByCategory = (state: { products: ProductsState }, categoryId: string) => {
  return state.products.products.filter(product => product.category.id === categoryId)
}

export const selectAvailableProducts = (state: { products: ProductsState }) => {
  return state.products.products.filter(product => product.inStock)
}

export const selectProductsInPriceRange = (state: { products: ProductsState }, minPrice: number, maxPrice: number) => {
  return state.products.products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  )
}

export const selectTopRatedProducts = (state: { products: ProductsState }) => {
  return [...state.products.products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
}

export const selectIsCacheValid = (state: { products: ProductsState }) => {
  return Date.now() - state.products.lastUpdated < state.products.cacheExpiry
}

export const selectIsProductInCompare = (state: { products: ProductsState }, productId: string) => {
  return state.products.compareList.some(product => product.id === productId)
}

export const selectCompareCount = (state: { products: ProductsState }) => {
  return state.products.compareList.length
}