# Dental Clinic

A full-stack dental clinic web app with a React/Vite client and an Express/MySQL server. The site includes public clinic pages, service details, appointment booking, administrator login, and an appointment management panel.

## Project Structure

```text
dental-clinic/
  client/      React + TypeScript + Vite frontend
  server/      Express API server and MySQL database setup
  README.md
  .gitignore
```

## Features

- Public pages for home, services, reservation, and admin login
- Service tabs with category-specific treatment details
- Appointment reservation form
- Appointment availability based on office hours:
  - Monday-Friday: 9:00 AM-6:00 PM
  - Saturday: 9:00 AM-3:00 PM
  - Sunday: closed
- Blocks past times, booked times, holidays, and dates more than six months away
- Admin management panel for reviewing appointment requests
- Admin can confirm appointments or modify the appointment time before confirming
- Confirmed appointments appear in the admin calendar panel

## Requirements

- Node.js
- npm
- MySQL

## Database Setup

Create and seed the database with:

```sql
source server/db/init.sql;
```

The database name is `dental_login`.

Default admin login:

```text
Username: admin
Password: 123456
```

Database connection settings are currently in:

```text
server/db/index.js
```

Update the MySQL username, password, host, or database name there if your local setup is different.

## Install Dependencies

Install frontend dependencies:

```powershell
cd client
npm install
```

Install backend dependencies:

```powershell
cd ../server
npm install
```

## Run The App

Start the backend API:

```powershell
cd server
npm start
```

The backend runs on:

```text
http://localhost:3001
```

Start the frontend:

```powershell
cd client
npm run dev
```

The frontend runs on the URL printed by Vite, usually:

```text
http://localhost:5173
```

## Useful Commands

Frontend lint:

```powershell
cd client
npm run lint
```

Frontend production build:

```powershell
cd client
npm run build
```

Backend start:

```powershell
cd server
npm start
```

## API Routes

Authentication:

```text
POST /api/auth/login
```

Appointments:

```text
GET /api/appointments
POST /api/appointments
PATCH /api/appointments/:id/confirm
```

## Notes

- Keep only the root `.gitignore`; frontend and backend ignore rules are centralized there.
- The frontend expects the backend API at `http://localhost:3001`.
- The appointment feature requires MySQL to be running and the database schema to be initialized.
