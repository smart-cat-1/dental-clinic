const db = require("../db/index");

const SLOT_MINUTES = 30;

const pad = (value) => String(value).padStart(2, "0");

const toMysqlDateTime = (value) => value.replace("T", " ") + ":00";

const toClientDateTime = (value) => {
  if (value instanceof Date) {
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}T${pad(value.getHours())}:${pad(value.getMinutes())}`;
  }

  return String(value).replace(" ", "T").slice(0, 16);
};

const addMonths = (date, months) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
};

const nthWeekdayOfMonth = (year, month, weekday, nth) => {
  const date = new Date(year, month, 1);
  const offset = (weekday - date.getDay() + 7) % 7;
  date.setDate(1 + offset + (nth - 1) * 7);
  return date;
};

const lastWeekdayOfMonth = (year, month, weekday) => {
  const date = new Date(year, month + 1, 0);
  const offset = (date.getDay() - weekday + 7) % 7;
  date.setDate(date.getDate() - offset);
  return date;
};

const observedDate = (year, month, day) => {
  const date = new Date(year, month, day);
  if (date.getDay() === 0) {
    date.setDate(day + 1);
  }
  if (date.getDay() === 6) {
    date.setDate(day - 1);
  }
  return date;
};

const dateKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const getHolidayKeys = (year) =>
  new Set([
    dateKey(observedDate(year, 0, 1)),
    dateKey(nthWeekdayOfMonth(year, 0, 1, 3)),
    dateKey(nthWeekdayOfMonth(year, 1, 1, 3)),
    dateKey(lastWeekdayOfMonth(year, 4, 1)),
    dateKey(observedDate(year, 5, 19)),
    dateKey(observedDate(year, 6, 4)),
    dateKey(nthWeekdayOfMonth(year, 8, 1, 1)),
    dateKey(nthWeekdayOfMonth(year, 9, 1, 2)),
    dateKey(observedDate(year, 10, 11)),
    dateKey(nthWeekdayOfMonth(year, 10, 4, 4)),
    dateKey(observedDate(year, 11, 25)),
  ]);

const ensureAppointmentsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      service VARCHAR(255) NOT NULL,
      appointment_at DATETIME NOT NULL UNIQUE,
      message TEXT,
      status ENUM('pending', 'confirmed') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      confirmed_at TIMESTAMP NULL DEFAULT NULL
    )
  `);
};

const validateAppointmentAt = (appointmentAt) => {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(appointmentAt || "")) {
    return "Please choose an appointment date and time.";
  }

  const date = new Date(appointmentAt);
  const now = new Date();
  const maxDate = addMonths(now, 6);
  const day = date.getDay();
  const minutes = date.getHours() * 60 + date.getMinutes();
  const closeMinutes = day === 6 ? 15 * 60 : 18 * 60;
  const holidays = getHolidayKeys(date.getFullYear());

  if (Number.isNaN(date.getTime())) {
    return "Please choose a valid appointment time.";
  }
  if (date <= now) {
    return "Please choose a future appointment time.";
  }
  if (date > maxDate) {
    return "Appointments can only be booked within the next six months.";
  }
  if (day === 0 || holidays.has(dateKey(date))) {
    return "The clinic is closed on Sundays and holidays.";
  }
  if (minutes < 9 * 60 || minutes >= closeMinutes || minutes % SLOT_MINUTES !== 0) {
    return "Please choose a time during office hours.";
  }

  return null;
};

const mapAppointment = (row) => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email,
  service: row.service,
  appointmentAt: toClientDateTime(row.appointment_at),
  message: row.message || "",
  status: row.status,
  createdAt: toClientDateTime(row.created_at),
  confirmedAt: row.confirmed_at ? toClientDateTime(row.confirmed_at) : null,
});

exports.listAppointments = async (_req, res) => {
  try {
    await ensureAppointmentsTable();
    const [rows] = await db.query(
      "SELECT * FROM appointments ORDER BY appointment_at ASC, created_at ASC"
    );
    res.json({ appointments: rows.map(mapAppointment) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load appointments." });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    await ensureAppointmentsTable();
    const { name, phone, email, service, appointmentAt, message } = req.body;

    if (!name || !phone || !email || !service) {
      return res.status(400).json({ message: "Please complete all required fields." });
    }

    const validationError = validateAppointmentAt(appointmentAt);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const [result] = await db.query(
      `INSERT INTO appointments
        (name, phone, email, service, appointment_at, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name.trim(), phone.trim(), email.trim(), service, toMysqlDateTime(appointmentAt), message || ""]
    );

    const [rows] = await db.query("SELECT * FROM appointments WHERE id = ?", [result.insertId]);
    res.status(201).json({ appointment: mapAppointment(rows[0]) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This appointment time is already booked." });
    }
    console.error(error);
    res.status(500).json({ message: "Unable to create appointment." });
  }
};

exports.confirmAppointment = async (req, res) => {
  try {
    await ensureAppointmentsTable();
    const { id } = req.params;
    const { appointmentAt } = req.body;

    const validationError = validateAppointmentAt(appointmentAt);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await db.query(
      `UPDATE appointments
       SET appointment_at = ?, status = 'confirmed', confirmed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [toMysqlDateTime(appointmentAt), id]
    );

    const [rows] = await db.query("SELECT * FROM appointments WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.json({ appointment: mapAppointment(rows[0]) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This appointment time is already booked." });
    }
    console.error(error);
    res.status(500).json({ message: "Unable to confirm appointment." });
  }
};
