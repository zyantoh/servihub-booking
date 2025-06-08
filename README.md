# 🛠️ ServiHub Booking Engine

A role-based calendar booking engine built in React with full support for customers and businesses to schedule, manage, and approve appointments.

---

## ✨ Features

### 🔀 Dual Role Support
- **Customer**
  - Select time slots from a calendar
  - Fill dynamic booking forms (e.g. Name, Remarks)
  - Submit a booking (pending status)

- **Business**
  - View all bookings
  - Approve or Reject pending requests
  - See bookings visually in calendar and list form

### 📅 Calendar
- React Big Calendar integration
- Supports Month, Week, Day views
- Click slot to book (Customer)
- Click event to approve/reject (Business)
- Color-coded booking statuses

### 🧠 Smart UI & UX
- Modal dialogs for booking and approval
- Form validation and keyboard accessibility
- State managed via Zustand
- Responsive, styled with TailwindCSS

---

## 🚀 Getting Started

### 🧰 Tech Stack

| Layer         | Tool                        |
|---------------|-----------------------------|
| Frontend      | React + TypeScript          |
| State         | Zustand                     |
| UI            | TailwindCSS + Lucide icons  |
| Calendar      | React Big Calendar          |
| Testing       | Vitest + Testing Library    |

### ⚙️ Installation

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
