"use client"

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
import { Search, Command, Bell, User, Settings, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"

const breadcrumbMap: Record<string, string> = {
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

export function Header() {
  const pathname = usePathname()
  const currentPage = breadcrumbMap[pathname] || "Dashboard"

  return (
    <header className="flex h-16 items-center justify-between glass border-b border-glass-border px-6 shadow-soft">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center space-x-4">
        <h1 className="font-sans font-bold text-2xl text-foreground">{currentPage}</h1>
      </div>

      {/* Right side - Search and User Menu */}
      <div className="flex items-center space-x-4">
        {/* Search with Command Palette */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search... (⌘K)"
            className="w-80 pl-10 pr-4 glass border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground glass border border-glass-border"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full glass border border-glass-border">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback className="gradient-primary text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass border-glass-border shadow-large" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john@digikraal.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
