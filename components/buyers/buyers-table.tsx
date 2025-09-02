"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, MapPin } from "lucide-react"
import type { Buyer } from "@/lib/types"
import { mockBuyers, mockAccounts } from "@/lib/data"
import { showToast } from "@/lib/utils/toast"

interface BuyersTableProps {
  onBuyerClick: (buyer: Buyer) => void
}

export function BuyersTable({ onBuyerClick }: BuyersTableProps) {
  const [buyers, setBuyers] = useState<Buyer[]>(mockBuyers)
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [tagFilter, setTagFilter] = useState<string>("all")

  const filteredBuyers = buyers.filter((buyer) => {
    const account = mockAccounts.find((a) => a.id === buyer.accountId)
    const requirementsText = `${buyer.requirements.species.join(", ")} ${buyer.requirements.breed.join(", ")} ${buyer.requirements.weightRange}`
    const matchesSearch =
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requirementsText.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRegion = regionFilter === "all" || buyer.region === regionFilter
    const matchesTag = tagFilter === "all" || buyer.tags.includes(tagFilter)

    return matchesSearch && matchesRegion && matchesTag
  })

  const getAccountName = (accountId: string) => {
    const account = mockAccounts.find((a) => a.id === accountId)
    return account?.name || "Unknown Account"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      premium: "bg-purple-100 text-purple-800",
      active: "bg-green-100 text-green-800",
      vip: "bg-yellow-100 text-yellow-800",
      bulk: "bg-blue-100 text-blue-800",
      regular: "bg-gray-100 text-gray-800",
    }
    return colors[tag.toLowerCase()] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-600" />
              <Input
                placeholder="Search buyers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Gauteng">Gauteng</SelectItem>
                <SelectItem value="Western Cape">Western Cape</SelectItem>
                <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                <SelectItem value="Free State">Free State</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="bulk">Bulk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Buyers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Buyers ({filteredBuyers.length})</CardTitle>
            <div className="text-sm text-brand-gray-600">
              Avg Budget:{" "}
              {formatCurrency(filteredBuyers.reduce((sum, b) => sum + b.requirements.budget, 0) / filteredBuyers.length || 0)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
              <div className="col-span-3">Buyer Details</div>
              <div className="col-span-2">Region</div>
              <div className="col-span-2">Requirements</div>
              <div className="col-span-2">Budget Range</div>
              <div className="col-span-2">Tags</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onBuyerClick(buyer)}
              >
                <div className="col-span-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-brand-orange text-white text-xs">
                        {buyer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-brand-black">{buyer.name}</h4>
                      <p className="text-sm text-brand-gray-600">{getAccountName(buyer.accountId)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-brand-gray-600" />
                    <span className="text-sm text-brand-black">{buyer.region}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-brand-black">
                    {buyer.requirements.breed.slice(0, 2).join(", ")}
                    {buyer.requirements.breed.length > 2 && "..."}
                  </div>
                  <div className="text-xs text-brand-gray-600">
                    {buyer.requirements.qty} head, {buyer.requirements.weightRange}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-brand-black">
                    {formatCurrency(buyer.requirements.budget)}
                  </span>
                  <div className="text-xs text-brand-gray-600">
                    {buyer.requirements.deliveryWindow}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {buyer.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                        {tag}
                      </Badge>
                    ))}
                    {buyer.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{buyer.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onBuyerClick(buyer)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        showToast("Edit functionality coming soon", "info")
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredBuyers.length === 0 && (
              <div className="text-center py-8 text-brand-gray-400">
                <p>No buyers found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
