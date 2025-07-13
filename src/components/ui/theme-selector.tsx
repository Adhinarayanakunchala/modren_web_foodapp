"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Sun, 
  Moon, 
  Monitor, 
  Leaf, 
  Briefcase, 
  Palette,
  Heart,
  Check
} from "lucide-react"

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "System", value: "system", icon: Monitor },
  { name: "Green", value: "theme-green", icon: Leaf },
  { name: "Professional", value: "theme-professional", icon: Briefcase },
  { name: "Purple", value: "theme-purple", icon: Palette },
  { name: "Rose", value: "theme-rose", icon: Heart },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 h-9 p-0 hover-lift"
        >
          {currentTheme?.icon && (
            <currentTheme.icon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{themeOption.name}</span>
              {theme === themeOption.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}