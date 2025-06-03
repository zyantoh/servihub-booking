import { useUser } from './context/UserContext'
import { BookingCalendar } from './features/calendar/BookingCalendar'

function App() {
  const { role } = useUser()

  return (
    <div className="min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ServiHub Booking Engine</h1>
        <span className="text-sm text-muted-foreground">Logged in as: {role}</span>
      </header>

      {role === 'customer' ? (
        <BookingCalendar />
      ) : (
        <div>
          <p>Business Dashboard (Approve / Reject View) coming soon</p>
          <BookingCalendar />
        </div>
      )}
    </div>
  )
}

export default App