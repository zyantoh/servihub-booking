// src/components/calendar/BookingDialog.tsx
import { useState } from 'react';
import type { Event, BookingTemplate } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: BookingTemplate;
  initialData?: Partial<Event>;
  onSubmit: (data: Partial<Event>) => void;
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
  );
  const [start, setStart] = useState<Date>(initialData.start || new Date());
  const [end, setEnd] = useState<Date>(initialData.end || new Date());

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    const eventData: Partial<Event> = {
      ...initialData,
      templateId: template.id,  // Now properly included in the type
      start,
      end,
      customFields: formData,
    };
    onSubmit(eventData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template.label}</DialogTitle>
        </DialogHeader>
        
        {/* Rest of your dialog content */}
      </DialogContent>
    </Dialog>
  );
}