"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Zap, MessageSquare, Clock, Mail, Users, ArrowDown } from "lucide-react"
import { showToast } from "@/lib/utils/toast"

interface WorkflowBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition" | "delay"
  config: Record<string, any>
}

export function WorkflowBuilder({ open, onOpenChange }: WorkflowBuilderProps) {
  const [workflowName, setWorkflowName] = useState("")
  const [description, setDescription] = useState("")
  const [steps, setSteps] = useState<WorkflowStep[]>([{ id: "1", type: "trigger", config: {} }])

  const triggerOptions = [
    { value: "contact_created", label: "New Contact Created", icon: Users },
    { value: "message_received", label: "Message Received", icon: MessageSquare },
    { value: "deal_stage_changed", label: "Deal Stage Changed", icon: Zap },
    { value: "listing_created", label: "New Listing Created", icon: Plus },
    { value: "offer_submitted", label: "Offer Submitted", icon: Mail },
  ]

  const actionOptions = [
    { value: "send_message", label: "Send WhatsApp Message", icon: MessageSquare },
    { value: "send_email", label: "Send Email", icon: Mail },
    { value: "assign_tag", label: "Assign Tag", icon: Users },
    { value: "create_task", label: "Create Task", icon: Plus },
    { value: "update_deal", label: "Update Deal", icon: Zap },
  ]

  const addStep = (type: WorkflowStep["type"]) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      config: {},
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter((s) => s.id !== id))
  }

  const updateStep = (id: string, config: Record<string, any>) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, config: { ...s.config, ...config } } : s)))
  }

  const getStepIcon = (step: WorkflowStep) => {
    if (step.type === "trigger") {
      const trigger = triggerOptions.find((t) => t.value === step.config.trigger)
      return trigger?.icon || Zap
    }
    if (step.type === "action") {
      const action = actionOptions.find((a) => a.value === step.config.action)
      return action?.icon || MessageSquare
    }
    if (step.type === "delay") return Clock
    return Zap
  }

  const getStepTitle = (step: WorkflowStep) => {
    if (step.type === "trigger") {
      const trigger = triggerOptions.find((t) => t.value === step.config.trigger)
      return trigger?.label || "Select Trigger"
    }
    if (step.type === "action") {
      const action = actionOptions.find((a) => a.value === step.config.action)
      return action?.label || "Select Action"
    }
    if (step.type === "delay") return `Wait ${step.config.duration || "X"} ${step.config.unit || "minutes"}`
    return "Configure Step"
  }

  const handleSave = () => {
    showToast("Automation created successfully", "success")
    onOpenChange(false)
    setWorkflowName("")
    setDescription("")
    setSteps([{ id: "1", type: "trigger", config: {} }])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Create Automation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-brand-black">Automation Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Automation Name</Label>
                <Input
                  id="name"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="Enter automation name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this automation does"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Workflow Steps */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-brand-black">Workflow Steps</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => addStep("action")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Action
                </Button>
                <Button variant="outline" size="sm" onClick={() => addStep("delay")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Delay
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const StepIcon = getStepIcon(step)
                return (
                  <div key={step.id} className="relative">
                    <Card className={step.type === "trigger" ? "border-brand-orange" : ""}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-lg ${
                                step.type === "trigger" ? "bg-brand-orange/10" : "bg-brand-blue/10"
                              }`}
                            >
                              <StepIcon
                                className={`h-4 w-4 ${
                                  step.type === "trigger" ? "text-brand-orange" : "text-brand-blue"
                                }`}
                              />
                            </div>
                            <div>
                              <CardTitle className="text-sm font-medium">{getStepTitle(step)}</CardTitle>
                              <Badge variant="secondary" className="text-xs mt-1">
                                {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                              </Badge>
                            </div>
                          </div>
                          {step.type !== "trigger" && (
                            <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Trigger Configuration */}
                        {step.type === "trigger" && (
                          <div>
                            <Label>When this happens:</Label>
                            <Select
                              value={step.config.trigger}
                              onValueChange={(value) => updateStep(step.id, { trigger: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select trigger" />
                              </SelectTrigger>
                              <SelectContent>
                                {triggerOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Action Configuration */}
                        {step.type === "action" && (
                          <div className="space-y-3">
                            <div>
                              <Label>Action:</Label>
                              <Select
                                value={step.config.action}
                                onValueChange={(value) => updateStep(step.id, { action: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select action" />
                                </SelectTrigger>
                                <SelectContent>
                                  {actionOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            {step.config.action === "send_message" && (
                              <div>
                                <Label>Message:</Label>
                                <Input
                                  value={step.config.message || ""}
                                  onChange={(e) => updateStep(step.id, { message: e.target.value })}
                                  placeholder="Enter message content"
                                />
                              </div>
                            )}
                            {step.config.action === "assign_tag" && (
                              <div>
                                <Label>Tag:</Label>
                                <Input
                                  value={step.config.tag || ""}
                                  onChange={(e) => updateStep(step.id, { tag: e.target.value })}
                                  placeholder="Enter tag name"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Delay Configuration */}
                        {step.type === "delay" && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Duration:</Label>
                              <Input
                                type="number"
                                value={step.config.duration || ""}
                                onChange={(e) => updateStep(step.id, { duration: e.target.value })}
                                placeholder="5"
                              />
                            </div>
                            <div>
                              <Label>Unit:</Label>
                              <Select
                                value={step.config.unit}
                                onValueChange={(value) => updateStep(step.id, { unit: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Arrow between steps */}
                    {index < steps.length - 1 && (
                      <div className="flex justify-center py-2">
                        <ArrowDown className="h-4 w-4 text-brand-gray-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!workflowName || !steps[0].config.trigger}>
              Create Automation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
