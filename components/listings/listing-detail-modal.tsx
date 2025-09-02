"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Calendar, DollarSign, Phone, Mail, User, Building2, Edit, MessageSquare } from "lucide-react"
import type { Listing } from "@/lib/types"
import { mockAccounts, mockContacts, mockOffers } from "@/lib/data"

interface ListingDetailModalProps {
  listing: Listing | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ListingDetailModal({ listing, open, onOpenChange }: ListingDetailModalProps) {
  if (!listing) return null

  const seller = mockAccounts.find((a) => a.id === listing.sellerAccountId)
  const sellerContact = mockContacts.find((c) => c.accountId === listing.sellerAccountId)
  const listingOffers = mockOffers.filter((o) => o.listingId === listing.id)

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

  const getOfferStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      countered: "bg-blue-100 text-blue-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">
              {listing.species} - {listing.breed}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(listing.status)}>{listing.status.toUpperCase()}</Badge>
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
            {/* Livestock Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Livestock Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Species</span>
                  </div>
                  <p className="font-medium">{listing.species}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Breed</span>
                  </div>
                  <p className="font-medium">{listing.breed}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Quantity</span>
                  </div>
                  <p className="font-medium">{listing.quantity} head</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Age</span>
                  </div>
                  <p className="font-medium">{listing.ageMonths} months</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Sex</span>
                  </div>
                  <p className="font-medium">{listing.sex}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-brand-gray-600">Weight Range</span>
                  </div>
                  <p className="font-medium">{listing.weightKg}kg avg</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing & Location */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Pricing & Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Price per Head</span>
                  </div>
                  <p className="font-semibold text-lg">{formatCurrency(listing.pricePerHead)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Total Value</span>
                  </div>
                  <p className="font-semibold text-lg">{formatCurrency(listing.pricePerHead * listing.quantity)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Location</span>
                  </div>
                  <p className="font-medium">{listing.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-gray-600">Available From</span>
                  </div>
                  <p className="font-medium">{new Date(listing.availableFrom).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Offers */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Offers ({listingOffers.length})</h3>
              <div className="space-y-3">
                {listingOffers.slice(0, 3).map((offer) => {
                  const buyerAccount = mockAccounts.find((a) => a.id === offer.buyerAccountId)
                  return (
                    <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-brand-blue text-white text-xs">
                            {buyerAccount?.name.charAt(0) || "B"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{buyerAccount?.name}</p>
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
                  )
                })}
                {listingOffers.length > 3 && (
                  <p className="text-sm text-brand-gray-600 text-center">+{listingOffers.length - 3} more offers</p>
                )}
                {listingOffers.length === 0 && (
                  <p className="text-sm text-brand-gray-400 text-center py-4">No offers yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Information */}
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
              <Button className="w-full" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
            </div>

            <Separator />

            {/* Additional Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-brand-black">Additional Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Pregnancy Status:</span>
                  <span>{listing.pregnancyStatus || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Health Status:</span>
                  <span className="text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Vaccination:</span>
                  <span className="text-green-600">Up to date</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray-600">Listed:</span>
                  <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
