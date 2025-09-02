import Airtable from 'airtable'

export interface AirtableConfig {
  apiKey: string
  baseId: string
}

export interface AirtableDeal {
  id: string
  fields: {
    'Deal Name': string
    'Agent Name': string
    'Customer Name': string
    'Deal Value': number
    'Status': 'Open' | 'Closed Won' | 'Closed Lost' | 'In Progress'
    'Created Date': string
    'Close Date'?: string
    'Livestock Type': string
    'Quantity': number
    'Price Per Unit': number
    'Total Value': number
    'Notes'?: string
  }
}

export class AirtableService {
  private base: Airtable.Base

  constructor(config: AirtableConfig) {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: config.apiKey
    })
    this.base = Airtable.base(config.baseId)
  }

  // Get all deals from Airtable
  async getDeals(): Promise<AirtableDeal[]> {
    try {
      const records = await this.base('Deals').select({
        view: 'Grid view'
      }).all()

      return records.map(record => ({
        id: record.id,
        fields: record.fields as AirtableDeal['fields']
      }))
    } catch (error) {
      console.error('Error fetching deals from Airtable:', error)
      throw new Error('Failed to fetch deals from Airtable')
    }
  }

  // Create a new deal in Airtable
  async createDeal(dealData: Partial<AirtableDeal['fields']>): Promise<AirtableDeal> {
    try {
      const record = await this.base('Deals').create([
        {
          fields: dealData
        }
      ])

      return {
        id: record[0].id,
        fields: record[0].fields as AirtableDeal['fields']
      }
    } catch (error) {
      console.error('Error creating deal in Airtable:', error)
      throw new Error('Failed to create deal in Airtable')
    }
  }

  // Update a deal in Airtable
  async updateDeal(dealId: string, updates: Partial<AirtableDeal['fields']>): Promise<AirtableDeal> {
    try {
      const record = await this.base('Deals').update([
        {
          id: dealId,
          fields: updates
        }
      ])

      return {
        id: record[0].id,
        fields: record[0].fields as AirtableDeal['fields']
      }
    } catch (error) {
      console.error('Error updating deal in Airtable:', error)
      throw new Error('Failed to update deal in Airtable')
    }
  }

  // Delete a deal from Airtable
  async deleteDeal(dealId: string): Promise<boolean> {
    try {
      await this.base('Deals').destroy([dealId])
      return true
    } catch (error) {
      console.error('Error deleting deal from Airtable:', error)
      throw new Error('Failed to delete deal from Airtable')
    }
  }

  // Get agents from Airtable
  async getAgents(): Promise<any[]> {
    try {
      const records = await this.base('Agents').select({
        view: 'Grid view'
      }).all()

      return records.map(record => ({
        id: record.id,
        fields: record.fields
      }))
    } catch (error) {
      console.error('Error fetching agents from Airtable:', error)
      throw new Error('Failed to fetch agents from Airtable')
    }
  }

  // Test connection to Airtable
  async testConnection(): Promise<boolean> {
    try {
      await this.base('Deals').select({
        maxRecords: 1
      }).firstPage()
      return true
    } catch (error) {
      console.error('Airtable connection test failed:', error)
      return false
    }
  }
}
