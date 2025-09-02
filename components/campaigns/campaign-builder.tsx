"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, MessageSquare, Send, Eye } from "lucide-react"
import { mockSegments, mockTemplates } from "@/lib/data"
import { showToast } from "@/lib/utils/toast"

interface CampaignBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CampaignBuilder({ open, onOpenChange }: CampaignBuilderProps) {
  const [step, setStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    segmentId: "",
    templateId: "",
    channel: "whatsapp",
    scheduledFor: "",
    message: "",
  })

  const selectedSegment = mockSegments.find((s) => s.id === campaignData.segmentId)
  const selectedTemplate = mockTemplates.find((t) => t.id === campaignData.templateId)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSave = () => {
    showToast("Campaign created successfully", "success")
    onOpenChange(false)
    setStep(1)
    setCampaignData({
      name: "",
      description: "",
      segmentId: "",
      templateId: "",
      channel: "whatsapp",
      scheduledFor: "",
      message: "",
    })
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find((t) => t.id === templateId)
    setCampaignData({
      ...campaignData,
      templateId,
      message: template?.content || "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Create Campaign</DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? "bg-brand-orange text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i}
                </div>
                {i < 4 && <div className={`w-8 h-0.5 ${i < step ? "bg-brand-orange" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Campaign Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={campaignData.description}
                    onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                    placeholder="Describe your campaign"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="channel">Channel</Label>
                  <Select
                    value={campaignData.channel}
                    onValueChange={(value) => setCampaignData({ ...campaignData, channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Select Audience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSegments.map((segment) => (
                  <Card
                    key={segment.id}
                    className={`cursor-pointer transition-all ${
                      campaignData.segmentId === segment.id ? "ring-2 ring-brand-orange" : "hover:shadow-md"
                    }`}
                    onClick={() => setCampaignData({ ...campaignData, segmentId: segment.id })}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{segment.name}</CardTitle>
                        <Users className="h-4 w-4 text-brand-gray-600" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-brand-black">{segment.contactCount}</div>
                        <div className="text-xs text-brand-gray-600">contacts</div>
                        <div className="flex flex-wrap gap-1">
                          {segment.criteria.slice(0, 2).map((criteria, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {criteria}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Message */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-black">Create Message</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Choose Template (Optional)</Label>
                    <Select value={campaignData.templateId} onValueChange={handleTemplateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTemplates
                          .filter((t) => t.channel === campaignData.channel)
                          .map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea
                      id="message"
                      value={campaignData.message}
                      onChange={(e) => setCampaignData({ ...campaignData, message: e.target.value })}
                      placeholder="Write your message here..."
                      rows={8}
                    />
                    <div className="text-xs text-brand-gray-600 mt-1">
                      Use variables like {"{"}
                      {"{"}name{"}"}, {"{"}company{"}"}, {"{"}listing{"}"}
                      {"}"} for personalization
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-brand-black">Preview</h4>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">WhatsApp Message</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-brand-black">
                            {campaignData.message.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
                              const replacements: Record<string, string> = {
                                name: "John Smith",
                                company: "Smith Farms",
                                listing: "Black Angus Cattle",
                              }
                              return replacements[variable] || match
                            }) || "Your message will appear here..."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Schedule & Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-brand-black">Schedule & Review</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="schedule">Send Time</Label>
                    <Select
                      value={campaignData.scheduledFor}
                      onValueChange={(value) => setCampaignData({ ...campaignData, scheduledFor: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose when to send" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">Send Now</SelectItem>
                        <SelectItem value="1hour">In 1 Hour</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow 9 AM</SelectItem>
                        <SelectItem value="custom">Custom Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Campaign Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray-600">Name:</span>
                      <span className="font-medium">{campaignData.name || "Untitled"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray-600">Channel:</span>
                      <span className="font-medium capitalize">{campaignData.channel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray-600">Audience:</span>
                      <span className="font-medium">{selectedSegment?.name || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-gray-600">Recipients:</span>
                      <span className="font-medium">{selectedSegment?.contactCount || 0}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-medium">
                      <span>Estimated Cost:</span>
                      <span>R {((selectedSegment?.contactCount || 0) * 0.5).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
              Previous
            </Button>
            <div className="flex space-x-2">
              {step < 4 ? (
                <Button onClick={handleNext} disabled={!campaignData.name || (step === 2 && !campaignData.segmentId)}>
                  Next
                </Button>
              ) : (
                <>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSave} className="bg-brand-orange hover:bg-brand-orange/90">
                    <Send className="h-4 w-4 mr-2" />
                    {campaignData.scheduledFor === "now" ? "Send Now" : "Schedule"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
