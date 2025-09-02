"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Inbox,
  BarChart3,
  Building2,
  Users,
  HandCoins,
  Truck,
  CreditCard,
  Megaphone,
  Target,
  Zap,
  MessageSquare,
  Puzzle,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Inbox", href: "/inbox", icon: Inbox, badge: "3" },
  { name: "Pipeline", href: "/pipeline", icon: BarChart3, badge: "8" },
  { name: "Listings", href: "/listings", icon: Building2 },
  { name: "Buyers", href: "/buyers", icon: Users },
  { name: "Deals", href: "/deals", icon: HandCoins },
  { name: "Transport", href: "/transport", icon: Truck },
  { name: "Finance", href: "/finance", icon: CreditCard },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Segments", href: "/segments", icon: Target },
  { name: "Automations", href: "/automations", icon: Zap },
  { name: "Templates", href: "/templates", icon: MessageSquare },
  { name: "Integrations", href: "/integrations", icon: Puzzle },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Settings", href: "/settings", icon: Settings },
]

const navigationGroups = [
  {
    title: "Core",
    items: navigation.slice(0, 6),
  },
  {
    title: "Operations",
    items: navigation.slice(6, 8),
  },
  {
    title: "Marketing",
    items: navigation.slice(8, 12),
  },
  {
    title: "System",
    items: navigation.slice(12),
  },
]

export function AdvancedSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-full flex-col glass border-r border-glass-border shadow-medium transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-glass-border">
        {!isCollapsed && (
          <Link href="/" className="group">
            <Logo size="md" variant="gradient" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
          </Link>
        )}
        {isCollapsed && (
          <Logo size="md" variant="gradient" showText={false} />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 glass border border-glass-border hover:bg-muted/50 transition-all duration-300"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-11 px-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        isActive
                          ? "gradient-primary text-white shadow-soft hover:shadow-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        isCollapsed && "justify-center px-0",
                      )}
                    >
                      <item.icon
                        className={cn("h-5 w-5 transition-transform duration-300", isActive && "group-hover:scale-110")}
                      />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <Badge
                              className={cn(
                                "ml-auto h-5 px-1.5 text-xs border-0",
                                isActive ? "bg-white/20 text-white" : "gradient-primary text-white",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-glass-border">
          <div className="glass rounded-xl p-4 border border-glass-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-sans font-semibold text-sm text-foreground">Premium Plan</div>
                <div className="text-xs text-muted-foreground">Unlimited access</div>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full gradient-primary text-white shadow-soft hover:shadow-medium transition-all duration-300"
            >
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
