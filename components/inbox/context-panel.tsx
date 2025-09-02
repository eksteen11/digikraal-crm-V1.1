"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building, Phone, Mail, MapPin, Calendar, CheckCircle, Clock, Plus } from "lucide-react"
import { mockContacts, mockDeals, mockListings, mockTasks, getAccountById } from "@/lib/data"

interface ContextPanelProps {
  threadId?: string
}

export function ContextPanel({ threadId }: ContextPanelProps) {
  if (!threadId) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-brand-gray-600">
            <User className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">Select a conversation to view contact details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Mock: Get contact from thread (in real app, would fetch from thread data)
  const contact = mockContacts[0] // Using first contact as example
  const account = getAccountById(contact.accountId)

  // Mock: Get related deals and listings
  const relatedDeals = mockDeals.filter(
    (deal) => deal.buyerAccountId === contact.accountId || deal.sellerAccountId === contact.accountId,
  )

  const relatedListings = mockListings.filter((listing) => listing.sellerAccountId === contact.accountId)

  const relatedTasks = mockTasks.filter((task) => relatedDeals.some((deal) => deal.id === task.dealId))

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Contact Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact" className="text-xs">
              Contact
            </TabsTrigger>
            <TabsTrigger value="deals" className="text-xs">
              Deals
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4 mt-4">
            {/* Contact Details */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-brand-blue text-white">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-brand-black">{contact.name}</h3>
                <p className="text-sm text-brand-gray-600">{contact.role}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-gray-600" />
                <span className="text-sm text-brand-black">{contact.phone}</span>
                {contact.whatsappOptIn && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    WhatsApp
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-gray-600" />
                <span className="text-sm text-brand-black">{contact.email}</span>
              </div>

              {account && (
                <>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-black">{account.name}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-brand-gray-600" />
                    <span className="text-sm text-brand-black">{account.region}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {account.type}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        account.kycStatus === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {account.kycStatus}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="deals" className="space-y-3 mt-4">
            {relatedDeals.length > 0 ? (
              relatedDeals.map((deal) => (
                <div key={deal.id} className="p-3 border border-brand-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-brand-black">Deal #{deal.id.split("_")[1]}</span>
                    <Badge variant="secondary" className="text-xs">
                      {deal.stage}
                    </Badge>
                  </div>
                  <p className="text-sm text-brand-gray-600 mb-1">
                    Value: {deal.currency} {deal.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-brand-gray-600">{deal.probability}% probability</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-brand-gray-600">
                <Building className="mx-auto h-6 w-6 mb-2" />
                <p className="text-sm">No related deals</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-brand-black">Related Tasks</span>
              <Button size="sm" variant="outline">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>

            {relatedTasks.length > 0 ? (
              relatedTasks.map((task) => (
                <div key={task.id} className="p-3 border border-brand-gray-100 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-brand-black">{task.title}</span>
                    {task.status === "Done" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-brand-gray-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-brand-gray-600">{new Date(task.due).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-brand-gray-600">
                <Calendar className="mx-auto h-6 w-6 mb-2" />
                <p className="text-sm">No related tasks</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
