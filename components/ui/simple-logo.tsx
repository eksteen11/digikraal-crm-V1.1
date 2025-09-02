import React from "react"
import { cn } from "@/lib/utils"

interface SimpleLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "white" | "dark" | "gradient"
  showText?: boolean
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl", 
  xl: "text-2xl"
}

export function SimpleLogo({ 
  size = "md", 
  variant = "default", 
  showText = true, 
  className 
}: SimpleLogoProps) {
  const logoClasses = cn(
    "flex items-center space-x-2",
    className
  )

  const iconClasses = cn(
    sizeClasses[size],
    "flex-shrink-0"
  )

  const textClasses = cn(
    "font-sans font-bold text-foreground",
    textSizeClasses[size]
  )

  return (
    <div className={logoClasses}>
      <div className={cn(
        iconClasses,
        "relative flex items-center justify-center rounded-full",
        {
          "bg-gradient-to-br from-primary to-secondary": variant === "gradient",
          "bg-primary": variant === "default",
          "bg-white": variant === "white",
          "bg-foreground": variant === "dark",
        }
      )}>
        <div className={cn(
          "font-bold text-xs font-mono",
          {
            "text-white": variant === "gradient" || variant === "default" || variant === "dark",
            "text-primary": variant === "white",
          }
        )}>
          dK
        </div>
      </div>
      {showText && (
        <span className={cn(textClasses, {
          "text-white": variant === "white" || variant === "gradient",
          "text-foreground": variant === "default" || variant === "dark"
        })}>
          Digikraal
        </span>
      )}
    </div>
  )
}
