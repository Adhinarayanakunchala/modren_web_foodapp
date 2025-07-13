"use client"

import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeNotification } from "@/store/slices/uiSlice"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

export function Toast({ id, title, description, type = "info", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsLeaving(true)
        setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[type]

  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg shadow-lg transition-all duration-300 max-w-md",
        typeClasses[type],
        isLeaving ? "opacity-0 transform translate-x-full" : "opacity-100 transform translate-x-0"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <button
        onClick={() => {
          setIsLeaving(true)
          setTimeout(() => {
            setIsVisible(false)
            onClose?.()
          }, 300)
        }}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function Toaster() {
  const { notifications } = useAppSelector((state: any) => state.ui)
  const dispatch = useAppDispatch()

  const handleClose = (id: string) => {
    dispatch(removeNotification(id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification: any) => (
        <Toast
          key={notification.id}
          id={notification.id}
          title={notification.title}
          description={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </div>
  )
}

// Export toast function for easy use
export const toast = {
  success: (message: string, title?: string) => {
    // This would be handled by the Redux store
    console.log('Success:', title, message)
  },
  error: (message: string, title?: string) => {
    console.log('Error:', title, message)
  },
  warning: (message: string, title?: string) => {
    console.log('Warning:', title, message)
  },
  info: (message: string, title?: string) => {
    console.log('Info:', title, message)
  }
}