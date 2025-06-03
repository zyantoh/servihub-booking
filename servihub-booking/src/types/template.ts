export interface FieldSpec {
    id: string
    label: string
    type: 'text' | 'number' | 'select' | 'toggle'
    options?: { value: string; label: string }[]
    min?: number
    max?: number
    required?: boolean
  }
  
  export interface BookingTemplate {
    id: string
    label: string
    defaultColor: string
    fields: FieldSpec[]
    recurrence?: { allowed: boolean; defaultFreq?: 'DAILY' | 'WEEKLY' | 'MONTHLY' }
    resources?: string[]
    statusPreset?: {
      pending: string
      approved: string
      rejected: string
      cancelled: string
    }
  }
  