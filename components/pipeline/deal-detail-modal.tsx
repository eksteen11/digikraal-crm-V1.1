"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, Calendar, DollarSign, Phone, Mail, MapPin, User, Edit } from "lucide-react"
import type { Deal } from "@/lib/types"
import { mockAccounts, mockListings, mockContacts, mockTasks } from "@/lib/data"

interface DealDetailModalProps {
  deal: Deal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DealDetailModal({ deal, open, onOpenChange }: DealDetailModalProps) {
  if (!deal) return null

  const seller = mockAccounts.find((a) => a.id === deal.sellerAccountId)
  const buyer = mockAccounts.find((a) => a.id === deal.buyerAccountId)
  const listing = mockListings.find((l) => l.id === deal.listingId)
  const sellerContact = mockContacts.find((c) => c.accountId === deal.sellerAccountId)
  const buyerContact = mockContacts.find((c) => c.accountId === deal.buyerAccountId)
  const dealTasks = mockTasks.filter((t) => t.dealId === deal.id)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      lead: "bg-gray-100 text-gray-800",
      qualifying: "bg-blue-100 text-blue-800",
      offer: "bg-yellow-100 text-yellow-800",
      contract: "bg-orange-100 text-orange-800",
      payment: "bg-purple-100 text-purple-800",
      transport: "bg-green-100 text-green-800",
      "closed-won": "bg-green-200 text-green-900",
      "closed-lost": "bg-red-100 text-red-800",
    }
    return colors[stage] || "bg-gray-100 text-gray-800"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">Deal #{deal.id.slice(-6)}</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getStageColor(deal.stage)}>{deal.stage.replace("-", " ").toUpperCase()}</Badge>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deal Overview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Deal Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Value</span>
                  </div>
                  <p className="font-semibold text-lg">{formatCurrency(deal.value)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Expected Close</span>
                  </div>
                  <p className="font-medium">
                    {deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString() : "Not set"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Listing Details */}
            {listing && (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold text-brand-black">Listing Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-brand-gray-600">Species & Breed</p>
                      <p className="font-medium">
                        {listing.species} - {listing.breed}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-gray-600">Quantity</p>
                      <p className="font-medium">{listing.quantity} head</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-gray-600">Age Range</p>
                      <p className="font-medium">{listing.ageMonths} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-gray-600">Location</p>
                      <p className="font-medium">{listing.location}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Tasks */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Tasks ({dealTasks.length})</h3>
              <div className="space-y-2">
                {dealTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-500"
                            : task.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm">{task.title}</span>
                    </div>
                    <div className="text-xs text-brand-gray-600">{new Date(task.due).toLocaleDateString()}</div>
                  </div>
                ))}
                {dealTasks.length > 3 && (
                  <p className="text-sm text-brand-gray-600 text-center">+{dealTasks.length - 3} more tasks</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assigned To */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Assigned To</h3>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-brand-blue text-white">
                    {deal.assignedTo?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{deal.assignedTo || "Unassigned"}</p>
                  <p className="text-sm text-brand-gray-600">Sales Agent</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Seller */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Seller</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-brand-gray-600" />
                  <span className="font-medium">{seller?.name}</span>
                </div>
                {sellerContact && (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{sellerContact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{sellerContact.phone}</span>
                    </div>
                    {sellerContact.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-brand-gray-600" />
                        <span className="text-sm">{sellerContact.email}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-brand-gray-600" />
                  <span className="text-sm">{seller?.region}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Buyer */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Buyer</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-brand-gray-600" />
                  <span className="font-medium">{buyer?.name}</span>
                </div>
                {buyerContact && (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{buyerContact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{buyerContact.phone}</span>
                    </div>
                    {buyerContact.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-brand-gray-600" />
                        <span className="text-sm">{buyerContact.email}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-brand-gray-600" />
                  <span className="text-sm">{buyer?.region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
