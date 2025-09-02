"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Smile, MessageSquare, Sparkles, Lightbulb } from "lucide-react"
import { mockTemplates } from "@/lib/data"
import { mockSendMessage } from "@/lib/utils/toast"

interface ChatComposerProps {
  onSendMessage: (content: string) => void
}

export function ChatComposer({ onSendMessage }: ChatComposerProps) {
  const [message, setMessage] = useState("")
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      mockSendMessage()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const insertTemplate = (template: any) => {
    setMessage(template.content)
  }

  const aiSuggestions = [
    "Thank you for your interest! Let me get you more details about this listing.",
    "I'd be happy to arrange a viewing for you. When would be convenient?",
    "Based on your requirements, I have a few other listings that might interest you.",
  ]

  return (
    <div className="p-4 space-y-3">
      {/* AI Suggestions Panel */}
      {showAISuggestions && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span>AI Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {aiSuggestions.map((suggestion, i) => (
              <div
                key={i}
                onClick={() => setMessage(suggestion)}
                className="p-2 bg-white rounded-lg cursor-pointer hover:bg-purple-50 border border-purple-100"
              >
                <p className="text-sm text-brand-black">{suggestion}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Message Input */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[80px] pr-12 resize-none"
          />

          {/* AI Suggestions Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
          >
            <Lightbulb className={`h-4 w-4 ${showAISuggestions ? "text-purple-600" : "text-brand-gray-600"}`} />
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          <Button onClick={handleSend} className="bg-brand-blue hover:bg-brand-blue/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Templates Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Templates
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            <div className="p-2">
              <h4 className="font-medium text-sm mb-2">Quick Templates</h4>
              {mockTemplates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  onClick={() => insertTemplate(template)}
                  className="p-2 hover:bg-brand-gray-100/50 rounded cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{template.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {template.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-brand-gray-600 line-clamp-2">{template.content}</p>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm">
          <Paperclip className="h-4 w-4 mr-2" />
          Attach
        </Button>

        <Button variant="outline" size="sm">
          <Smile className="h-4 w-4 mr-2" />
          Emoji
        </Button>
      </div>
    </div>
  )
}
