"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription,
  ModalFooter 
} from "@/components/ui/modal"
import { toast } from "@/components/ui/toast"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Clear user data
      localStorage.removeItem('user')
      
      // Simulate logout process
      await new Promise(resolve => setTimeout(resolve, 800))
      
      toast('Logged out successfully', {
        description: 'Thank you for visiting FreshStore!',
      })
      
      onConfirm()
      onClose()
    } catch (error) {
      toast('Logout failed', {
        description: 'Please try again.',
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="max-w-sm mx-auto">
        <ModalHeader>
          <ModalTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-red-500" />
            Confirm Logout
          </ModalTitle>
          <ModalDescription>
            Are you sure you want to logout? You'll need to sign in again to access your account.
          </ModalDescription>
        </ModalHeader>
        
        <ModalFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoggingOut}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoggingOut ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging out...
              </motion.div>
            ) : (
              <div className="flex items-center justify-center">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </div>
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}