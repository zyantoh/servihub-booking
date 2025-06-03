// src/features/templates/templates.ts
import type { BookingTemplate } from "../../types/template"

// 2 booking templates to be used to in the app
export const templates: BookingTemplate[] = [
  {
    id: "tuition-class",
    label: "Tuition Class",
    defaultColor: "bg-sky-500",
    fields: [
      { id: "subject", label: "Subject", type: "text", required: true },
      { id: "maxSlots", label: "Max Slots", type: "number", required: true, min: 1, max: 30 },
    ],
    recurrence: { allowed: true, defaultFreq: "WEEKLY" },
    resources: ["Teacher", "Classroom"],
    statusPreset: {
      pending: "bg-indigo-400",
      approved: "bg-emerald-400",
      rejected: "bg-red-500",
      cancelled: "bg-gray-400",
    },
  },
  {
    id: "salon-appointment",
    label: "Salon Appointment",
    defaultColor: "bg-pink-400",
    fields: [
      {
        id: "serviceType",
        label: "Service Type",
        type: "select",
        required: true,
        options: [
          { value: "cut", label: "Haircut" },
          { value: "color", label: "Coloring" },
        ],
      },
      { id: "stylist", label: "Stylist", type: "text" },
    ],
    recurrence: { allowed: false },
    resources: ["Stylist", "Room"],
    statusPreset: {
      pending: "bg-indigo-400",
      approved: "bg-green-400",
      rejected: "bg-red-400",
      cancelled: "bg-gray-400",
    },
  },
]
