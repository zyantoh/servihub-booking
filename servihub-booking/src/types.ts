// src/types.ts
export interface Event {
    id: string
    templateId: string
    title: string
    start: Date
    end: Date
    status: 'pending' | 'approved' | 'rejected' | 'cancelled'
    resourceIds?: string[]
    customFields?: Record<string, any>
  }