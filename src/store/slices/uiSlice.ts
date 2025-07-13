import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface Modal {
  id: string
  type: 'auth' | 'cart' | 'product' | 'address' | 'order' | 'confirmation' | 'custom'
  isOpen: boolean
  data?: Record<string, unknown>
  onClose?: () => void
}

interface UIState {
  // Loading states
  isLoading: boolean
  loadingMessage: string | null
  
  // Navigation
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  
  // Modals
  modals: Modal[]
  
  // Notifications/Toast
  notifications: Notification[]
  
  // Search
  searchQuery: string
  searchHistory: string[]
  
  // Layout
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  
  // Product filters
  filters: {
    category: string | null
    priceRange: [number, number] | null
    rating: number | null
    inStock: boolean | null
    sortBy: 'name' | 'price' | 'rating' | 'popularity' | 'newest'
    sortOrder: 'asc' | 'desc'
  }
  
  // View preferences
  viewMode: 'grid' | 'list'
  itemsPerPage: number
  
  // Error states
  errors: {
    [key: string]: string | null
  }
  
  // Feature flags
  features: {
    [key: string]: boolean
  }
  
  // Analytics
  analytics: {
    pageViews: number
    sessionStart: number
    lastActivity: number
  }
}

const initialState: UIState = {
  isLoading: false,
  loadingMessage: null,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  modals: [],
  notifications: [],
  searchQuery: '',
  searchHistory: [],
  sidebarOpen: false,
  theme: 'system',
  filters: {
    category: null,
    priceRange: null,
    rating: null,
    inStock: null,
    sortBy: 'name',
    sortOrder: 'asc',
  },
  viewMode: 'grid',
  itemsPerPage: 12,
  errors: {},
  features: {
    darkMode: true,
    notifications: true,
    analytics: false,
  },
  analytics: {
    pageViews: 0,
    sessionStart: Date.now(),
    lastActivity: Date.now(),
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (!action.payload) {
        state.loadingMessage = null
      }
    },
    
    setLoadingMessage: (state, action: PayloadAction<string>) => {
      state.loadingMessage = action.payload
    },
    
    // Navigation
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload
    },
    
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen
    },
    
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload
    },
    
    // Modals
    openModal: (state, action: PayloadAction<Omit<Modal, 'isOpen'>>) => {
      const existingModal = state.modals.find(modal => modal.id === action.payload.id)
      if (existingModal) {
        existingModal.isOpen = true
        existingModal.data = action.payload.data
      } else {
        state.modals.push({ ...action.payload, isOpen: true })
      }
    },
    
    closeModal: (state, action: PayloadAction<string>) => {
      const modal = state.modals.find(modal => modal.id === action.payload)
      if (modal) {
        modal.isOpen = false
        if (modal.onClose) {
          modal.onClose()
        }
      }
    },
    
    closeAllModals: (state) => {
      state.modals.forEach(modal => {
        modal.isOpen = false
        if (modal.onClose) {
          modal.onClose()
        }
      })
    },
    
    removeModal: (state, action: PayloadAction<string>) => {
      state.modals = state.modals.filter(modal => modal.id !== action.payload)
    },
    
    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      state.notifications.push({
        id,
        duration: 5000,
        ...action.payload,
      })
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(notif => notif.id !== action.payload)
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // Search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim()
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query)
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10)
        }
      }
    },
    
    clearSearchHistory: (state) => {
      state.searchHistory = []
    },
    
    removeFromSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(item => item !== action.payload)
    },
    
    // Layout
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    
    // Filters
    setFilter: (state, action: PayloadAction<{ key: keyof UIState['filters']; value: UIState['filters'][keyof UIState['filters']] }>) => {
      const { key, value } = action.payload
      ;(state.filters as Record<string, UIState['filters'][keyof UIState['filters']]>)[key] = value
    },
    
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: null,
        rating: null,
        inStock: null,
        sortBy: 'name',
        sortOrder: 'asc',
      }
    },
    
    setSortBy: (state, action: PayloadAction<UIState['filters']['sortBy']>) => {
      state.filters.sortBy = action.payload
    },
    
    setSortOrder: (state, action: PayloadAction<UIState['filters']['sortOrder']>) => {
      state.filters.sortOrder = action.payload
    },
    
    // View preferences
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },
    
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    
    // Error handling
    setError: (state, action: PayloadAction<{ key: string; message: string }>) => {
      const { key, message } = action.payload
      state.errors[key] = message
    },
    
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload]
    },
    
    clearAllErrors: (state) => {
      state.errors = {}
    },
    
    // Feature flags
    setFeature: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      const { key, value } = action.payload
      state.features[key] = value
    },
    
    toggleFeature: (state, action: PayloadAction<string>) => {
      const key = action.payload
      state.features[key] = !state.features[key]
    },
    
    // Analytics
    incrementPageViews: (state) => {
      state.analytics.pageViews += 1
      state.analytics.lastActivity = Date.now()
    },
    
    updateLastActivity: (state) => {
      state.analytics.lastActivity = Date.now()
    },
    
    resetAnalytics: (state) => {
      state.analytics = {
        pageViews: 0,
        sessionStart: Date.now(),
        lastActivity: Date.now(),
      }
    },
    
    // Bulk operations
    resetUI: () => {
      return {
        ...initialState,
        analytics: {
          pageViews: 0,
          sessionStart: Date.now(),
          lastActivity: Date.now(),
        },
      }
    },
    
    // Quick actions
    showSuccessNotification: (state, action: PayloadAction<string>) => {
      const id = `success-${Date.now()}`
      state.notifications.push({
        id,
        type: 'success',
        title: 'Success',
        message: action.payload,
        duration: 3000,
      })
    },
    
    showErrorNotification: (state, action: PayloadAction<string>) => {
      const id = `error-${Date.now()}`
      state.notifications.push({
        id,
        type: 'error',
        title: 'Error',
        message: action.payload,
        duration: 5000,
      })
    },
    
    showInfoNotification: (state, action: PayloadAction<string>) => {
      const id = `info-${Date.now()}`
      state.notifications.push({
        id,
        type: 'info',
        title: 'Info',
        message: action.payload,
        duration: 4000,
      })
    },
  },
})

export const {
  setLoading,
  setLoadingMessage,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSearch,
  setSearchOpen,
  openModal,
  closeModal,
  closeAllModals,
  removeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setSearchQuery,
  addToSearchHistory,
  clearSearchHistory,
  removeFromSearchHistory,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setFilter,
  clearFilters,
  setSortBy,
  setSortOrder,
  setViewMode,
  setItemsPerPage,
  setError,
  clearError,
  clearAllErrors,
  setFeature,
  toggleFeature,
  incrementPageViews,
  updateLastActivity,
  resetAnalytics,
  resetUI,
  showSuccessNotification,
  showErrorNotification,
  showInfoNotification,
} = uiSlice.actions

export default uiSlice.reducer

// Selectors
export const selectIsLoading = (state: { ui: UIState }) => state.ui.isLoading
export const selectLoadingMessage = (state: { ui: UIState }) => state.ui.loadingMessage
export const selectIsMobileMenuOpen = (state: { ui: UIState }) => state.ui.isMobileMenuOpen
export const selectIsSearchOpen = (state: { ui: UIState }) => state.ui.isSearchOpen
export const selectModals = (state: { ui: UIState }) => state.ui.modals
export const selectNotifications = (state: { ui: UIState }) => state.ui.notifications
export const selectSearchQuery = (state: { ui: UIState }) => state.ui.searchQuery
export const selectSearchHistory = (state: { ui: UIState }) => state.ui.searchHistory
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen
export const selectTheme = (state: { ui: UIState }) => state.ui.theme
export const selectFilters = (state: { ui: UIState }) => state.ui.filters
export const selectViewMode = (state: { ui: UIState }) => state.ui.viewMode
export const selectItemsPerPage = (state: { ui: UIState }) => state.ui.itemsPerPage
export const selectErrors = (state: { ui: UIState }) => state.ui.errors
export const selectFeatures = (state: { ui: UIState }) => state.ui.features
export const selectAnalytics = (state: { ui: UIState }) => state.ui.analytics

// Complex selectors
export const selectOpenModals = (state: { ui: UIState }) => {
  return state.ui.modals.filter(modal => modal.isOpen)
}

export const selectModalById = (state: { ui: UIState }, modalId: string) => {
  return state.ui.modals.find(modal => modal.id === modalId)
}

export const selectErrorByKey = (state: { ui: UIState }, key: string) => {
  return state.ui.errors[key] || null
}

export const selectFeatureByKey = (state: { ui: UIState }, key: string) => {
  return state.ui.features[key] || false
}

export const selectActiveFiltersCount = (state: { ui: UIState }) => {
  const filters = state.ui.filters
  let count = 0
  if (filters.category) count++
  if (filters.priceRange) count++
  if (filters.rating) count++
  if (filters.inStock !== null) count++
  return count
}

export const selectSessionDuration = (state: { ui: UIState }) => {
  return state.ui.analytics.lastActivity - state.ui.analytics.sessionStart
}