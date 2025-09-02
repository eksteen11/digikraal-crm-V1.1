export interface GmailConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  accessToken?: string
  refreshToken?: string
}

export interface GmailMessage {
  id: string
  threadId: string
  subject: string
  from: string
  to: string[]
  date: string
  body: string
  isRead: boolean
  labels: string[]
}

export interface GmailContact {
  id: string
  name: string
  email: string
  phone?: string
  organization?: string
  notes?: string
}

export class GmailService {
  private config: GmailConfig
  private baseUrl = 'https://gmail.googleapis.com/gmail/v1'

  constructor(config: GmailConfig) {
    this.config = config
  }

  // Get authorization URL for OAuth
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/contacts.readonly',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    })

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        })
      })

      if (!response.ok) {
        throw new Error('Failed to exchange code for tokens')
      }

      const data = await response.json()
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      }
    } catch (error) {
      console.error('Error exchanging code for tokens:', error)
      throw new Error('Failed to exchange authorization code')
    }
  }

  // Refresh access token
  async refreshAccessToken(): Promise<string> {
    if (!this.config.refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.config.refreshToken,
          grant_type: 'refresh_token',
        })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh access token')
      }

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error refreshing access token:', error)
      throw new Error('Failed to refresh access token')
    }
  }

  // Get Gmail messages
  async getMessages(maxResults: number = 10, query?: string): Promise<GmailMessage[]> {
    try {
      const accessToken = await this.getValidAccessToken()
      
      let url = `${this.baseUrl}/users/me/messages?maxResults=${maxResults}`
      if (query) {
        url += `&q=${encodeURIComponent(query)}`
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }

      const data = await response.json()
      const messages: GmailMessage[] = []

      for (const messageRef of data.messages || []) {
        const message = await this.getMessage(messageRef.id)
        if (message) {
          messages.push(message)
        }
      }

      return messages
    } catch (error) {
      console.error('Error fetching Gmail messages:', error)
      throw new Error('Failed to fetch Gmail messages')
    }
  }

  // Get a specific message
  async getMessage(messageId: string): Promise<GmailMessage | null> {
    try {
      const accessToken = await this.getValidAccessToken()
      
      const response = await fetch(`${this.baseUrl}/users/me/messages/${messageId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      
      // Parse headers
      const headers = data.payload?.headers || []
      const getHeader = (name: string) => headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value

      // Get message body
      let body = ''
      if (data.payload?.body?.data) {
        body = Buffer.from(data.payload.body.data, 'base64').toString()
      } else if (data.payload?.parts) {
        for (const part of data.payload.parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            body = Buffer.from(part.body.data, 'base64').toString()
            break
          }
        }
      }

      return {
        id: data.id,
        threadId: data.threadId,
        subject: getHeader('Subject') || '',
        from: getHeader('From') || '',
        to: getHeader('To')?.split(',').map((email: string) => email.trim()) || [],
        date: getHeader('Date') || '',
        body,
        isRead: !data.labelIds?.includes('UNREAD'),
        labels: data.labelIds || []
      }
    } catch (error) {
      console.error('Error fetching Gmail message:', error)
      return null
    }
  }

  // Send an email
  async sendEmail(to: string, subject: string, body: string, isHtml: boolean = false): Promise<any> {
    try {
      const accessToken = await this.getValidAccessToken()
      
      const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        `Content-Type: ${isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`,
        '',
        body
      ].join('\n')

      const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

      const response = await fetch(`${this.baseUrl}/users/me/messages/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedMessage
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      return await response.json()
    } catch (error) {
      console.error('Error sending Gmail message:', error)
      throw new Error('Failed to send email')
    }
  }

  // Get Google Contacts
  async getContacts(): Promise<GmailContact[]> {
    try {
      const accessToken = await this.getValidAccessToken()
      
      const response = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }

      const data = await response.json()
      
      return data.connections?.map((contact: any) => ({
        id: contact.resourceName,
        name: contact.names?.[0]?.displayName || '',
        email: contact.emailAddresses?.[0]?.value || '',
        phone: contact.phoneNumbers?.[0]?.value || '',
        organization: contact.organizations?.[0]?.name || '',
        notes: ''
      })) || []
    } catch (error) {
      console.error('Error fetching Google contacts:', error)
      throw new Error('Failed to fetch contacts')
    }
  }

  // Get valid access token (refresh if needed)
  private async getValidAccessToken(): Promise<string> {
    if (!this.config.accessToken) {
      throw new Error('No access token available')
    }

    // In a real implementation, you'd check if the token is expired
    // and refresh it if necessary
    return this.config.accessToken
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const accessToken = await this.getValidAccessToken()
      
      const response = await fetch(`${this.baseUrl}/users/me/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      return response.ok
    } catch (error) {
      console.error('Gmail connection test failed:', error)
      return false
    }
  }
}
