"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BreadcrumbProps {
  items: Array<{
    title: string
    href?: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors md:ml-2"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </Link>
              ) : (
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}