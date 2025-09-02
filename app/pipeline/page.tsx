"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/pipeline/kanban-board"
import { DealDetailModal } from "@/components/pipeline/deal-detail-modal"
import { Plus, Filter, Download } from "lucide-react"
import type { Deal } from "@/lib/types"

export default function PipelinePage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [showDealModal, setShowDealModal] = useState(false)

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal)
    setShowDealModal(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Pipeline</h1>
            <p className="text-brand-gray-600">Track deals through your sales process</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Deal
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard onDealClick={handleDealClick} />

        {/* Deal Detail Modal */}
        <DealDetailModal deal={selectedDeal} open={showDealModal} onOpenChange={setShowDealModal} />
      </div>
    </MainLayout>
  )
}
