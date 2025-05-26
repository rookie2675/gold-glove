# Project Requirements — Gym Back-Office

## 1. Project Overview

This project is a back-office web application for managing customers and employees of a boxing & kickboxing gym.  
The app will be used exclusively by the gym owner.

---

## 2. Tech Stack & Architecture

- **Framework:** Next.js (App Router)  
- **Authentication:** NextAuth.js with Credentials Provider (owner login)  
- **Database:** SQLite managed with Prisma ORM  
- **Styling:** Plain CSS (no CSS frameworks)  
- **Tables:** TanStack Table for table logic with custom CSS styling  
- **Hosting:** Vercel

---

## 3. Authentication & Security

- Full site protection — all pages require authentication  
- Owner logs in with credentials stored in environment variables

---

## 4. Data Model

### Shared Base Type: Person

| Field         | Type     | Notes                        |
| ------------- | -------- | ----------------------------|
| `id`          | string   | Unique identifier            |
| `name`        | string   | Full name                   |
| `email`       | string   | Contact email               |
| `phone`       | string?  | Optional phone number       |
| `dateOfBirth` | Date     | Date of birth               |
| `nif`         | string   | Tax identification number   |

### Customer (extends Person)

- `lastPaymentDate` (optional Date): date of last payment

### Employee (extends Person)

- `role` (string): employee role (e.g., Trainer, Front Desk)

### Prisma Schema

```prisma
model Customer {
  id              String   @id @default(cuid())
  name            String
  email           String
  phone           String?
  dateOfBirth     DateTime
  nif             String
  lastPaymentDate DateTime?
}

model Employee {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  dateOfBirth DateTime
  nif         String
  role        String
}

```

## 5. UI & Navigation

- **Header** present on all authenticated pages  
- Header includes:  
  - Gym logo (left)  
  - Navigation links: **Customers** and **Employees** pages  
- Plain CSS styling for header and navigation  
- Highlight active page link (UX improvement)

---

## 6. Tables

- Use **TanStack Table** for table logic (sorting, pagination, filtering)  
- Tables styled with plain CSS for a clean, modern look

---

## 7. Color Palette

| Color Hex | Name       | Usage                         |
| --------- | ---------- | -----------------------------|
| `#EEB348` | Gold       | Primary color, highlights     |
| `#FFE9C1` | Light Gold | Backgrounds, accents          |
| `#231F20` | Charcoal   | Text, headers, dark elements  |
| `#DBDBDB` | Light Gray | Borders, dividers, subtle accents |

---

## 8. Hosting & Deployment

- Host on **Vercel** for seamless Next.js integration

---

## 9. Future Considerations

- Responsive design for mobile  
- Accessibility improvements  
- Additional features like filtering, search, export  

---

*Document last updated: 2025-05-27*
