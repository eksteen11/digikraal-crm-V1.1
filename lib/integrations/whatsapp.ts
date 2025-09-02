export interface WhatsAppConfig {
  accessToken: string
  phoneNumberId: string
  verifyToken: string
}

export interface WhatsAppMessage {
  to: string
  type: 'text' | 'template' | 'image' | 'document'
  text?: {
    body: string
  }
  template?: {
    name: string
    language: {
      code: string
    }
    components?: any[]
  }
  image?: {
    link: string
    caption?: string
  }
  document?: {
    link: string
    filename: string
    caption?: string
  }
}

export interface WhatsAppContact {
  id: string
  name: string
  phone: string
  profile_picture?: string
  last_seen?: string
}

export class WhatsAppService {
  private config: WhatsAppConfig
  private baseUrl = 'https://graph.facebook.com/v18.0'

  constructor(config: WhatsAppConfig) {
    this.config = config
  }

  // Send a text message
  async sendMessage(message: WhatsAppMessage): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: message.to,
          type: message.type,
          [message.type]: message[message.type]
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`WhatsApp API error: ${error.error?.message || 'Unknown error'}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending WhatsApp message:', error)
      throw new Error('Failed to send WhatsApp message')
    }
  }

  // Send a template message
  async sendTemplate(to: string, templateName: string, languageCode: string = 'en', components?: any[]): Promise<any> {
    return this.sendMessage({
      to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components
      }
    })
  }

  // Get message status
  async getMessageStatus(messageId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${messageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get message status')
      }

      return await response.json()
    } catch (error) {
      console.error('Error getting WhatsApp message status:', error)
      throw new Error('Failed to get message status')
    }
  }

  // Get contacts (this would require additional setup with WhatsApp Business API)
  async getContacts(): Promise<WhatsAppContact[]> {
    // Note: This is a simplified implementation
    // In reality, you'd need to implement contact syncing through webhooks
    // or use the WhatsApp Business API's contact management features
    try {
      // This would typically come from your database or webhook data
      return []
    } catch (error) {
      console.error('Error getting WhatsApp contacts:', error)
      throw new Error('Failed to get WhatsApp contacts')
    }
  }

  // Verify webhook (for incoming messages)
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === this.config.verifyToken) {
      return challenge
    }
    return null
  }

  // Process incoming webhook data
  async processWebhook(webhookData: any): Promise<any> {
    try {
      const entry = webhookData.entry?.[0]
      const changes = entry?.changes?.[0]
      const value = changes?.value

      if (value?.messages) {
        for (const message of value.messages) {
          await this.handleIncomingMessage(message)
        }
      }

      return { status: 'success' }
    } catch (error) {
      console.error('Error processing WhatsApp webhook:', error)
      throw new Error('Failed to process webhook')
    }
  }

  // Handle incoming message
  private async handleIncomingMessage(message: any): Promise<void> {
    try {
      // Process the incoming message
      // This would typically involve:
      // 1. Storing the message in your database
      // 2. Triggering any automated responses
      // 3. Notifying relevant users
      
      console.log('Received WhatsApp message:', message)
      
      // Example: Auto-reply to text messages
      if (message.type === 'text') {
        const replyText = `Thank you for your message: "${message.text.body}". We'll get back to you soon!`
        
        await this.sendMessage({
          to: message.from,
          type: 'text',
          text: {
            body: replyText
          }
        })
      }
    } catch (error) {
      console.error('Error handling incoming WhatsApp message:', error)
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        }
      })

      return response.ok
    } catch (error) {
      console.error('WhatsApp connection test failed:', error)
      return false
    }
  }
}
