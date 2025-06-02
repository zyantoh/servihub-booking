// src/components/calendar/BookingCalendar.tsx
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import type { Event } from '../../types'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface BookingCalendarProps {
  events: Event[]
  onSelectEvent?: (event: Event) => void
  onSelectSlot?: (slotInfo: {
    start: Date
    end: Date
    action: 'select' | 'click' | 'doubleClick'
  }) => void
  defaultView?: 'month' | 'week' | 'day' | 'agenda'
}

export function BookingCalendar({
  events,
  onSelectEvent,
  onSelectSlot,
  defaultView = Views.WEEK,
}: BookingCalendarProps) {
  return (
    <div className="h-[800px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={defaultView}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={(event) => {
          const status = event.status
          let backgroundColor = ''
          
          if (status === 'pending') backgroundColor = 'bg-indigo-400'
          if (status === 'approved') backgroundColor = 'bg-emerald-400'
          if (status === 'rejected') backgroundColor = 'bg-destructive'
          if (status === 'cancelled') backgroundColor = 'bg-muted'
          
          return {
            className: `${backgroundColor} text-foreground`,
          }
        }}
      />
    </div>
  )
}