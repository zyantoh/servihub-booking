// src/features/calendar/BookingCalendar.tsx
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo } from 'react';
import type { BookingEvent } from '../../types/booking';

const localizer = momentLocalizer(moment);

const mockEvents: BookingEvent[] = [
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
];

export function BookingCalendar() {
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
      <Calendar
        localizer={localizer}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        events={mockEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventPropGetter}
        style={{ height: '100%' }}
      />
    </div>
  );
}
