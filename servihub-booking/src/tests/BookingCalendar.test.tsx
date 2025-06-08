// src/__tests__/BookingCalendar.test.tsx
import { render, screen } from '@testing-library/react'
import { BookingCalendar } from '../features/calendar/BookingCalendar'
import { UserProvider } from '../context/UserContext'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


describe('BookingCalendar', () => {
  it('opens dialog on slot click (customer role)', async () => {
    render(
      <UserProvider>
        <BookingCalendar />
      </UserProvider>
    )

    // Simulate slot click
    const gridCell = await screen.findAllByRole('gridcell')
    await userEvent.click(gridCell[5]) // pick a visible slot

    // Check dialog opened with name input or confirm button
    expect(await screen.findByText(/confirm/i)).toBeInTheDocument()
  })
})
