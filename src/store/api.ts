import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, Category, User, Order, Review, FilterOptions, SearchResult } from '@/types'

// Base URL for API - in production, this would be your actual API URL
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as { user: { token?: string } }).user?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Product', 'Category', 'User', 'Order', 'Review', 'Cart'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<SearchResult, FilterOptions>({
      query: (filters) => ({
        url: '/products',
        params: filters,
      }),
      providesTags: ['Product'],
    }),
    
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    
    updateProduct: builder.mutation<Product, { id: string; updates: Partial<Product> }>({
      query: ({ id, updates }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    
    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    
    getCategory: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    
    getCategoryProducts: builder.query<Product[], string>({
      query: (categoryId) => `/categories/${categoryId}/products`,
      providesTags: ['Product'],
    }),
    
    // Search
    searchProducts: builder.query<SearchResult, string>({
      query: (searchTerm) => ({
        url: '/products/search',
        params: { q: searchTerm },
      }),
      providesTags: ['Product'],
    }),
    
    // User Authentication
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    register: builder.mutation<{ user: User; token: string }, { name: string; email: string; password: string }>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    
    // User Profile
    getProfile: builder.query<User, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: '/user/profile',
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Orders
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order', 'Cart'],
    }),
    
    updateOrderStatus: builder.mutation<Order, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
    
    // Reviews
    getProductReviews: builder.query<Review[], string>({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: ['Review'],
    }),
    
    createReview: builder.mutation<Review, { productId: string; review: Partial<Review> }>({
      query: ({ productId, review }) => ({
        url: `/products/${productId}/reviews`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Review', 'Product'],
    }),
    
    // Cart (for logged-in users)
    getCart: builder.query<{ items: Record<string, unknown>[]; total: number }, void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    
    addToCart: builder.mutation<{ success: boolean; message: string }, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: '/cart/add',
        method: 'POST',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    
    updateCartItem: builder.mutation<{ success: boolean; message: string }, { itemId: string; quantity: number }>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    
    removeFromCart: builder.mutation<void, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: '/cart/clear',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    
    // Favorites/Wishlist
    getFavorites: builder.query<Product[], void>({
      query: () => '/favorites',
      providesTags: ['Product'],
    }),
    
    addToFavorites: builder.mutation<void, string>({
      query: (productId) => ({
        url: '/favorites',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Product'],
    }),
    
    removeFromFavorites: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/favorites/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
})

// Export hooks for usage in components
export const {
  // Products
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  
  // Categories
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
  
  // Search
  useSearchProductsQuery,
  
  // Authentication
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  
  // User Profile
  useGetProfileQuery,
  useUpdateProfileMutation,
  
  // Orders
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  
  // Reviews
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  
  // Cart
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  
  // Favorites
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = api