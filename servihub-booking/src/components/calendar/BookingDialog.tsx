// src/components/calendar/BookingDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { generateFormFields } from '../../lib/templateEngine'
import type { BookingTemplate, Event } from '../../types'
import { useState } from 'react'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: BookingTemplate
  initialData?: Partial<Event>
  onSubmit: (data: Partial<Event>) => void
}

export function BookingDialog({
  open,
  onOpenChange,
  template,
  initialData = {},
  onSubmit,
}: BookingDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    initialData.customFields || {}
  )
  const [start, setStart] = useState<Date>(initialData.start || new Date())
  const [end, setEnd] = useState<Date>(initialData.end || new Date())

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = () => {
    const eventData: Partial<Event> = {
      ...initialData,
      templateId: template.id,
      start,
      end,
      customFields: formData,
    }
    onSubmit(eventData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template.label}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Start</label>
              <input
                type="datetime-local"
                value={start.toISOString().slice(0, 16)}
                onChange={(e) => setStart(new Date(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">End</label>
              <input
                type="datetime-local"
                value={end.toISOString().slice(0, 16)}
                onChange={(e) => setEnd(new Date(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          {generateFormFields(template, formData, handleFieldChange)}

          {template.recurrence?.allowed && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Repeat</span>
              </label>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}