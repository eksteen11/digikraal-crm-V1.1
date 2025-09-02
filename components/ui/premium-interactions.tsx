"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Loader2, Check } from "lucide-react"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "premium" | "success" | "loading"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedButton({
  children,
  variant = "default",
  size = "md",
  className,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) {
      setIsLoading(true)
      try {
        await onClick(e)
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-12 px-6 text-lg",
  }

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    premium: "gradient-primary text-white shadow-medium hover:shadow-large",
    success: "bg-green-500 text-white hover:bg-green-600",
    loading: "bg-muted text-muted-foreground cursor-not-allowed",
  }

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95",
        sizeClasses[size],
        variantClasses[isLoading ? "loading" : isSuccess ? "success" : variant],
        className,
      )}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative flex items-center justify-center space-x-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isSuccess && <Check className="w-4 h-4" />}
        {!isLoading && !isSuccess && children}
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </Button>
  )
}

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FloatingCard({ children, className, delay = 0 }: FloatingCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Card
      className={cn(
        "glass border-glass-border shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        isHovered && "scale-105",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}
    </Card>
  )
}

interface PulsingBadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "error"
  pulse?: boolean
}

export function PulsingBadge({ children, variant = "default", pulse = true }: PulsingBadgeProps) {
  const variantClasses = {
    default: "gradient-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white shadow-soft",
          variantClasses[variant],
          pulse && "animate-pulse",
        )}
      >
        {children}
      </div>

      {pulse && (
        <div className={cn("absolute inset-0 rounded-full opacity-30 animate-ping", variantClasses[variant])} />
      )}
    </div>
  )
}

interface InteractiveIconProps {
  icon: React.ComponentType<{ className?: string }>
  onClick?: () => void
  variant?: "default" | "premium" | "danger"
  size?: "sm" | "md" | "lg"
}

export function InteractiveIcon({ icon: Icon, onClick, variant = "default", size = "md" }: InteractiveIconProps) {
  const [isPressed, setIsPressed] = useState(false)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const variantClasses = {
    default: "text-muted-foreground hover:text-foreground",
    premium: "text-primary hover:text-primary/80",
    danger: "text-red-500 hover:text-red-600",
  }

  return (
    <button
      className={cn(
        "p-2 rounded-xl glass border border-glass-border transition-all duration-200 hover:shadow-medium group",
        isPressed && "scale-90",
      )}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <Icon
        className={cn(sizeClasses[size], variantClasses[variant], "transition-all duration-200 group-hover:scale-110")}
      />
    </button>
  )
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className="flex items-center justify-center">
      <div className={cn("animate-spin rounded-full border-2 border-muted border-t-primary", sizeClasses[size])} />
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  animated?: boolean
}

export function ProgressBar({ value, max = 100, className, animated = true }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn("w-full bg-muted rounded-full h-2 overflow-hidden", className)}>
      <div
        className={cn(
          "h-full gradient-primary rounded-full transition-all duration-500 ease-out",
          animated && "animate-pulse",
        )}
        style={{ width: `${percentage}%` }}
      >
        <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    </div>
  )
}
