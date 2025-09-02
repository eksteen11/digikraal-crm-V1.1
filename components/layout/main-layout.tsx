import type React from "react"
import { AdvancedSidebar } from "./advanced-sidebar"
import { AdvancedHeader } from "./advanced-header"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-card to-muted">
      <AdvancedSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdvancedHeader />
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background/50 to-muted/30">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
