"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SegmentBuilder } from "@/components/segments/segment-builder"
import { Plus, Users, Filter, MessageSquare, Download } from "lucide-react"
import { mockSegments } from "@/lib/data"

export default function SegmentsPage() {
  const [showSegmentBuilder, setShowSegmentBuilder] = useState(false)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Segments</h1>
            <p className="text-brand-gray-600">Create and manage buyer segments</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={() => setShowSegmentBuilder(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Segment
            </Button>
          </div>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSegments.map((segment) => (
            <Card key={segment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-serif text-brand-black">{segment.name}</CardTitle>
                  <div className="p-2 rounded-lg bg-brand-blue/10">
                    <Users className="h-5 w-5 text-brand-blue" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-black">{segment.contactCount}</span>
                  <span className="text-sm text-brand-gray-600">contacts</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-brand-gray-600">Filters:</h4>
                  <div className="flex flex-wrap gap-1">
                    {segment.filters.map((filter, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        <Filter className="mr-1 h-3 w-3" />
                        {filter.field} {filter.operator} {filter.value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Segment Builder Modal */}
        <SegmentBuilder open={showSegmentBuilder} onOpenChange={setShowSegmentBuilder} />
      </div>
    </MainLayout>
  )
}
