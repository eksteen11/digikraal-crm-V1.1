"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Phone, Mail, User, Building2, Edit, MessageSquare, Calendar, Tag } from "lucide-react"
import type { Buyer } from "@/lib/types"
import { mockAccounts, mockContacts, mockOffers, mockDeals } from "@/lib/data"

interface BuyerDetailModalProps {
  buyer: Buyer | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BuyerDetailModal({ buyer, open, onOpenChange }: BuyerDetailModalProps) {
  if (!buyer) return null

  const account = mockAccounts.find((a) => a.id === buyer.accountId)
  const contact = mockContacts.find((c) => c.accountId === buyer.accountId)
  const buyerOffers = mockOffers.filter((o) => o.buyerAccountId === buyer.accountId)
  const buyerDeals = mockDeals.filter((d) => d.buyerAccountId === buyer.accountId)

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

  const getOfferStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      countered: "bg-blue-100 text-blue-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const totalSpent = buyerDeals.filter((d) => d.stage === "closed-won").reduce((sum, deal) => sum + deal.value, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">{buyer.name}</DialogTitle>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {buyer.tags.map((tag) => (
                  <Badge key={tag} className={getTagColor(tag)}>
                    {tag}
                  </Badge>
                ))}
              </div>
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
            {/* Buyer Overview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Buyer Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Budget Range</span>
                  </div>
                  <p className="font-semibold text-lg">
                    {formatCurrency(buyer.budgetMin)} - {formatCurrency(buyer.budgetMax)}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Total Spent</span>
                  </div>
                  <p className="font-semibold text-lg">{formatCurrency(totalSpent)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Region</span>
                  </div>
                  <p className="font-medium">{buyer.region}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Member Since</span>
                  </div>
                  <p className="font-medium">{new Date(buyer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {buyer.requirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Recent Offers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Recent Offers ({buyerOffers.length})</h3>
              <div className="space-y-3">
                {buyerOffers.slice(0, 3).map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-sm">Offer #{offer.id.slice(-6)}</p>
                        <p className="text-xs text-brand-gray-600">
                          {formatCurrency(offer.price)} for {offer.qty} head
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getOfferStatusColor(offer.status)}>{offer.status}</Badge>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {buyerOffers.length > 3 && (
                  <p className="text-sm text-brand-gray-600 text-center">+{buyerOffers.length - 3} more offers</p>
                )}
                {buyerOffers.length === 0 && (
                  <p className="text-sm text-brand-gray-400 text-center py-4">No offers yet</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Deal History */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Deal History ({buyerDeals.length})</h3>
              <div className="space-y-3">
                {buyerDeals.slice(0, 3).map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Deal #{deal.id.slice(-6)}</p>
                      <p className="text-xs text-brand-gray-600">
                        {formatCurrency(deal.value)} • {deal.stage.replace("-", " ")}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
                {buyerDeals.length > 3 && (
                  <p className="text-sm text-brand-gray-600 text-center">+{buyerDeals.length - 3} more deals</p>
                )}
                {buyerDeals.length === 0 && (
                  <p className="text-sm text-brand-gray-400 text-center py-4">No deals yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-brand-gray-600" />
                  <span className="font-medium">{account?.name}</span>
                </div>
                {contact && (
                  <>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-brand-gray-600" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-brand-gray-600" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <Button className="w-full" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Buyer
              </Button>
            </div>

            <Separator />

            {/* Account Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Account Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Account Type:</span>
                  <span>{account?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">KYC Status:</span>
                  <Badge variant={account?.kycStatus === "verified" ? "default" : "secondary"} className="text-xs">
                    {account?.kycStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Total Offers:</span>
                  <span>{buyerOffers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Active Deals:</span>
                  <span>{buyerDeals.filter((d) => !["closed-won", "closed-lost"].includes(d.stage)).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Success Rate:</span>
                  <span>
                    {buyerDeals.length > 0
                      ? Math.round(
                          (buyerDeals.filter((d) => d.stage === "closed-won").length / buyerDeals.length) * 100,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {buyer.tags.map((tag) => (
                  <Badge key={tag} className={getTagColor(tag)}>
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
