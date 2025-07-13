import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
  error: string | null
  discount: number
  shippingCost: number
  taxRate: number
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
  discount: 0,
  shippingCost: 0,
  taxRate: 0.08, // 8% tax
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          addedAt: new Date(),
        }
        state.items.push(newItem)
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload
      const item = state.items.find(item => item.id === itemId)
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId)
        } else {
          item.quantity = quantity
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
      state.discount = 0
    },
    
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    calculateTotals: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
      }, 0)
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      
      const discountAmount = subtotal * (state.discount / 100)
      const taxAmount = (subtotal - discountAmount) * state.taxRate
      
      state.totalPrice = subtotal - discountAmount + taxAmount + state.shippingCost
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    openCart: (state) => {
      state.isOpen = true
    },
    
    closeCart: (state) => {
      state.isOpen = false
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    
    // Bulk actions
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    // Product-specific actions
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        cartSlice.caseReducers.calculateTotals(state)
      }
    },
    
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(cartItem => cartItem.id !== item.id)
        }
        cartSlice.caseReducers.calculateTotals(state)
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
  setShippingCost,
  calculateTotals,
  toggleCart,
  openCart,
  closeCart,
  setLoading,
  setError,
  loadCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions

export default cartSlice.reducer

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items
export const selectCartTotal = (state: { cart: CartState }) => state.cart.totalPrice
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.totalItems
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen
export const selectCartIsLoading = (state: { cart: CartState }) => state.cart.isLoading
export const selectCartError = (state: { cart: CartState }) => state.cart.error

// Complex selectors
export const selectCartSubtotal = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity)
  }, 0)
}

export const selectCartDiscount = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state)
  return subtotal * (state.cart.discount / 100)
}

export const selectCartTax = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state)
  const discount = selectCartDiscount(state)
  return (subtotal - discount) * state.cart.taxRate
}

export const selectCartItemById = (state: { cart: CartState }, itemId: string) => {
  return state.cart.items.find(item => item.id === itemId)
}

export const selectCartItemByProductId = (state: { cart: CartState }, productId: string) => {
  return state.cart.items.find(item => item.product.id === productId)
}