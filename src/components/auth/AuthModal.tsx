"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "signup"
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, initialMode = "login", onSuccess }: AuthModalProps) {
  const [mode, setMode] = React.useState<"login" | "signup">(initialMode)

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  const handleSwitchToSignup = () => {
    setMode("signup")
  }

  const handleSwitchToLogin = () => {
    setMode("login")
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <ModalHeader className="border-none pb-0">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </ModalHeader>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={mode === "signup" ? 1 : -1}>
              <motion.div
                key={mode}
                custom={mode === "signup" ? 1 : -1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                {mode === "login" ? (
                  <LoginForm
                    onSuccess={handleSuccess}
                    onSwitchToSignup={handleSwitchToSignup}
                  />
                ) : (
                  <SignupForm
                    onSuccess={handleSuccess}
                    onSwitchToLogin={handleSwitchToLogin}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}