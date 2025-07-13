"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  className?: string
  pauseOnHover?: boolean
  gradient?: boolean
}

export function Marquee({ 
  children, 
  direction = "left", 
  speed = "normal",
  className,
  pauseOnHover = false,
  gradient = false
}: MarqueeProps) {
  const speedClass = {
    slow: "animate-[marquee_60s_linear_infinite]",
    normal: "animate-[marquee_30s_linear_infinite]",
    fast: "animate-[marquee_15s_linear_infinite]"
  }[speed]

  const directionClass = direction === "right" ? "animate-[marquee-reverse_30s_linear_infinite]" : speedClass

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {gradient && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10" />
        </>
      )}
      <div 
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4",
          directionClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface MarqueeItemProps {
  children: React.ReactNode
  className?: string
}

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div className={cn("flex-shrink-0", className)}>
      {children}
    </div>
  )
}

// Predefined marquee variants
export function CategoryMarquee({ categories }: { categories: Array<{name: string, icon: string, count: number}> }) {
  return (
    <Marquee direction="left" speed="normal" pauseOnHover gradient className="py-8">
      {categories.map((category, index) => (
        <MarqueeItem key={index} className="mx-4">
          <div className="glass hover-lift rounded-lg p-6 min-w-[200px] text-center">
            <div className="text-2xl mb-2">{category.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.count} items</p>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  )
}

export function ReviewMarquee({ reviews }: { reviews: Array<{name: string, rating: number, comment: string}> }) {
  return (
    <Marquee direction="right" speed="slow" pauseOnHover gradient className="py-8">
      {reviews.map((review, index) => (
        <MarqueeItem key={index} className="mx-4">
          <div className="glass hover-lift rounded-lg p-6 min-w-[300px] max-w-[400px]">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold mr-3">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold">{review.name}</h4>
                <div className="flex text-yellow-400">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground italic">&ldquo;{review.comment}&rdquo;</p>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  )
}

export function HotelMarquee({ hotels }: { hotels: Array<{name: string, image: string, rating: number, location: string, price: number, distance: string}> }) {
  return (
    <Marquee direction="left" speed="normal" pauseOnHover gradient className="py-8">
      {hotels.map((hotel, index) => (
        <MarqueeItem key={index} className="mx-4">
          <div className="glass hover-lift rounded-lg overflow-hidden min-w-[250px] group">
            <div className="relative overflow-hidden h-48">
              <Image 
                src={hotel.image} 
                alt={hotel.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <div className="flex text-yellow-400 mb-1">
                  {Array.from({ length: hotel.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{hotel.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold">${hotel.price}/night</span>
                <span className="text-sm text-muted-foreground">{hotel.distance}</span>
              </div>
            </div>
          </div>
        </MarqueeItem>
      ))}
    </Marquee>
  )
}