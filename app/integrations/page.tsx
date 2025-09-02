import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, MessageSquare, Mail, CreditCard, Globe, Settings } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif font-bold text-3xl text-brand-black">Integrations</h1>
          <p className="text-brand-gray-600">Connect your external services and platforms</p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Airtable",
              description: "Sync your livestock data with Airtable database",
              icon: Database,
              status: "Not Connected",
              color: "bg-orange-100",
              iconColor: "text-orange-600",
            },
            {
              name: "WhatsApp Business",
              description: "Send and receive WhatsApp messages",
              icon: MessageSquare,
              status: "Not Connected",
              color: "bg-green-100",
              iconColor: "text-green-600",
            },
            {
              name: "Gmail",
              description: "Manage email communications",
              icon: Mail,
              status: "Not Connected",
              color: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              name: "Paystack",
              description: "Process payments and manage invoices",
              icon: CreditCard,
              status: "Not Connected",
              color: "bg-purple-100",
              iconColor: "text-purple-600",
            },
            {
              name: "Website SQL",
              description: "Connect to your website database",
              icon: Database,
              status: "Not Connected",
              color: "bg-gray-100",
              iconColor: "text-gray-600",
            },
            {
              name: "Website Forms",
              description: "Capture leads from your website",
              icon: Globe,
              status: "Not Connected",
              color: "bg-indigo-100",
              iconColor: "text-indigo-600",
            },
          ].map((integration, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${integration.color}`}>
                      <integration.icon className={`h-6 w-6 ${integration.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-serif text-brand-black">{integration.name}</CardTitle>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-brand-gray-600">{integration.description}</p>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white" disabled>
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-brand-gray-100 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-brand-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-brand-black mb-2">No Integrations Connected</h3>
              <p className="text-brand-gray-600 mb-4">
                Connect your external services to unlock the full potential of Digikraal CRM
              </p>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" disabled>
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
