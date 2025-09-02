// Core entity types for Digikraal CRM

export interface Contact {
  id: string
  accountId: string
  name: string
  phone: string
  whatsappOptIn: boolean
  email: string
  role: string
}

export interface Account {
  id: string
  name: string
  type: "Buyer" | "Seller" | "Transporter" | "Vet"
  region: string
  kycStatus: "Pending" | "Approved" | "Rejected"
}

export interface Message {
  id: string
  threadId: string
  channel: "whatsapp" | "email" | "site"
  direction: "in" | "out"
  contactId: string
  agentId?: string
  text: string
  timestamp: string
  attachments?: string[]
}

export interface Listing {
  id: string
  sellerAccountId: string
  species: string
  breed: string
  sex: "Male" | "Female" | "Mixed"
  pregnancyStatus: "Pregnant" | "Open" | "Unknown"
  monthsPreg?: number
  weightClass: string
  lotSize: number
  minSplit?: number
  pricePerHead: number
  reservePrice?: number
  tests: {
    brucellosis?: string
    tb?: string
  }
  certificates?: string[]
  photos?: string[]
  video?: string
  farmLocation: string
  availableFrom: string
  status: "Active" | "Sold" | "Expired" | "Draft"
}

export interface Buyer {
  id: string
  accountId: string
  name: string
  region: string
  requirements: {
    species: string[]
    breed: string[]
    qty: number
    weightRange: string
    pregPref: "Pregnant" | "Open" | "Any"
    radiusKm: number
    budget: number
    deliveryWindow: string
  }
  tags: string[]
}

export interface Offer {
  id: string
  listingId: string
  buyerAccountId: string
  price: number
  qty: number
  terms: string
  status: "Pending" | "Accepted" | "Rejected" | "Countered"
  createdBy: string
  createdAt: string
}

export interface Deal {
  id: string
  listingId: string
  sellerAccountId: string
  buyerAccountId: string
  stage: "Lead" | "Qualifying" | "Offer" | "Contract" | "Payment" | "Transport" | "Closed Won" | "Closed Lost"
  value: number
  currency: string
  depositPct?: number
  escrowFlag?: boolean
  paymentLink?: string
  contractUrl?: string
  probability?: number
  createdAt: string
  updatedAt: string
}

export interface TransportJob {
  id: string
  dealId: string
  origin: string
  destination: string
  distanceKm: number
  vehicleReq?: string
  quote?: number
  assignedTransporterId?: string
  eta?: string
  podFile?: string
  status: "Pending" | "Assigned" | "In Transit" | "Delivered" | "Cancelled"
  createdAt: string
}

export interface Invoice {
  id: string
  dealId: string
  invoiceNo: string
  amount: number
  tax?: number
  status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"
  paystackRef?: string
  dueDate: string
  createdAt: string
}

export interface Task {
  id: string
  dealId?: string
  title: string
  description?: string
  due: string
  assigneeId: string
  status: "Todo" | "In Progress" | "Done" | "Cancelled"
  priority: "Low" | "Medium" | "High"
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  segmentId: string
  status: "Draft" | "Active" | "Paused" | "Completed"
  steps: CampaignStep[]
  stats: {
    sent: number
    delivered: number
    opened: number
    replied: number
  }
  createdAt: string
}

export interface CampaignStep {
  id: string
  type: "send_template" | "wait" | "branch"
  templateId?: string
  waitHours?: number
  condition?: string
  order: number
}

export interface Segment {
  id: string
  name: string
  filters: SegmentFilter[]
  contactCount: number
  createdAt: string
  updatedAt: string
}

export interface SegmentFilter {
  field: string
  operator: "equals" | "contains" | "greater_than" | "less_than" | "in_range"
  value: string | number
}

export interface Template {
  id: string
  name: string
  type: "whatsapp" | "email" | "sms"
  category: string
  subject?: string
  content: string
  variables: string[]
  createdAt: string
}

export interface Automation {
  id: string
  name: string
  trigger: AutomationTrigger
  actions: AutomationAction[]
  status: "Active" | "Paused" | "Draft"
  stats: {
    triggered: number
    completed: number
    failed: number
  }
  createdAt: string
}

export interface AutomationTrigger {
  type: "contact_created" | "message_received" | "deal_stage_changed" | "invoice_overdue"
  conditions?: Record<string, any>
}

export interface AutomationAction {
  id: string
  type: "send_template" | "create_task" | "update_deal" | "wait" | "branch"
  config: Record<string, any>
  order: number
}
