// src/types.ts
export interface BookingTemplate {
    id: string;
    label: string;
    defaultColor: string;
    icon?: string;
    fields: FieldSpec[];
    statusPreset?: {
      pending: string;
      approved: string;
      rejected: string;
      cancelled: string;
    };
    recurrence?: {
      allowed: boolean;
      defaultFreq?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    };
    resources?: string[];
  }
  
  export interface FieldSpec {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'date' | 'time' | 'toggle';
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    required?: boolean;
  }
  
  export interface Event {
    id: string;
    templateId: string;
    title: string;
    start: Date;
    end: Date;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled';
    resourceIds?: string[];
    customFields?: Record<string, any>;
  }