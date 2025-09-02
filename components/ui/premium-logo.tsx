"use client"

import { cn } from "@/lib/utils"

interface PremiumLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "gradient" | "white" | "dark"
  showText?: boolean
  className?: string
  href?: string
}

export function PremiumLogo({ 
  size = "md", 
  variant = "default", 
  showText = true, 
  className,
  href 
}: PremiumLogoProps) {
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

  const logoVariants = {
    default: "bg-gradient-to-br from-primary to-secondary text-white",
    gradient: "bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white shadow-lg",
    white: "bg-white text-primary border-2 border-primary/20",
    dark: "bg-gray-900 text-white"
  }

  const textVariants = {
    default: "text-foreground",
    gradient: "text-white",
    white: "text-primary", 
    dark: "text-white"
  }

  const LogoContent = () => (
    <div className={cn("flex items-center space-x-3 group", className)}>
      {/* Circular Logo */}
      <div className={cn(
        "flex-shrink-0 relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105",
        sizeClasses[size],
        logoVariants[variant]
      )}>
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* dK Letters */}
        <div className="relative z-10 font-bold text-xs font-mono tracking-tight">
          dK
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span className={cn(
          "font-sans font-semibold tracking-wide transition-colors duration-300",
          textSizeClasses[size],
          textVariants[variant]
        )}>
          digikraal
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        <LogoContent />
      </a>
    )
  }

  return <LogoContent />
}

// Export for easy importing
export { PremiumLogo as Logo }
