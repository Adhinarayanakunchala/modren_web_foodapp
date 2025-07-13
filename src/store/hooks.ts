import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Custom hooks for specific state slices
export const useCart = () => useAppSelector((state) => state.cart)
export const useUser = () => useAppSelector((state) => state.user)
export const useUI = () => useAppSelector((state) => state.ui)
export const useProducts = () => useAppSelector((state) => state.products)

// Common selectors as hooks
export const useCartItems = () => useAppSelector((state) => state.cart.items)
export const useCartTotal = () => useAppSelector((state) => state.cart.totalPrice)
export const useCartItemCount = () => useAppSelector((state) => state.cart.totalItems)
export const useIsAuthenticated = () => useAppSelector((state) => state.user.isAuthenticated)
export const useCurrentUser = () => useAppSelector((state) => state.user.user)
export const useTheme = () => useAppSelector((state) => state.ui.theme)
export const useNotifications = () => useAppSelector((state) => state.ui.notifications)
export const useIsLoading = () => useAppSelector((state) => state.ui.isLoading)
export const useSearchQuery = () => useAppSelector((state) => state.ui.searchQuery)
export const useFilters = () => useAppSelector((state) => state.ui.filters)
export const useViewMode = () => useAppSelector((state) => state.ui.viewMode)

// Product-specific hooks
export const useAllProducts = () => useAppSelector((state) => state.products.products)
export const useFeaturedProducts = () => useAppSelector((state) => state.products.featuredProducts)
export const usePopularProducts = () => useAppSelector((state) => state.products.popularProducts)
export const useCategories = () => useAppSelector((state) => state.products.categories)
export const useCurrentProducts = () => useAppSelector((state) => state.products.currentProducts)
export const useSelectedProduct = () => useAppSelector((state) => state.products.selectedProduct)
export const useRecentlyViewed = () => useAppSelector((state) => state.products.recentlyViewed)
export const useCompareList = () => useAppSelector((state) => state.products.compareList)

// Complex selector hooks
export const useProductById = (productId: string) => 
  useAppSelector((state) => state.products.products.find(p => p.id === productId))

export const useIsProductInCart = (productId: string) =>
  useAppSelector((state) => state.cart.items.some(item => item.product.id === productId))

export const useIsProductFavorite = (productId: string) =>
  useAppSelector((state) => state.user.favorites.some(fav => fav.id === productId))

export const useCartItemByProductId = (productId: string) =>
  useAppSelector((state) => state.cart.items.find(item => item.product.id === productId))

export const useIsProductInCompare = (productId: string) =>
  useAppSelector((state) => state.products.compareList.some(p => p.id === productId))

export const useOpenModals = () =>
  useAppSelector((state) => state.ui.modals.filter(modal => modal.isOpen))

export const useModalById = (modalId: string) =>
  useAppSelector((state) => state.ui.modals.find(modal => modal.id === modalId))

export const useActiveFiltersCount = () =>
  useAppSelector((state) => {
    const filters = state.ui.filters
    let count = 0
    if (filters.category) count++
    if (filters.priceRange) count++
    if (filters.rating) count++
    if (filters.inStock !== null) count++
    return count
  })

export const useCartSubtotal = () =>
  useAppSelector((state) => 
    state.cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  )

export const useCartItemsCount = () =>
  useAppSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0))

export const useAvailableProducts = () =>
  useAppSelector((state) => state.products.products.filter(product => product.inStock))

export const useProductsByCategory = (categoryId: string) =>
  useAppSelector((state) => state.products.products.filter(product => product.category.id === categoryId))

export const useTopRatedProducts = () =>
  useAppSelector((state) => [...state.products.products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
  )

export const useUserFavorites = () =>
  useAppSelector((state) => state.user.favorites)

export const useUserOrders = () =>
  useAppSelector((state) => state.user.orders)

export const useUserAddresses = () =>
  useAppSelector((state) => state.user.addresses)

export const useDefaultAddress = () =>
  useAppSelector((state) => state.user.addresses.find(addr => addr.isDefault))

export const useRecentOrders = () =>
  useAppSelector((state) => state.user.orders.slice(0, 5))

export const useSessionInfo = () =>
  useAppSelector((state) => state.ui.analytics)

export const useFeatureFlags = () =>
  useAppSelector((state) => state.ui.features)

export const useErrorByKey = (key: string) =>
  useAppSelector((state) => state.ui.errors[key] || null)

export const useFeatureByKey = (key: string) =>
  useAppSelector((state) => state.ui.features[key] || false)

// Compound hooks for common patterns
export const useAuthState = () => {
  const user = useAppSelector((state) => state.user.user)
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  const error = useAppSelector((state) => state.user.error)
  
  return { user, isAuthenticated, isLoading, error }
}

export const useCartState = () => {
  const items = useAppSelector((state) => state.cart.items)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const totalItems = useAppSelector((state) => state.cart.totalItems)
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const isLoading = useAppSelector((state) => state.cart.isLoading)
  
  return { items, totalPrice, totalItems, isOpen, isLoading }
}

export const useSearchState = () => {
  const query = useAppSelector((state) => state.ui.searchQuery)
  const results = useAppSelector((state) => state.products.searchResults)
  const isLoading = useAppSelector((state) => state.products.searchLoading)
  const history = useAppSelector((state) => state.ui.searchHistory)
  
  return { query, results, isLoading, history }
}

export const useNavigationState = () => {
  const isMobileMenuOpen = useAppSelector((state) => state.ui.isMobileMenuOpen)
  const isSearchOpen = useAppSelector((state) => state.ui.isSearchOpen)
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  
  return { isMobileMenuOpen, isSearchOpen, sidebarOpen }
}

export const useProductsState = () => {
  const products = useAppSelector((state) => state.products.currentProducts)
  const isLoading = useAppSelector((state) => state.products.isLoading)
  const error = useAppSelector((state) => state.products.error)
  const totalPages = useAppSelector((state) => state.products.totalPages)
  const currentPage = useAppSelector((state) => state.products.currentPage)
  
  return { products, isLoading, error, totalPages, currentPage }
}

// User-specific hooks for dashboard
export const useUserStats = () => {
  return {
    totalOrders: 12,
    wishlistCount: 8,
    totalSavings: 245.50,
    loyaltyPoints: 1250
  }
}

export const useRecentOrdersData = () => {
  return [
    { id: '12345', date: '2024-01-15', total: 89.99, status: 'delivered' },
    { id: '12346', date: '2024-01-10', total: 156.50, status: 'delivered' },
    { id: '12347', date: '2024-01-08', total: 75.25, status: 'delivered' },
    { id: '12348', date: '2024-01-05', total: 112.80, status: 'delivered' },
    { id: '12349', date: '2024-01-03', total: 45.60, status: 'delivered' },
  ]
}

export const useRecommendedProducts = () => {
  const productsState = useAppSelector((state) => state.products.products)
  return productsState.slice(0, 8) // Return first 8 products as recommended
}