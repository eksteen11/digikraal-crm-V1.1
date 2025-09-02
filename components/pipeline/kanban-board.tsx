"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, DollarSign, User, Building2, Truck, FileText } from "lucide-react"
import type { Deal, DealStage } from "@/lib/types"
import { mockDeals, mockAccounts, mockListings } from "@/lib/data"
import { showToast } from "@/lib/utils/toast"

const stageConfig: Record<DealStage, { color: string; bgColor: string; icon: any }> = {
  lead: { color: "text-gray-600", bgColor: "bg-gray-50", icon: User },
  qualifying: { color: "text-blue-600", bgColor: "bg-blue-50", icon: FileText },
  offer: { color: "text-yellow-600", bgColor: "bg-yellow-50", icon: DollarSign },
  contract: { color: "text-orange-600", bgColor: "bg-orange-50", icon: FileText },
  payment: { color: "text-purple-600", bgColor: "bg-purple-50", icon: DollarSign },
  transport: { color: "text-green-600", bgColor: "bg-green-50", icon: Truck },
  "closed-won": { color: "text-green-700", bgColor: "bg-green-100", icon: DollarSign },
  "closed-lost": { color: "text-red-600", bgColor: "bg-red-50", icon: User },
}

interface DealCardProps {
  deal: Deal
  onDealClick: (deal: Deal) => void
}

function DealCard({ deal, onDealClick }: DealCardProps) {
  const seller = mockAccounts.find((a) => a.id === deal.sellerAccountId)
  const buyer = mockAccounts.find((a) => a.id === deal.buyerAccountId)
  const listing = mockListings.find((l) => l.id === deal.listingId)
  const config = stageConfig[deal.stage]
  const Icon = config.icon

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getDaysInStage = () => {
    const daysSinceUpdate = Math.floor((Date.now() - new Date(deal.updatedAt).getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceUpdate
  }

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${config.bgColor} border-gray-200`}
      onClick={() => onDealClick(deal)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <h4 className="font-medium text-sm text-brand-black">Deal #{deal.id.slice(-6)}</h4>
        </div>
        <Badge variant="outline" className="text-xs">
          {getDaysInStage()}d
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-brand-gray-600">
          <div className="flex items-center space-x-1">
            <Building2 className="h-3 w-3" />
            <span>
              {seller?.name} → {buyer?.name}
            </span>
          </div>
        </div>

        {listing && (
          <div className="text-xs text-brand-gray-600">
            {listing.species} • {listing.breed} • {listing.quantity} head
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-black">{formatCurrency(deal.value)}</span>
          <div className="flex items-center space-x-1">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs bg-brand-blue text-white">
                {deal.assignedTo?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {deal.expectedCloseDate && (
          <div className="flex items-center space-x-1 text-xs text-brand-gray-600">
            <Calendar className="h-3 w-3" />
            <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface KanbanBoardProps {
  onDealClick: (deal: Deal) => void
}

export function KanbanBoard({ onDealClick }: KanbanBoardProps) {
  const [deals, setDeals] = useState<Deal[]>(mockDeals)

  const stages: { key: DealStage; name: string }[] = [
    { key: "lead", name: "Lead" },
    { key: "qualifying", name: "Qualifying" },
    { key: "offer", name: "Offer" },
    { key: "contract", name: "Contract" },
    { key: "payment", name: "Payment" },
    { key: "transport", name: "Transport" },
    { key: "closed-won", name: "Closed Won" },
    { key: "closed-lost", name: "Closed Lost" },
  ]

  const getDealsByStage = (stage: DealStage) => {
    return deals.filter((deal) => deal.stage === stage)
  }

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    e.dataTransfer.setData("text/plain", deal.id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault()
    const dealId = e.dataTransfer.getData("text/plain")

    setDeals((prevDeals) =>
      prevDeals.map((deal) =>
        deal.id === dealId ? { ...deal, stage: targetStage, updatedAt: new Date().toISOString() } : deal,
      ),
    )

    showToast("Deal moved successfully", "success")
  }

  const getTotalValue = (stage: DealStage) => {
    const stageDeals = getDealsByStage(stage)
    const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(total)
  }

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const stageDeals = getDealsByStage(stage.key)
        const config = stageConfig[stage.key]

        return (
          <Card
            key={stage.key}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-sm font-medium text-brand-black">{stage.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {stageDeals.length}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-brand-gray-600 font-medium">{getTotalValue(stage.key)}</div>
            </CardHeader>
            <CardContent className="space-y-3 min-h-[200px]">
              {stageDeals.map((deal) => (
                <div key={deal.id} draggable onDragStart={(e) => handleDragStart(e, deal)}>
                  <DealCard deal={deal} onDealClick={onDealClick} />
                </div>
              ))}
              {stageDeals.length === 0 && (
                <div className="text-center py-8 text-brand-gray-400">
                  <p className="text-sm">No deals in this stage</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
