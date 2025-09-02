import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Users, Key, Bell } from "lucide-react"

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif font-bold text-3xl text-brand-black">Settings</h1>
          <p className="text-brand-gray-600">Manage your organization and system preferences</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="organization" className="space-y-4">
          <TabsList>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="integrations">API Keys</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Organization Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Digikraal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Livestock Trading" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="South Africa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" placeholder="Africa/Johannesburg" />
                  </div>
                </div>
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Team Members</span>
                  </CardTitle>
                  <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">Invite User</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@digikraal.com", role: "Admin", status: "Active" },
                    { name: "Jane Smith", email: "jane@digikraal.com", role: "Manager", status: "Active" },
                    { name: "Mike Johnson", email: "mike@digikraal.com", role: "Agent", status: "Active" },
                    { name: "Sarah Wilson", email: "sarah@digikraal.com", role: "Finance", status: "Pending" },
                  ].map((user, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 border border-brand-gray-100 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-brand-black">{user.name}</h4>
                          <p className="text-sm text-brand-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{user.role}</Badge>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { role: "Admin", description: "Full system access and management" },
                    { role: "Manager", description: "Team management and reporting" },
                    { role: "Agent", description: "Customer interactions and deals" },
                    { role: "Finance", description: "Invoice and payment management" },
                    { role: "Transport", description: "Logistics and transport coordination" },
                    { role: "Vet", description: "Health certificates and compliance" },
                    { role: "Read-only", description: "View-only access to data" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 border border-brand-gray-100 rounded-lg">
                      <h4 className="font-medium text-brand-black">{item.role}</h4>
                      <p className="text-sm text-brand-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Keys & Integration Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { name: "WhatsApp Business API", key: "WHATSAPP_WEBHOOK_SECRET", status: "Not configured" },
                  { name: "Gmail API", key: "GMAIL_WEBHOOK_SECRET", status: "Not configured" },
                  { name: "Paystack", key: "PAYSTACK_SECRET_KEY", status: "Not configured" },
                  { name: "Airtable", key: "AIRTABLE_TOKEN", status: "Not configured" },
                  { name: "Database Connection", key: "SQL_CONN", status: "Not configured" },
                ].map((integration, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={integration.key}>{integration.name}</Label>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        {integration.status}
                      </Badge>
                    </div>
                    <Input
                      id={integration.key}
                      type="password"
                      placeholder="Enter API key..."
                      disabled
                      className="bg-brand-gray-100/30"
                    />
                  </div>
                ))}
                <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white" disabled>
                  Save API Keys
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-20 text-brand-gray-600">
                  Notification settings will be available once integrations are configured
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
