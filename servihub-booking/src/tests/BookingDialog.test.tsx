// src/__tests__/BookingDialog.test.tsx
import { render, screen } from '@testing-library/react'
import { BookingDialog } from '../features/booking/BookingDialog'
import userEvent from '@testing-library/user-event'
import { describe, it, vi, expect } from 'vitest'

describe('BookingDialog', () => {
  it('renders form fields and calls onSave', async () => {
    const onSave = vi.fn()
    const slot = { start: new Date(), end: new Date() }

    render(<BookingDialog open={true} onClose={() => {}} onSave={onSave} slot={slot} />)

    const input = screen.getByLabelText(/name/i)
    await userEvent.type(input, 'Jane Doe')

    await userEvent.click(screen.getByRole('button', { name: /confirm/i }))
    expect(onSave).toHaveBeenCalled()
  })
})
