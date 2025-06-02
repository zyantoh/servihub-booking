// src/lib/mocks.ts
import type { BookingTemplate, Event } from '../types'

export const mockTemplates: BookingTemplate[] = [
  {
    id: 'tuition-class',
    label: 'Tuition - Class',
    defaultColor: 'bg-sky-500',
    icon: 'BookOpen',
    fields: [
      {
        id: 'subject',
        label: 'Subject',
        type: 'select',
        options: [
          { value: 'math', label: 'Mathematics' },
          { value: 'science', label: 'Science' },
          { value: 'english', label: 'English' },
        ],
        required: true,
      },
      {
        id: 'maxSlots',
        label: 'Max Slots',
        type: 'number',
        min: 1,
        max: 20,
        required: true,
      },
      {
        id: 'notes',
        label: 'Notes',
        type: 'textarea',
        required: false,
      },
    ],
    recurrence: {
      allowed: true,
      defaultFreq: 'WEEKLY',
    },
    resources: ['Teacher', 'Classroom'],
  },
  {
    id: 'salon-appointment',
    label: 'Salon - Appointment',
    defaultColor: 'bg-pink-500',
    icon: 'Scissors',
    fields: [
      {
        id: 'serviceType',
        label: 'Service Type',
        type: 'select',
        options: [
          { value: 'haircut', label: 'Haircut' },
          { value: 'coloring', label: 'Coloring' },
          { value: 'styling', label: 'Styling' },
        ],
        required: true,
      },
      {
        id: 'stylist',
        label: 'Preferred Stylist',
        type: 'select',
        options: [
          { value: 'john', label: 'John' },
          { value: 'jane', label: 'Jane' },
        ],
        required: true,
      },
    ],
    statusPreset: {
      pending: 'bg-indigo-400',
      approved: 'bg-emerald-400',
      rejected: 'bg-destructive',
      cancelled: 'bg-muted',
    },
  },
]

export const mockEvents: Event[] = [
  {
    id: 'bk_01hq0ulxx',
    templateId: 'tuition-class',
    title: 'Math Class',
    start: new Date(2025, 6, 3, 9, 0),
    end: new Date(2025, 6, 3, 10, 30),
    status: 'approved',
    resourceIds: ['teacher_034'],
    customFields: {
      maxSlots: 6,
      subject: 'math',
      recurrenceType: 'WEEKLY',
    },
  },
  {
    id: 'bk_01hq0ulxy',
    templateId: 'salon-appointment',
    title: 'Haircut',
    start: new Date(2025, 6, 4, 14, 0),
    end: new Date(2025, 6, 4, 15, 0),
    status: 'pending',
    resourceIds: ['stylist_jane'],
    customFields: {
      serviceType: 'haircut',
      stylist: 'jane',
    },
  },
]