"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, MessageSquare, Mail, CreditCard, Globe, Settings, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  status: 'connected' | 'disconnected' | 'error'
  color: string
  iconColor: string
  configFields: Array<{
    key: string
    label: string
    type: 'text' | 'password' | 'url'
    placeholder: string
    required: boolean
  }>
}

export default function IntegrationsPage() {
  const { user } = useAuth()
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Sync your livestock data with Airtable database',
      icon: Database,
      status: 'disconnected',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      configFields: [
        { key: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Enter your Airtable API key', required: true },
        { key: 'baseId', label: 'Base ID', type: 'text', placeholder: 'Enter your Airtable Base ID', required: true }
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Send and receive WhatsApp messages',
      icon: MessageSquare,
      status: 'disconnected',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      configFields: [
        { key: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Enter your WhatsApp access token', required: true },
        { key: 'phoneNumberId', label: 'Phone Number ID', type: 'text', placeholder: 'Enter your phone number ID', required: true },
        { key: 'verifyToken', label: 'Verify Token', type: 'password', placeholder: 'Enter your verify token', required: true }
      ]
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Manage email communications',
      icon: Mail,
      status: 'disconnected',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      configFields: [
        { key: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter your Gmail Client ID', required: true },
        { key: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter your Gmail Client Secret', required: true }
      ]
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Process payments and manage invoices',
      icon: CreditCard,
      status: 'disconnected',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      configFields: [
        { key: 'secretKey', label: 'Secret Key', type: 'password', placeholder: 'Enter your Paystack secret key', required: true },
        { key: 'publicKey', label: 'Public Key', type: 'text', placeholder: 'Enter your Paystack public key', required: true }
      ]
    },
    {
      id: 'sql',
      name: 'Website SQL',
      description: 'Connect to your website database',
      icon: Database,
      status: 'disconnected',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600',
      configFields: [
        { key: 'connectionString', label: 'Connection String', type: 'password', placeholder: 'Enter your database connection string', required: true }
      ]
    },
    {
      id: 'forms',
      name: 'Website Forms',
      description: 'Capture leads from your website',
      icon: Globe,
      status: 'disconnected',
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      configFields: [
        { key: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'Enter your form webhook URL', required: true }
      ]
    }
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [configValues, setConfigValues] = useState<Record<string, string>>({})
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState('')

  const handleConnect = async (integration: Integration) => {
    setIsConnecting(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update integration status
      setIntegrations(prev => prev.map(int => 
        int.id === integration.id 
          ? { ...int, status: 'connected' as const }
          : int
      ))
      
      setSelectedIntegration(null)
      setConfigValues({})
    } catch (err) {
      setError('Failed to connect integration. Please check your configuration.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async (integration: Integration) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update integration status
      setIntegrations(prev => prev.map(int => 
        int.id === integration.id 
          ? { ...int, status: 'disconnected' as const }
          : int
      ))
    } catch (err) {
      setError('Failed to disconnect integration.')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Error</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />Not Connected</Badge>
    }
  }

  const connectedCount = integrations.filter(int => int.status === 'connected').length

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif font-bold text-3xl text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect your external services and platforms</p>
        </div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${integration.color}`}>
                      <integration.icon className={`h-6 w-6 ${integration.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-sans text-foreground">{integration.name}</CardTitle>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{integration.description}</p>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 glass border-glass-border"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass border-glass-border">
                      <DialogHeader>
                        <DialogTitle>Configure {integration.name}</DialogTitle>
                        <DialogDescription>
                          Enter your {integration.name} credentials to connect
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        {integration.configFields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <Label htmlFor={field.key} className="text-sm font-medium">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </Label>
                            <Input
                              id={field.key}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={configValues[field.key] || ''}
                              onChange={(e) => setConfigValues(prev => ({
                                ...prev,
                                [field.key]: e.target.value
                              }))}
                              className="glass border-glass-border"
                            />
                          </div>
                        ))}
                        
                        {error && (
                          <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">{error}</AlertDescription>
                          </Alert>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleConnect(integration)}
                            disabled={isConnecting}
                            className="flex-1 gradient-primary text-white shadow-medium"
                          >
                            {isConnecting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              'Connect'
                            )}
                          </Button>
                          {integration.status === 'connected' && (
                            <Button
                              variant="outline"
                              onClick={() => handleDisconnect(integration)}
                              className="glass border-glass-border"
                            >
                              Disconnect
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {integration.status === 'connected' ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 glass border-glass-border"
                      onClick={() => handleDisconnect(integration)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1 gradient-primary text-white shadow-medium"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Status */}
        <Card className="glass border-glass-border shadow-soft">
          <CardHeader>
            <CardTitle className="font-sans text-foreground">Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            {connectedCount === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No Integrations Connected</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your external services to unlock the full potential of Digikraal CRM
                </p>
                <Button 
                  className="gradient-primary text-white shadow-medium"
                  onClick={() => setSelectedIntegration(integrations[0])}
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">
                    {connectedCount} Integration{connectedCount !== 1 ? 's' : ''} Connected
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrations.filter(int => int.status === 'connected').map((integration) => (
                    <div key={integration.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className={`p-2 rounded-lg ${integration.color}`}>
                        <integration.icon className={`h-5 w-5 ${integration.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration)}
                        className="glass border-glass-border"
                      >
                        Disconnect
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
