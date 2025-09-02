"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ListingsTable } from "@/components/listings/listings-table"
import { ListingDetailModal } from "@/components/listings/listing-detail-modal"
import { Plus, Download, Upload } from "lucide-react"
import type { Listing } from "@/lib/types"

export default function ListingsPage() {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [showListingModal, setShowListingModal] = useState(false)

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing)
    setShowListingModal(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Listings</h1>
            <p className="text-brand-gray-600">Browse and manage livestock listings</p>
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
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Listing
            </Button>
          </div>
        </div>

        {/* Listings Table */}
        <ListingsTable onListingClick={handleListingClick} />

        {/* Listing Detail Modal */}
        <ListingDetailModal listing={selectedListing} open={showListingModal} onOpenChange={setShowListingModal} />
      </div>
    </MainLayout>
  )
}
