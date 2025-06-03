import { BookingCalendar } from './features/calendar/BookingCalendar'

function App() {
  return (
    <main className="min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold mb-4">Booking Engine Calendar</h1>
      <BookingCalendar />
    </main>
  )
}

export default App
