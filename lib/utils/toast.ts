import { toast } from "@/hooks/use-toast"

export function showToast(message: string, type: "success" | "error" | "info" = "success") {
  toast({
    title: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
    description: message,
    variant: type === "error" ? "destructive" : "default",
  })
}

// Mock action functions that show toast notifications
export function mockCreateDeal() {
  toast({
    title: "Deal Created",
    description: "New deal has been created successfully.",
  })
}

export function mockAssignAgent() {
  toast({
    title: "Agent Assigned",
    description: "Conversation has been assigned to agent.",
  })
}

export function mockSendMessage() {
  toast({
    title: "Message Sent",
    description: "Your message has been sent successfully.",
  })
}

export function mockCreatePaymentLink() {
  toast({
    title: "Payment Link Created",
    description: "Payment link has been generated and sent to customer.",
  })
}

export function mockUploadDocument() {
  toast({
    title: "Document Uploaded",
    description: "Document has been uploaded successfully.",
  })
}

export function mockStartCampaign() {
  toast({
    title: "Campaign Started",
    description: "Your campaign is now active and sending messages.",
  })
}

export function mockSaveAutomation() {
  toast({
    title: "Automation Saved",
    description: "Your automation workflow has been saved as draft.",
  })
}

export function mockRequestDocs() {
  toast({
    title: "Documents Requested",
    description: "Document request has been sent to the customer.",
  })
}

export function mockUpdateDealStage() {
  toast({
    title: "Deal Updated",
    description: "Deal stage has been updated successfully.",
  })
}

export function mockCreateInvoice() {
  toast({
    title: "Invoice Created",
    description: "Invoice has been generated and is ready to send.",
  })
}
