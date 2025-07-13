import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'
import productsReducer from './slices/productsSlice'

export const store = configureStore({
  reducer: {
    // RTK Query API
    [api.reducerPath]: api.reducer,
    
    // Feature slices
    cart: cartReducer,
    user: userReducer,
    ui: uiReducer,
    products: productsReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
  
  devTools: process.env.NODE_ENV !== 'production',
})

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch