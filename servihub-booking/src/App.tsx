// src/App.tsx
import { useUser } from './context/UserContext'
import { BookingCalendar } from './features/calendar/BookingCalendar'
import { useBookingStore } from './store/useBookingStore'

function App() {
  const { role } = useUser()
  const { events } = useBookingStore()

  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ServiHub Booking Engine</h1>
        <span className="text-sm text-muted-foreground">Logged in as: {role}</span>
      </header>

      {role === 'customer' ? (
        <BookingCalendar />
      ) : (
        <div className="space-y-6">
          <section className="flex justify-center">
            <div className="w-[1000px]">
              <h2 className="text-xl font-semibold mb-2">Pending Bookings</h2>
              <ul className="divide-y border rounded shadow">
                {events.filter(ev => ev.status === 'pending').map(ev => (
                  <li key={ev.id} className="p-4 bg-white dark:bg-zinc-800">
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-800 dark:text-white">{ev.title}</span>
                      <span className="text-sm text-muted">{ev.start.toLocaleString()}</span>
                    </div>
                    {ev.customFields && (
                      <ul className="text-sm text-muted mt-1">
                        {Object.entries(ev.customFields).map(([key, val]) => (
                          <li key={key}><b>{key}:</b> {val as string}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="flex justify-center">
            <div className="w-[1000px]">
              <h2 className="text-xl font-semibold mb-2">Booking Calendar</h2>
              <BookingCalendar />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
