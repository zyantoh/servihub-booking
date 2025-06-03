import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useMemo } from 'react'

const localizer = momentLocalizer(moment)

// events to be displayed on the calendar
const mockEvents = [
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
]

export function BookingCalendar() {
  const eventPropGetter = (event: any) => {
    
    // colour coded map status to class
    const statusClassMap: Record<string, string> = {
      approved: 'bg-emerald-400 text-white',
      pending: 'bg-indigo-400 text-white',
      rejected: 'bg-red-400 text-white',
      cancelled: 'bg-gray-400 text-white',
    }
    return {
      className: `rounded-md px-2 py-1 ${statusClassMap[event.status] || ''}`,
    }
  }

  return (
    // calendar is wrapped in a div with a fixed height
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
  )
}
