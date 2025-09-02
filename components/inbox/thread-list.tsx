"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Mail, Globe, Search } from "lucide-react"
import { mockMessages, getContactById } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ThreadListProps {
  selectedThreadId?: string
  onThreadSelect: (threadId: string) => void
}

export function ThreadList({ selectedThreadId, onThreadSelect }: ThreadListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  // Group messages by thread
  const threads = mockMessages.reduce((acc, message) => {
    if (!acc[message.threadId]) {
      acc[message.threadId] = {
        id: message.threadId,
        messages: [],
        lastMessage: message,
        contact: getContactById(message.contactId),
        channel: message.channel,
        unread: Math.random() > 0.5, // Mock unread status
        assignedAgent: message.agentId,
      }
    }
    acc[message.threadId].messages.push(message)
    // Keep the latest message as lastMessage
    if (new Date(message.timestamp) > new Date(acc[message.threadId].lastMessage.timestamp)) {
      acc[message.threadId].lastMessage = message
    }
    return acc
  }, {} as any)

  const threadList = Object.values(threads) as any[]

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case "email":
        return <Mail className="h-4 w-4 text-blue-600" />
      case "site":
        return <Globe className="h-4 w-4 text-purple-600" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "now"
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const filteredThreads = threadList.filter((thread) => {
    if (searchQuery && !thread.contact?.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    switch (activeFilter) {
      case "unassigned":
        return !thread.assignedAgent
      case "mine":
        return thread.assignedAgent === "agent_001" // Mock current agent
      case "sla":
        return thread.unread && new Date(thread.lastMessage.timestamp) < new Date(Date.now() - 3600000) // 1 hour SLA
      default:
        return true
    }
  })

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Conversations</CardTitle>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-600" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="unassigned" className="text-xs">
              Unassigned
            </TabsTrigger>
            <TabsTrigger value="mine" className="text-xs">
              Mine
            </TabsTrigger>
            <TabsTrigger value="sla" className="text-xs">
              SLA
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto space-y-2 px-3">
        {filteredThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => onThreadSelect(thread.id)}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors",
              selectedThreadId === thread.id
                ? "bg-brand-blue/10 border border-brand-blue/20"
                : "hover:bg-brand-gray-100/50",
              thread.unread && "bg-blue-50",
            )}
          >
            <div className="flex-shrink-0">{getChannelIcon(thread.channel)}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className={cn(
                    "text-sm truncate",
                    thread.unread ? "font-semibold text-brand-black" : "font-medium text-brand-black",
                  )}
                >
                  {thread.contact?.name || "Unknown Contact"}
                </p>
                <div className="flex items-center space-x-2">
                  {thread.unread && <div className="w-2 h-2 bg-brand-blue rounded-full" />}
                  <Badge variant="secondary" className="text-xs">
                    {getTimeAgo(thread.lastMessage.timestamp)}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-brand-gray-600 truncate mt-1">
                {thread.lastMessage.direction === "out" && "You: "}
                {thread.lastMessage.text}
              </p>

              {!thread.assignedAgent && (
                <Badge variant="outline" className="text-xs mt-1 bg-orange-50 text-orange-700 border-orange-200">
                  Unassigned
                </Badge>
              )}
            </div>
          </div>
        ))}

        {filteredThreads.length === 0 && (
          <div className="text-center py-8 text-brand-gray-600">
            <MessageSquare className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
