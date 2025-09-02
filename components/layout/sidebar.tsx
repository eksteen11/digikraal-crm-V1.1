"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Pipeline", href: "/pipeline", icon: BarChart3 },
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

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col glass border-r border-glass-border shadow-soft">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-glass-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-sans font-bold text-sm">D</span>
          </div>
          <span className="font-sans font-bold text-xl text-foreground">Digikraal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-10 px-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "gradient-primary text-white shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
