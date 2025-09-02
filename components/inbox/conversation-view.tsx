"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Mail, Globe, UserPlus, MoreVertical } from "lucide-react"
import { getContactById, getMessagesByThreadId } from "@/lib/data"
import { ChatComposer } from "./chat-composer"
import { cn } from "@/lib/utils"

interface ConversationViewProps {
  threadId?: string
}

export function ConversationView({ threadId }: ConversationViewProps) {
  const [messages, setMessages] = useState(() => (threadId ? getMessagesByThreadId(threadId) : []))

  if (!threadId) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-brand-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-brand-black mb-2">Select a conversation</h3>
          <p className="text-brand-gray-600">Choose a conversation from the list to view messages</p>
        </CardContent>
      </Card>
    )
  }

  const threadMessages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  const contact = threadMessages.length > 0 ? getContactById(threadMessages[0].contactId) : null
  const channel = threadMessages[0]?.channel

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

  const getChannelName = (channel: string) => {
    switch (channel) {
      case "whatsapp":
        return "WhatsApp"
      case "email":
        return "Email"
      case "site":
        return "Website"
      default:
        return "Unknown"
    }
  }

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      threadId: threadId!,
      channel: channel,
      direction: "out" as const,
      contactId: contact?.id || "",
      agentId: "agent_001",
      text: content,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="border-b border-brand-gray-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-brand-blue text-white">
                {contact?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{contact?.name || "Unknown Contact"}</CardTitle>
              <div className="flex items-center space-x-2">
                {getChannelIcon(channel)}
                <span className="text-sm text-brand-gray-600">{getChannelName(channel)}</span>
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Assign
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        {threadMessages.map((message) => (
          <div key={message.id} className={cn("flex", message.direction === "out" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[70%] rounded-lg px-4 py-2",
                message.direction === "out" ? "bg-brand-blue text-white" : "bg-brand-gray-100 text-brand-black",
              )}
            >
              <p className="text-sm">{message.text}</p>
              <p className={cn("text-xs mt-1", message.direction === "out" ? "text-blue-100" : "text-brand-gray-600")}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>

      {/* Chat Composer */}
      <div className="border-t border-brand-gray-100">
        <ChatComposer onSendMessage={handleSendMessage} />
      </div>
    </Card>
  )
}
