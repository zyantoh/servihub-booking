// src/lib/templateEngine.ts
import type { BookingTemplate, FieldSpec } from '../types'

export function getTemplateById(templates: BookingTemplate[], id: string) {
  return templates.find((template) => template.id === id)
}

export function generateFormFields(
  template: BookingTemplate,
  values: Record<string, any> = {},
  onChange: (fieldId: string, value: any) => void
) {
  return template.fields.map((field) => {
    const commonProps = {
      key: field.id,
      id: field.id,
      label: field.label,
      required: field.required,
      value: values[field.id] || '',
      onChange: (value: any) => onChange(field.id, value),
    }

    switch (field.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium">
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <input
              type="text"
              id={field.id}
              value={values[field.id] || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required={field.required}
            />
          </div>
        )
      case 'number':
        return (
          <div className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium">
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <input
              type="number"
              id={field.id}
              min={field.min}
              max={field.max}
              value={values[field.id] || ''}
              onChange={(e) => onChange(field.id, parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
              required={field.required}
            />
          </div>
        )
      case 'select':
        return (
          <div className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium">
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </label>
            <select
              id={field.id}
              value={values[field.id] || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required={field.required}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )
      // Add cases for other field types (textarea, multiselect, date, time, toggle)
      default:
        return null
    }
  })
}