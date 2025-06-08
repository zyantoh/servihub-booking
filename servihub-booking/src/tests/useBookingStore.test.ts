// src/__tests__/useBookingStore.test.ts
import { describe, it, expect } from 'vitest'
import { useBookingStore } from '../store/useBookingStore'

describe('useBookingStore', () => {
  it('adds a booking event', () => {
    const store = useBookingStore.getState()
    const originalLength = store.events.length

    store.addEvent({
      id: 'test',
      templateId: 'salon',
      title: 'Test Booking',
      start: new Date(),
      end: new Date(),
      status: 'pending',
    })

    expect(store.events.length).toBe(originalLength + 1)
    expect(store.events.at(-1)?.title).toBe('Test Booking')
  })

  it('updates booking status', () => {
    const store = useBookingStore.getState()
    const event = store.events[0]
    store.updateEventStatus(event.id, 'approved')
    expect(
      useBookingStore.getState().events.find(e => e.id === event.id)?.status
    ).toBe('approved')
  })
})
