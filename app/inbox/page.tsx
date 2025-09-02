"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThreadList } from "@/components/inbox/thread-list"
import { ConversationView } from "@/components/inbox/conversation-view"
import { ContextPanel } from "@/components/inbox/context-panel"
import { Plus } from "lucide-react"

export default function InboxPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string>()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Inbox</h1>
            <p className="text-brand-gray-600">Manage all your conversations in one place</p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Unassigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Mine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">SLA Breach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Total Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">23</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[700px]">
          {/* Thread List */}
          <div className="col-span-4">
            <ThreadList selectedThreadId={selectedThreadId} onThreadSelect={setSelectedThreadId} />
          </div>

          {/* Conversation View */}
          <div className="col-span-5">
            <ConversationView threadId={selectedThreadId} />
          </div>

          {/* Context Panel */}
          <div className="col-span-3">
            <ContextPanel threadId={selectedThreadId} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
