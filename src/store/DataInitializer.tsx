"use client"

import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { loadInitialData } from './slices/productsSlice'
import { products, categories, featuredProducts, popularProducts, newProducts } from '@/data/products'

export function DataInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Load initial data into Redux store
    dispatch(loadInitialData({
      products,
      categories,
      featuredProducts,
      popularProducts,
      newProducts,
    }))
  }, [dispatch])

  return null
}