"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = false
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)
  
  React.useEffect(() => {
    // Simple theme management
    if (enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
    }
  }, [enableSystem])

  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}

export function useTheme() {
  return { theme: "light" }
}