// src/features/booking/BookingDialog.tsx
import { useState } from 'react';
import { Dialog } from '../../components/ui/dialog';
import { templates } from '../templates/templates';
import type { BookingEvent } from '../../types/booking';
import { v4 as uuidv4 } from 'uuid';
import type { FC, JSX } from 'react'

export function BookingDialog({
  open,
  onClose,
  slot,
  onSave,
}: {
  open: boolean
  onClose: () => void
  slot: any
  onSave: (event: BookingEvent) => void
}): JSX.Element | null {
  const [templateId, setTemplateId] = useState('tuition-class');
  const template = templates.find(t => t.id === templateId);
  const [formState, setFormState] = useState<Record<string, any>>({});

  if (!template) return <></>;

  const handleChange = (id: string, value: any) => {
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const title = formState.subject || template.label;
    const newEvent: BookingEvent = {
      id: uuidv4(),
      title,
      templateId,
      start: slot.start,
      end: slot.end,
      status: 'pending',
    };
    onSave(newEvent);
  };

  // Render the dialog when a date on the calendar is clicked
  return (
    <Dialog open={open} onClose={onClose} title="New Booking">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Template</label>
        <select
          className="w-full border p-2 rounded"
          value={templateId}
          onChange={e => setTemplateId(e.target.value)}>
          {templates.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>

        {template.fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium">{field.label}</label>
            {field.type === 'text' || field.type === 'number' ? (
              <input
                type={field.type}
                className="w-full border p-2 rounded"
                value={formState[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
              />
            ) : field.type === 'select' && field.options ? (
              <select
                className="w-full border p-2 rounded"
                value={formState[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}>
                <option value="">Select...</option>
                {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            ) : null}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-primary text-white rounded px-4 py-2 mt-4">
          Save Booking
        </button>
      </div>
    </Dialog>
  );
}
