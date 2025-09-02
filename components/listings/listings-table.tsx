"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, MapPin } from "lucide-react"
import type { Listing } from "@/lib/types"
import { mockListings, mockAccounts } from "@/lib/data"
import { showToast } from "@/lib/utils/toast"

interface ListingsTableProps {
  onListingClick: (listing: Listing) => void
}

export function ListingsTable({ onListingClick }: ListingsTableProps) {
  const [listings, setListings] = useState<Listing[]>(mockListings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [speciesFilter, setSpeciesFilter] = useState<string>("all")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || listing.status === statusFilter
    const matchesSpecies = speciesFilter === "all" || listing.species === speciesFilter

    return matchesSearch && matchesStatus && matchesSpecies
  })

  const getSellerName = (sellerAccountId: string) => {
    const seller = mockAccounts.find((a) => a.id === sellerAccountId)
    return seller?.name || "Unknown Seller"
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      sold: "bg-blue-100 text-blue-800",
      expired: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const handleStatusChange = (listingId: string, newStatus: string) => {
    setListings((prev) =>
      prev.map((listing) => (listing.id === listingId ? { ...listing, status: newStatus as any } : listing)),
    )
    showToast("Listing status updated", "success")
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
                placeholder="Search listings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Species</SelectItem>
                <SelectItem value="Cattle">Cattle</SelectItem>
                <SelectItem value="Sheep">Sheep</SelectItem>
                <SelectItem value="Goats">Goats</SelectItem>
                <SelectItem value="Pigs">Pigs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Listings ({filteredListings.length})</CardTitle>
            <div className="text-sm text-brand-gray-600">
              Total Value: {formatCurrency(filteredListings.reduce((sum, l) => sum + l.pricePerHead * l.quantity, 0))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
              <div className="col-span-3">Listing Details</div>
              <div className="col-span-2">Species/Breed</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-1">Quantity</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onListingClick(listing)}
              >
                <div className="col-span-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-brand-blue text-white text-xs">
                        {listing.species.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-brand-black">
                        {listing.species} - {listing.breed}
                      </h4>
                      <p className="text-sm text-brand-gray-600">{getSellerName(listing.sellerAccountId)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-brand-black">{listing.species}</span>
                  <p className="text-xs text-brand-gray-600">{listing.breed}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-brand-gray-600" />
                    <span className="text-sm text-brand-black">{listing.location}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <span className="text-sm text-brand-black">{listing.quantity} head</span>
                  <p className="text-xs text-brand-gray-600">{listing.ageMonths}mo</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-brand-black">
                    {formatCurrency(listing.pricePerHead)}/head
                  </span>
                  <p className="text-xs text-brand-gray-600">
                    Total: {formatCurrency(listing.pricePerHead * listing.quantity)}
                  </p>
                </div>
                <div className="col-span-1">
                  <Badge className={getStatusColor(listing.status)}>{listing.status}</Badge>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onListingClick(listing)
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

            {filteredListings.length === 0 && (
              <div className="text-center py-8 text-brand-gray-400">
                <p>No listings found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
