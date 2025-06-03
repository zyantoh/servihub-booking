// src/types/booking.ts
export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export interface BookingEvent {
  id: string
  templateId: string
  title: string
  start: Date
  end: Date
  status: BookingStatus
}
