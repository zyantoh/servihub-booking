// src/features/calendar/BookingCalendar.tsx
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import type { BookingEvent } from '../../types/booking';
import { BookingDialog } from '../booking/BookingDialog';
import { useUser } from '../../context/UserContext';
import { useBookingStore } from '../../store/useBookingStore';

const localizer = momentLocalizer(moment);

export function BookingCalendar() {
  const { role, setRole } = useUser();
  const { events, addEvent, updateEventStatus } = useBookingStore();

  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);

  console.log('Current Role:', role)

  const eventPropGetter = (event: BookingEvent) => {
    const statusClassMap: Record<string, string> = {
      approved: 'bg-emerald-400 text-white',
      pending: 'bg-indigo-400 text-white',
      rejected: 'bg-red-400 text-white',
      cancelled: 'bg-gray-400 text-white',
    };
    return {
      className: `rounded-md px-2 py-1 ${statusClassMap[event.status] || ''}`,
    };
  };

  return (
    <div className="h-[700px] bg-card rounded-xl border p-2">
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="role-select" className="text-sm">User Role:</label>
        <select
          id="role-select"
          className="border p-1 rounded text-sm"
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
        onSelectSlot={slot => role === 'customer' && setSelectedSlot(slot)}
        onSelectEvent={(event) => {
          console.log("Clicked event:", event, "Role:", role)
          if (role === 'business') {
            setSelectedEvent(event as BookingEvent)
          }
        }}
        eventPropGetter={eventPropGetter}
        style={{ height: '100%' }}
      />

      {selectedSlot && (
        <BookingDialog
          open={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          slot={selectedSlot}
          onSave={(newEvent) => {
            addEvent(newEvent);
            setSelectedSlot(null);
          }}
        />
      )}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-dialog-title"
          tabIndex={-1}
          onKeyDown={(e) => e.key === 'Escape' && setSelectedEvent(null)}
        >
          <div className="bg-white dark:bg-card p-6 rounded-xl w-full max-w-md">
            <h3 id="booking-dialog-title" className="text-lg font-semibold mb-2">Booking Action</h3>
            <p>{selectedEvent.title}</p>
            <div className="flex gap-4 mt-4">
              <button onClick={() => updateEventStatus(selectedEvent.id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded focus-visible:ring">
                Approve
              </button>
              <button onClick={() => updateEventStatus(selectedEvent.id, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded focus-visible:ring">
                Reject
              </button>
              <button onClick={() => setSelectedEvent(null)} className="text-muted text-sm ml-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
