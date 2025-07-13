import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, Address, Order, Product } from '@/types'

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  favorites: Product[]
  addresses: Address[]
  orders: Order[]
  preferences: {
    theme: 'light' | 'dark' | 'system'
    currency: string
    language: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
      marketing: boolean
    }
    privacy: {
      shareData: boolean
      tracking: boolean
    }
  }
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  favorites: [],
  addresses: [],
  orders: [],
  preferences: {
    theme: 'system',
    currency: 'USD',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
    },
    privacy: {
      shareData: false,
      tracking: false,
    },
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Authentication
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
    
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.favorites = []
      state.addresses = []
      state.orders = []
      state.error = null
    },
    
    // Registration
    registerStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    
    registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
    
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    
    // Profile
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    
    // Favorites
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.find(item => item.id === action.payload.id)
      if (!exists) {
        state.favorites.push(action.payload)
      }
    },
    
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload)
    },
    
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.find(item => item.id === action.payload.id)
      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== action.payload.id)
      } else {
        state.favorites.push(action.payload)
      }
    },
    
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload
    },
    
    // Addresses
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload)
    },
    
    updateAddress: (state, action: PayloadAction<{ id: string; updates: Partial<Address> }>) => {
      const { id, updates } = action.payload
      const index = state.addresses.findIndex(addr => addr.id === id)
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...updates }
      }
    },
    
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload)
    },
    
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload,
      }))
    },
    
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload
    },
    
    // Orders
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload)
    },
    
    updateOrder: (state, action: PayloadAction<{ id: string; updates: Partial<Order> }>) => {
      const { id, updates } = action.payload
      const index = state.orders.findIndex(order => order.id === id)
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updates }
      }
    },
    
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    
    // Token management
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    
    clearToken: (state) => {
      state.token = null
    },
    
    // Bulk operations
    loadUserData: (state, action: PayloadAction<{
      user: User
      favorites: Product[]
      addresses: Address[]
      orders: Order[]
    }>) => {
      const { user, favorites, addresses, orders } = action.payload
      state.user = user
      state.favorites = favorites
      state.addresses = addresses
      state.orders = orders
    },
    
    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.preferences.theme = action.payload
    },
    
    // Notifications
    updateNotificationSettings: (state, action: PayloadAction<Partial<UserState['preferences']['notifications']>>) => {
      state.preferences.notifications = { ...state.preferences.notifications, ...action.payload }
    },
    
    // Privacy
    updatePrivacySettings: (state, action: PayloadAction<Partial<UserState['preferences']['privacy']>>) => {
      state.preferences.privacy = { ...state.preferences.privacy, ...action.payload }
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfile,
  updatePreferences,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setFavorites,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  setAddresses,
  addOrder,
  updateOrder,
  setOrders,
  clearError,
  setError,
  setLoading,
  setToken,
  clearToken,
  loadUserData,
  setTheme,
  updateNotificationSettings,
  updatePrivacySettings,
} = userSlice.actions

export default userSlice.reducer

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user
export const selectToken = (state: { user: UserState }) => state.user.token
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated
export const selectIsLoading = (state: { user: UserState }) => state.user.isLoading
export const selectError = (state: { user: UserState }) => state.user.error
export const selectFavorites = (state: { user: UserState }) => state.user.favorites
export const selectAddresses = (state: { user: UserState }) => state.user.addresses
export const selectOrders = (state: { user: UserState }) => state.user.orders
export const selectPreferences = (state: { user: UserState }) => state.user.preferences
export const selectTheme = (state: { user: UserState }) => state.user.preferences.theme

// Complex selectors
export const selectDefaultAddress = (state: { user: UserState }) => {
  return state.user.addresses.find(addr => addr.isDefault)
}

export const selectFavoriteIds = (state: { user: UserState }) => {
  return state.user.favorites.map(product => product.id)
}

export const selectIsProductFavorite = (state: { user: UserState }, productId: string) => {
  return state.user.favorites.some(product => product.id === productId)
}

export const selectRecentOrders = (state: { user: UserState }) => {
  return state.user.orders.slice(0, 5)
}

export const selectOrderById = (state: { user: UserState }, orderId: string) => {
  return state.user.orders.find(order => order.id === orderId)
}