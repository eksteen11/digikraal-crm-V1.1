"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Users, Filter } from "lucide-react"
import { showToast } from "@/lib/utils/toast"

interface SegmentBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FilterRule {
  id: string
  field: string
  operator: string
  value: string
}

export function SegmentBuilder({ open, onOpenChange }: SegmentBuilderProps) {
  const [segmentName, setSegmentName] = useState("")
  const [description, setDescription] = useState("")
  const [filters, setFilters] = useState<FilterRule[]>([{ id: "1", field: "", operator: "", value: "" }])
  const [estimatedCount, setEstimatedCount] = useState(0)

  const fieldOptions = [
    { value: "region", label: "Region" },
    { value: "budget_min", label: "Budget Min" },
    { value: "budget_max", label: "Budget Max" },
    { value: "requirements", label: "Requirements" },
    { value: "tags", label: "Tags" },
    { value: "created_at", label: "Created Date" },
    { value: "last_activity", label: "Last Activity" },
    { value: "deal_count", label: "Deal Count" },
    { value: "total_spent", label: "Total Spent" },
  ]

  const operatorOptions: Record<string, { value: string; label: string }[]> = {
    region: [
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Not Equals" },
    ],
    budget_min: [
      { value: "greater_than", label: "Greater Than" },
      { value: "less_than", label: "Less Than" },
      { value: "equals", label: "Equals" },
    ],
    budget_max: [
      { value: "greater_than", label: "Greater Than" },
      { value: "less_than", label: "Less Than" },
      { value: "equals", label: "Equals" },
    ],
    requirements: [
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does Not Contain" },
    ],
    tags: [
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does Not Contain" },
    ],
    created_at: [
      { value: "after", label: "After" },
      { value: "before", label: "Before" },
      { value: "between", label: "Between" },
    ],
    last_activity: [
      { value: "within", label: "Within Last" },
      { value: "not_within", label: "Not Within Last" },
    ],
    deal_count: [
      { value: "greater_than", label: "Greater Than" },
      { value: "less_than", label: "Less Than" },
      { value: "equals", label: "Equals" },
    ],
    total_spent: [
      { value: "greater_than", label: "Greater Than" },
      { value: "less_than", label: "Less Than" },
      { value: "between", label: "Between" },
    ],
  }

  const addFilter = () => {
    setFilters([...filters, { id: Date.now().toString(), field: "", operator: "", value: "" }])
  }

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id))
  }

  const updateFilter = (id: string, field: keyof FilterRule, value: string) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
    // Simulate count estimation
    setEstimatedCount(Math.floor(Math.random() * 200) + 50)
  }

  const handleSave = () => {
    showToast("Segment created successfully", "success")
    onOpenChange(false)
    setSegmentName("")
    setDescription("")
    setFilters([{ id: "1", field: "", operator: "", value: "" }])
    setEstimatedCount(0)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Create Segment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-black">Segment Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Segment Name</Label>
                <Input
                  id="name"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  placeholder="Enter segment name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this segment"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-brand-black">Filter Conditions</h3>
              <Button variant="outline" size="sm" onClick={addFilter}>
                <Plus className="h-4 w-4 mr-2" />
                Add Filter
              </Button>
            </div>

            <div className="space-y-3">
              {filters.map((filter, index) => (
                <Card key={filter.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-3">
                      {index > 0 && <div className="text-sm font-medium text-brand-gray-600 w-12">AND</div>}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Select value={filter.field} onValueChange={(value) => updateFilter(filter.id, "field", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {fieldOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={filter.operator}
                          onValueChange={(value) => updateFilter(filter.id, "operator", value)}
                          disabled={!filter.field}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {(operatorOptions[filter.field] || []).map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                          placeholder="Value"
                          disabled={!filter.operator}
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFilter(filter.id)}
                          disabled={filters.length === 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-black">Segment Preview</h3>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-blue/10 rounded-lg">
                      <Users className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-black">{segmentName || "Untitled Segment"}</h4>
                      <p className="text-sm text-brand-gray-600">{description || "No description"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-black">{estimatedCount}</div>
                    <div className="text-sm text-brand-gray-600">estimated contacts</div>
                  </div>
                </div>

                {filters.some((f) => f.field && f.operator && f.value) && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {filters
                        .filter((f) => f.field && f.operator && f.value)
                        .map((filter) => (
                          <Badge key={filter.id} variant="secondary" className="text-xs">
                            <Filter className="h-3 w-3 mr-1" />
                            {fieldOptions.find((f) => f.value === filter.field)?.label}{" "}
                            {filter.operator.replace("_", " ")} {filter.value}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!segmentName || !filters.some((f) => f.field && f.operator && f.value)}
            >
              Create Segment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
