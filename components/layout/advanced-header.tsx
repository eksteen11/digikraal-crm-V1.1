"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Command, Bell, User, Settings, LogOut, Building2, Zap, Globe, Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inbox": "Inbox",
  "/pipeline": "Pipeline",
  "/listings": "Listings",
  "/buyers": "Buyers",
  "/deals": "Deals",
  "/transport": "Transport",
  "/finance": "Finance",
  "/campaigns": "Campaigns",
  "/segments": "Segments",
  "/automations": "Automations",
  "/templates": "Templates",
  "/integrations": "Integrations",
  "/reports": "Reports",
  "/settings": "Settings",
}

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: Building2 },
  { href: "/inbox", label: "Inbox", icon: Bell, badge: "3" },
  { href: "/pipeline", label: "Pipeline", icon: Zap },
  { href: "/listings", label: "Listings", icon: Globe },
]

export function AdvancedHeader() {
  const pathname = usePathname()
  const currentPage = breadcrumbMap[pathname] || "Dashboard"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-glass-border shadow-medium backdrop-blur-xl"
          : "bg-background/80 border-b border-border"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="group">
            <Logo size="md" variant="gradient" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Advanced Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary shadow-soft"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-2 h-5 px-1.5 text-xs gradient-primary text-white border-0">
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Center - Breadcrumb with 3D effect */}
        <div className="hidden md:flex items-center">
          <div className="glass rounded-xl px-4 py-2 border border-glass-border">
            <h1 className="font-sans font-semibold text-lg text-foreground">{currentPage}</h1>
          </div>
        </div>

        {/* Right side - Advanced Controls */}
        <div className="flex items-center space-x-3">
          {/* Enhanced Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
            <Input
              placeholder="Search everything..."
              className="w-80 pl-10 pr-16 glass border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="glass border border-glass-border hover:bg-muted/50 transition-all duration-300"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications with 3D effect */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative glass border border-glass-border hover:bg-muted/50 transition-all duration-300 group"
              >
                <Bell className="h-4 w-4 group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">3</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 glass border-glass-border shadow-large" align="end">
              <DropdownMenuLabel className="font-sans font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                {[
                  { title: "New buyer inquiry", desc: "John Smith interested in Angus cattle", time: "2m ago" },
                  { title: "Deal closed", desc: "R 450,000 transaction completed", time: "1h ago" },
                  { title: "Payment received", desc: "Invoice #INV-2024-001 paid", time: "3h ago" },
                ].map((notification, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="font-medium text-sm">{notification.title}</div>
                    <div className="text-xs text-muted-foreground">{notification.desc}</div>
                    <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Enhanced User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full glass border border-glass-border hover:shadow-medium transition-all duration-300"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                  <AvatarFallback className="gradient-primary text-white font-semibold">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass border-glass-border shadow-large" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                    <AvatarFallback className="gradient-primary text-white font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-sans font-semibold text-sm">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@digikraal.com</p>
                    <Badge className="text-xs gradient-primary text-white border-0">Premium</Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                <User className="mr-3 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                <Settings className="mr-3 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                <Zap className="mr-3 h-4 w-4" />
                <span>Upgrade Plan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-destructive/10 text-destructive transition-colors">
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
