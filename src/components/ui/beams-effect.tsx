"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BeamsEffectProps {
  className?: string
}

export function BeamsEffect({ className }: BeamsEffectProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Animated beams */}
      <div className="absolute inset-0">
        {/* Beam 1 */}
        <motion.div
          className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-green-400/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        
        {/* Beam 2 */}
        <motion.div
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />
        
        {/* Beam 3 */}
        <motion.div
          className="absolute top-0 left-2/3 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />
        
        {/* Beam 4 */}
        <motion.div
          className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
        />
      </div>
      
      {/* Horizontal beams */}
      <div className="absolute inset-0">
        {/* Horizontal beam 1 */}
        <motion.div
          className="absolute left-0 top-1/4 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
        
        {/* Horizontal beam 2 */}
        <motion.div
          className="absolute left-0 top-3/4 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 1.3, ease: "easeInOut" }}
        />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/5 left-1/5 w-2 h-2 bg-green-400/50 rounded-full blur-sm"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-400/50 rounded-full blur-sm"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400/50 rounded-full blur-sm"
          animate={{
            x: [0, 10, 0],
            y: [0, -20, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      
      {/* Radial gradients for glow effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-2/3 right-1/3 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-2/3 w-24 h-24 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
    </div>
  )
}