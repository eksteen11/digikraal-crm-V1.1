import type {
  Contact,
  Account,
  Message,
  Listing,
  Buyer,
  Offer,
  Deal,
  TransportJob,
  Invoice,
  Task,
  Template,
  Segment,
  Campaign,
  Automation,
} from "../types"

// Mock data arrays
export const mockAccounts: Account[] = [
  {
    id: "acc-1",
    name: "Bokmakirie Farm",
    type: "seller",
    region: "Western Cape",
    kycStatus: "verified",
  },
  {
    id: "acc-2",
    name: "Springbok Cattle Co",
    type: "buyer",
    region: "Northern Cape",
    kycStatus: "verified",
  },
  {
    id: "acc-3",
    name: "Karoo Livestock",
    type: "seller",
    region: "Eastern Cape",
    kycStatus: "pending",
  },
  {
    id: "acc-4",
    name: "Highveld Ranchers",
    type: "buyer",
    region: "Gauteng",
    kycStatus: "verified",
  },
  {
    id: "acc-5",
    name: "Bushveld Breeders",
    type: "seller",
    region: "Limpopo",
    kycStatus: "verified",
  },
]

export const mockContacts: Contact[] = [
  {
    id: "contact-1",
    accountId: "acc-1",
    name: "Pieter van der Merwe",
    phone: "+27821234567",
    whatsappOptIn: true,
    email: "pieter@bokmakirie.co.za",
    role: "owner",
  },
  {
    id: "contact-2",
    accountId: "acc-2",
    name: "Sarah Johnson",
    phone: "+27829876543",
    whatsappOptIn: true,
    email: "sarah@springbok.co.za",
    role: "buyer",
  },
  {
    id: "contact-3",
    accountId: "acc-3",
    name: "Johan Steyn",
    phone: "+27835551234",
    whatsappOptIn: false,
    email: "johan@karoo.co.za",
    role: "manager",
  },
  {
    id: "contact-4",
    accountId: "acc-4",
    name: "Mary Williams",
    phone: "+27847778888",
    whatsappOptIn: true,
    email: "mary@highveld.co.za",
    role: "buyer",
  },
  {
    id: "contact-5",
    accountId: "acc-5",
    name: "Thabo Mthembu",
    phone: "+27833334444",
    whatsappOptIn: true,
    email: "thabo@bushveld.co.za",
    role: "owner",
  },
]

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    threadId: "thread-1",
    channel: "whatsapp",
    direction: "inbound",
    contactId: "contact-1",
    agentId: "agent-1",
    text: "Hi, I have 50 Angus cattle ready for sale. Are you interested?",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    attachments: [],
  },
  {
    id: "msg-2",
    threadId: "thread-1",
    channel: "whatsapp",
    direction: "outbound",
    contactId: "contact-1",
    agentId: "agent-1",
    text: "Hello Pieter! Yes, we're definitely interested. Can you send me more details about the cattle?",
    timestamp: new Date("2024-01-15T10:35:00Z"),
    attachments: [],
  },
  {
    id: "msg-3",
    threadId: "thread-2",
    channel: "sms",
    direction: "inbound",
    contactId: "contact-2",
    agentId: "agent-2",
    text: "Looking for Brahman bulls. Do you have any available?",
    timestamp: new Date("2024-01-15T14:20:00Z"),
    attachments: [],
  },
  {
    id: "msg-4",
    threadId: "thread-3",
    channel: "whatsapp",
    direction: "inbound",
    contactId: "contact-3",
    agentId: null,
    text: "Need transport for 30 cattle from Karoo to Johannesburg",
    timestamp: new Date("2024-01-16T09:15:00Z"),
    attachments: [],
  },
]

export const mockListings: Listing[] = [
  {
    id: "listing-1",
    sellerAccountId: "acc-1",
    species: "cattle",
    breed: "Angus",
    sex: "mixed",
    pregnancyStatus: "open",
    ageMonths: 24,
    weightKg: 450,
    quantity: 50,
    pricePerHead: 15000,
    currency: "ZAR",
    location: "Western Cape",
    description: "Premium Angus cattle, grass-fed, excellent condition",
    images: ["/black-angus-cattle.png"],
    status: "active",
    createdAt: new Date("2024-01-10T08:00:00Z"),
    tags: ["premium", "grass-fed", "angus"],
  },
  {
    id: "listing-2",
    sellerAccountId: "acc-3",
    species: "cattle",
    breed: "Brahman",
    sex: "bull",
    pregnancyStatus: "n/a",
    ageMonths: 36,
    weightKg: 650,
    quantity: 15,
    pricePerHead: 25000,
    currency: "ZAR",
    location: "Eastern Cape",
    description: "Strong Brahman bulls, perfect for breeding",
    images: [],
    status: "active",
    createdAt: new Date("2024-01-12T10:30:00Z"),
    tags: ["breeding", "brahman", "bulls"],
  },
  {
    id: "listing-3",
    sellerAccountId: "acc-5",
    species: "cattle",
    breed: "Bonsmara",
    sex: "heifer",
    pregnancyStatus: "pregnant",
    ageMonths: 30,
    weightKg: 520,
    quantity: 25,
    pricePerHead: 18000,
    currency: "ZAR",
    location: "Limpopo",
    description: "Pregnant Bonsmara heifers, due in 3 months",
    images: [],
    status: "sold",
    createdAt: new Date("2024-01-08T15:45:00Z"),
    tags: ["pregnant", "bonsmara", "heifers"],
  },
]

export const mockBuyers: Buyer[] = [
  {
    id: "buyer-1",
    accountId: "acc-2",
    name: "Sarah Johnson",
    region: "Northern Cape",
    requirements: {
      species: ["cattle"],
      breed: ["Brahman"],
      qty: 250,
      weightRange: "400-600kg",
      pregPref: "Any",
      radiusKm: 200,
      budget: 5000000,
      deliveryWindow: "Within 30 days"
    },
    tags: ["brahman", "bulk-buyer", "verified"],
  },
  {
    id: "buyer-2",
    accountId: "acc-4",
    name: "Mary Williams",
    region: "Gauteng",
    requirements: {
      species: ["cattle"],
      breed: ["Angus", "Bonsmara", "Hereford"],
      qty: 75,
      weightRange: "300-500kg",
      pregPref: "Open",
      radiusKm: 150,
      budget: 2000000,
      deliveryWindow: "Within 14 days"
    },
    tags: ["feedlot", "mixed-breed", "regular"],
  },
  {
    id: "buyer-3",
    accountId: "acc-1",
    name: "Pieter van der Merwe",
    region: "Western Cape",
    requirements: {
      species: ["cattle"],
      breed: ["Angus", "Charolais"],
      qty: 100,
      weightRange: "350-550kg",
      pregPref: "Pregnant",
      radiusKm: 100,
      budget: 3000000,
      deliveryWindow: "Within 21 days"
    },
    tags: ["premium", "breeding", "verified"],
  },
]

export const mockOffers: Offer[] = [
  {
    id: "offer-1",
    listingId: "listing-1",
    buyerAccountId: "acc-2",
    price: 14500,
    qty: 30,
    terms: "Cash on delivery, transport included",
    status: "pending",
    createdBy: "contact-2",
    createdAt: new Date("2024-01-15T16:00:00Z"),
  },
  {
    id: "offer-2",
    listingId: "listing-2",
    buyerAccountId: "acc-4",
    price: 24000,
    qty: 10,
    terms: "50% deposit, balance on collection",
    status: "accepted",
    createdBy: "contact-4",
    createdAt: new Date("2024-01-14T11:30:00Z"),
  },
]

export const mockDeals: Deal[] = [
  {
    id: "deal-1",
    listingId: "listing-1",
    sellerAccountId: "acc-1",
    buyerAccountId: "acc-2",
    stage: "qualifying",
    value: 435000,
    currency: "ZAR",
    quantity: 30,
    pricePerHead: 14500,
    terms: "Cash on delivery, transport included",
    expectedCloseDate: new Date("2024-01-25T00:00:00Z"),
    assignedTo: "agent-1",
    createdAt: new Date("2024-01-15T16:00:00Z"),
    notes: "Buyer interested in 30 head from the Angus listing",
  },
  {
    id: "deal-2",
    listingId: "listing-2",
    sellerAccountId: "acc-3",
    buyerAccountId: "acc-4",
    stage: "contract",
    value: 240000,
    currency: "ZAR",
    quantity: 10,
    pricePerHead: 24000,
    terms: "50% deposit, balance on collection",
    expectedCloseDate: new Date("2024-01-20T00:00:00Z"),
    assignedTo: "agent-2",
    createdAt: new Date("2024-01-14T11:30:00Z"),
    notes: "Contract signed, awaiting deposit payment",
  },
  {
    id: "deal-3",
    listingId: "listing-3",
    sellerAccountId: "acc-5",
    buyerAccountId: "acc-2",
    stage: "closed-won",
    value: 450000,
    currency: "ZAR",
    quantity: 25,
    pricePerHead: 18000,
    terms: "Full payment on delivery",
    expectedCloseDate: new Date("2024-01-10T00:00:00Z"),
    assignedTo: "agent-1",
    createdAt: new Date("2024-01-08T15:45:00Z"),
    notes: "Deal completed successfully, cattle delivered",
  },
]

export const mockTransportJobs: TransportJob[] = [
  {
    id: "transport-1",
    dealId: "deal-2",
    origin: "Eastern Cape",
    destination: "Gauteng",
    distanceKm: 650,
    estimatedCost: 15000,
    currency: "ZAR",
    status: "scheduled",
    scheduledDate: new Date("2024-01-22T08:00:00Z"),
    driverName: "Johannes Botha",
    driverPhone: "+27821112222",
    vehicleReg: "CA 123-456",
  },
  {
    id: "transport-2",
    dealId: "deal-3",
    origin: "Limpopo",
    destination: "Northern Cape",
    distanceKm: 450,
    estimatedCost: 12000,
    currency: "ZAR",
    status: "completed",
    scheduledDate: new Date("2024-01-09T06:00:00Z"),
    driverName: "Sipho Ndlovu",
    driverPhone: "+27833334444",
    vehicleReg: "GP 789-012",
  },
]

export const mockInvoices: Invoice[] = [
  {
    id: "invoice-1",
    dealId: "deal-2",
    invoiceNo: "INV-2024-001",
    amount: 240000,
    tax: 36000,
    currency: "ZAR",
    status: "pending",
    dueDate: new Date("2024-01-30T00:00:00Z"),
    paystackRef: null,
    createdAt: new Date("2024-01-16T10:00:00Z"),
  },
  {
    id: "invoice-2",
    dealId: "deal-3",
    invoiceNo: "INV-2024-002",
    amount: 450000,
    tax: 67500,
    currency: "ZAR",
    status: "paid",
    dueDate: new Date("2024-01-15T00:00:00Z"),
    paystackRef: "pay_abc123def456",
    createdAt: new Date("2024-01-10T14:30:00Z"),
  },
]

export const mockTasks: Task[] = [
  {
    id: "task-1",
    dealId: "deal-1",
    title: "Follow up on cattle inspection",
    due: new Date("2024-01-18T10:00:00Z"),
    assigneeId: "agent-1",
    status: "pending",
    createdAt: new Date("2024-01-16T09:00:00Z"),
  },
  {
    id: "task-2",
    dealId: "deal-2",
    title: "Prepare transport documentation",
    due: new Date("2024-01-20T15:00:00Z"),
    assigneeId: "agent-2",
    status: "in-progress",
    createdAt: new Date("2024-01-16T11:30:00Z"),
  },
  {
    id: "task-3",
    dealId: "deal-1",
    title: "Send contract for signature",
    due: new Date("2024-01-19T12:00:00Z"),
    assigneeId: "agent-1",
    status: "completed",
    createdAt: new Date("2024-01-15T16:30:00Z"),
  },
]

export const mockTemplates: Template[] = [
  {
    id: "template-1",
    name: "Welcome Message",
    content: "Hi {{contact_name}}, welcome to Digikraal! We're here to help you with all your livestock trading needs.",
    category: "greeting",
    variables: ["contact_name"],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "template-2",
    name: "Listing Inquiry",
    content:
      "Hello {{seller_name}}, I'm interested in your {{species}} listing. Can you provide more details about the {{breed}} cattle?",
    category: "inquiry",
    variables: ["seller_name", "species", "breed"],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "template-3",
    name: "Deal Confirmation",
    content:
      "Great news {{buyer_name}}! Your offer of R{{amount}} for {{quantity}} head has been accepted. Next steps: {{next_steps}}",
    category: "confirmation",
    variables: ["buyer_name", "amount", "quantity", "next_steps"],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
]

export const mockSegments: Segment[] = [
  {
    id: "segment-1",
    name: "Active Cattle Buyers",
    filters: [
      { field: "accountType", operator: "equals", value: "buyer" },
      { field: "lastPurchase", operator: "greater_than", value: "6months" },
      { field: "species", operator: "equals", value: "cattle" },
    ],
    contactCount: 45,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "segment-2",
    name: "Premium Sellers",
    filters: [
      { field: "accountType", operator: "equals", value: "seller" },
      { field: "kycStatus", operator: "equals", value: "verified" },
      { field: "minListingValue", operator: "greater_than", value: 500000 },
    ],
    contactCount: 23,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "segment-3",
    name: "High-Value Buyers",
    filters: [
      { field: "accountType", operator: "equals", value: "buyer" },
      { field: "budget", operator: "greater_than", value: 1000000 },
      { field: "region", operator: "equals", value: "Gauteng" },
    ],
    contactCount: 12,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "New Year Cattle Promotion",
    type: "broadcast",
    status: "active",
    segmentId: "segment-1",
    templateId: "template-1",
    scheduledAt: new Date("2024-01-01T09:00:00Z"),
    sentCount: 45,
    deliveredCount: 43,
    readCount: 38,
    createdAt: new Date("2023-12-28T00:00:00Z"),
  },
  {
    id: "campaign-2",
    name: "Premium Seller Outreach",
    type: "broadcast",
    status: "completed",
    segmentId: "segment-2",
    templateId: "template-2",
    scheduledAt: new Date("2024-01-10T14:00:00Z"),
    sentCount: 23,
    deliveredCount: 23,
    readCount: 19,
    createdAt: new Date("2024-01-08T00:00:00Z"),
  },
]

export const mockAutomations: Automation[] = [
  {
    id: "automation-1",
    name: "New Buyer Welcome Flow",
    description: "Automated welcome sequence for new buyer registrations",
    trigger: "account_created",
    status: "active",
    steps: [
      {
        id: "step-1",
        type: "wait",
        duration: 5,
        unit: "minutes",
      },
      {
        id: "step-2",
        type: "send_message",
        templateId: "template-1",
      },
      {
        id: "step-3",
        type: "wait",
        duration: 1,
        unit: "day",
      },
      {
        id: "step-4",
        type: "send_message",
        templateId: "template-2",
      },
    ],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
  {
    id: "automation-2",
    name: "Deal Follow-up Sequence",
    description: "Automated follow-up for deals in qualifying stage",
    trigger: "deal_stage_change",
    status: "active",
    steps: [
      {
        id: "step-1",
        type: "wait",
        duration: 2,
        unit: "days",
      },
      {
        id: "step-2",
        type: "send_message",
        templateId: "template-3",
      },
    ],
    createdAt: new Date("2024-01-01T00:00:00Z"),
  },
]

// Helper functions for working with mock data
export function getContactById(id: string) {
  return mockContacts.find((contact) => contact.id === id)
}

export function getAccountById(id: string) {
  return mockAccounts.find((account) => account.id === id)
}

export function getListingById(id: string) {
  return mockListings.find((listing) => listing.id === id)
}

export function getDealById(id: string) {
  return mockDeals.find((deal) => deal.id === id)
}

export function getMessagesByThreadId(threadId: string) {
  return mockMessages.filter((message) => message.threadId === threadId)
}

export function getDealsByStage(stage: string) {
  return mockDeals.filter((deal) => deal.stage === stage)
}

export function getTasksByAssignee(assigneeId: string) {
  return mockTasks.filter((task) => task.assigneeId === assigneeId)
}

export function getInvoicesByStatus(status: string) {
  return mockInvoices.filter((invoice) => invoice.status === status)
}

// Mock API functions that return promises (simulating real API calls)
export async function fetchDeals() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDeals), 100)
  })
}

export async function fetchListings() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockListings), 100)
  })
}

export async function fetchBuyers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBuyers), 100)
  })
}

export async function fetchMessages() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages), 100)
  })
}

export async function fetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 100)
  })
}

export async function fetchInvoices() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInvoices), 100)
  })
}

export async function fetchTransportJobs() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTransportJobs), 100)
  })
}

export async function fetchTemplates() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTemplates), 100)
  })
}

export async function fetchSegments() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSegments), 100)
  })
}

export async function fetchCampaigns() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCampaigns), 100)
  })
}

export async function fetchAutomations() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAutomations), 100)
  })
}
