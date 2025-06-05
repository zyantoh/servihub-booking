// src/features/calendar/BookingCalendar.tsx
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import type { BookingEvent } from '../../types/booking'
import { BookingDialog } from '../booking/BookingDialog'
import { useUser } from '../../context/UserContext'
import { useBookingStore } from '../../store/useBookingStore'
import { Dialog } from '../../components/ui/dialog'

const localizer = momentLocalizer(moment)

export function BookingCalendar() {
  const { role, setRole } = useUser()
  const { events, addEvent, updateEventStatus } = useBookingStore()
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null)

  const eventPropGetter = (event: BookingEvent) => {
    const statusClassMap: Record<string, string> = {
      approved: 'bg-green-500 text-white',
      pending: 'bg-yellow-400 text-black',
      rejected: 'bg-red-500 text-white',
      cancelled: 'bg-gray-400 text-white',
    }
    return {
      className: `rounded-md px-2 py-1 text-sm shadow ${statusClassMap[event.status] || ''}`,
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1000px] max-w-sm h-[420px] bg-white dark:bg-zinc-900 rounded-2xl border border-muted shadow-xl p-4">
        <div className="mb-4 flex items-center">
          <label htmlFor="role-select" className="text-sm font-medium text-muted-foreground">Role:</label>
          <select
            id="role-select"
            className="border rounded-lg text-sm px-2 py-1 bg-background text-foreground shadow-sm"
            value={role}
            onChange={(e) => setRole(e.target.value as 'customer' | 'business')}
          >
            <option value="customer">Customer</option>
            <option value="business">Business</option>
          </select>
        </div>

        <Calendar
          selectable={role === 'customer'}
          localizer={localizer}
          defaultView={Views.MONTH}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(slot) => {
            console.log('Customer clicked slot:', slot)
            if (role === 'customer') setSelectedSlot(slot)
          }}
          onSelectEvent={(event) => {
            console.log('Business clicked event:', event)
            if (role === 'business') setSelectedEvent(event as BookingEvent)
          }}
          eventPropGetter={eventPropGetter}
          style={{ height: '100%', fontSize: '0.875rem' }}
        />

        {/* Customer Booking Dialog */}
        <BookingDialog
          open={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          slot={selectedSlot}
          onSave={(newEvent) => {
            addEvent(newEvent)
            setSelectedSlot(null)
          }}
        />

        {/* Business Booking Review Dialog */}
        <Dialog
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title="Booking Request"
        >
          {selectedEvent && (
            <div className="space-y-4">
              <div className="text-sm">
                <p><strong>Title:</strong> {selectedEvent.title}</p>
                <p><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</p>
                <p><strong>End:</strong> {selectedEvent.end.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded shadow hover:bg-green-600"
                  onClick={() => {
                    updateEventStatus(selectedEvent.id, 'approved')
                    setSelectedEvent(null)
                  }}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded shadow hover:bg-red-600"
                  onClick={() => {
                    updateEventStatus(selectedEvent.id, 'rejected')
                    setSelectedEvent(null)
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  )
}
