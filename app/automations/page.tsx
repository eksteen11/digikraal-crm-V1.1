"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WorkflowBuilder } from "@/components/automations/workflow-builder"
import { Plus, Play, Pause, Zap, BarChart, Filter } from "lucide-react"
import { mockAutomations } from "@/lib/data"

export default function AutomationsPage() {
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Automations</h1>
            <p className="text-brand-gray-600">Create automated workflows</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              onClick={() => setShowWorkflowBuilder(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Automation
            </Button>
          </div>
        </div>

        {/* Automation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Active Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockAutomations.filter((a) => a.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Triggered Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockAutomations.reduce((sum, a) => sum + a.triggeredToday, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (mockAutomations.reduce((sum, a) => sum + a.successfulRuns, 0) /
                    mockAutomations.reduce((sum, a) => sum + a.totalRuns, 0)) *
                    100,
                )}
                %
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">
                {mockAutomations.reduce((sum, a) => sum + a.timeSavedHours, 0)}h
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automations List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAutomations.map((automation) => (
                <div
                  key={automation.id}
                  className="flex items-center justify-between p-4 border border-brand-gray-100 rounded-lg hover:shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-brand-blue/10 rounded-lg">
                      <Zap className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-black">{automation.name}</h4>
                      <p className="text-sm text-brand-gray-600">Trigger: {automation.trigger}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(automation.status)}>{automation.status}</Badge>
                      <p className="text-sm text-brand-gray-600 mt-1">{automation.totalRuns} runs</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        {automation.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Builder Modal */}
        <WorkflowBuilder open={showWorkflowBuilder} onOpenChange={setShowWorkflowBuilder} />
      </div>
    </MainLayout>
  )
}
