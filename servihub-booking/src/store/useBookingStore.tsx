// src/store/useBookingStore.tsx
import { create } from 'zustand';
import type { BookingEvent } from '../types/booking';

interface BookingStore {
    events: BookingEvent[];
    addEvent: (event: BookingEvent) => void;
    updateEventStatus: (id: string, status: BookingEvent['status']) => void;
  }
  
  // events are stored in a zustand store
  export const useBookingStore = create<BookingStore>((set) => ({
    events: [
      {
        id: 'bk01',
        title: 'Math Class',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        status: 'approved',
        templateId: 'tuition-class',
      },
      {
        id: 'bk02',
        title: 'Haircut - Alice',
        start: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        end: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        status: 'pending',
        templateId: 'salon-appointment',
      },
    ],
    addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    updateEventStatus: (id, status) =>
      set((state) => ({
        events: state.events.map((ev) => (ev.id === id ? { ...ev, status } : ev)),
      })),
  }));