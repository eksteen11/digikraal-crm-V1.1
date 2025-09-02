"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MessageSquare, Mail, Copy } from "lucide-react"
import { mockTemplates } from "@/lib/data"
import { showToast } from "@/lib/utils/toast"

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [channelFilter, setChannelFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChannel = channelFilter === "all" || template.channel === channelFilter
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

    return matchesSearch && matchesChannel && matchesCategory
  })

  const handleUseTemplate = (template: any) => {
    showToast(`Template "${template.name}" copied to clipboard`, "success")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Templates</h1>
            <p className="text-brand-gray-600">Manage message templates and snippets</p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-600" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="onboarding">Onboarding</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="notifications">Notifications</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const Icon = template.channel === "whatsapp" ? MessageSquare : Mail
            const iconColor = template.channel === "whatsapp" ? "text-green-600" : "text-blue-600"

            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-serif text-brand-black">{template.name}</CardTitle>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {template.channel}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-brand-gray-100/30 p-3 rounded-lg">
                    <p className="text-sm text-brand-gray-600 line-clamp-3">{template.content}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleUseTemplate(template)}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-gray-400">No templates found matching your criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
