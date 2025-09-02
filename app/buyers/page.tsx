"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { BuyersTable } from "@/components/buyers/buyers-table"
import { BuyerDetailModal } from "@/components/buyers/buyer-detail-modal"
import { Plus, Download, Upload, Users } from "lucide-react"
import type { Buyer } from "@/lib/types"

export default function BuyersPage() {
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null)
  const [showBuyerModal, setShowBuyerModal] = useState(false)

  const handleBuyerClick = (buyer: Buyer) => {
    setSelectedBuyer(buyer)
    setShowBuyerModal(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Buyers</h1>
            <p className="text-brand-gray-600">Manage your buyer database</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Segments
            </Button>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Buyer
            </Button>
          </div>
        </div>

        {/* Buyers Table */}
        <BuyersTable onBuyerClick={handleBuyerClick} />

        {/* Buyer Detail Modal */}
        <BuyerDetailModal buyer={selectedBuyer} open={showBuyerModal} onOpenChange={setShowBuyerModal} />
      </div>
    </MainLayout>
  )
}
