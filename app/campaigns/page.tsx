"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CampaignBuilder } from "@/components/campaigns/campaign-builder"
import { Plus, Play, Pause, BarChart, Filter, Download } from "lucide-react"
import { mockCampaigns } from "@/lib/data"

export default function CampaignsPage() {
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-yellow-100 text-yellow-800",
      paused: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Campaigns</h1>
            <p className="text-brand-gray-600">Create and manage marketing campaigns</p>
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
            <Button
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={() => setShowCampaignBuilder(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockCampaigns.filter((c) => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Messages Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockCampaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (mockCampaigns.reduce((sum, c) => sum + c.responses, 0) /
                    mockCampaigns.reduce((sum, c) => sum + c.sent, 0)) *
                    100,
                )}
                %
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Leads Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockCampaigns.reduce((sum, c) => sum + c.leads, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
                <div className="col-span-3">Campaign Name</div>
                <div className="col-span-2">Segment</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Sent/Total</div>
                <div className="col-span-1">Response</div>
                <div className="col-span-1">Created</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              {mockCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100"
                >
                  <div className="col-span-3">
                    <h4 className="font-medium text-brand-black">{campaign.name}</h4>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">{campaign.segmentName}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">
                      {campaign.sent}/{campaign.total}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-black">
                      {campaign.sent > 0 ? Math.round((campaign.responses / campaign.sent) * 100) : 0}%
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-gray-600">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        {campaign.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Builder Modal */}
        <CampaignBuilder open={showCampaignBuilder} onOpenChange={setShowCampaignBuilder} />
      </div>
    </MainLayout>
  )
}
