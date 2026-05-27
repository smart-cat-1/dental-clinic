const SLOT_MINUTES = 30;

const pad = (value: number) => String(value).padStart(2, "0");

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const toDateTimeValue = (date: Date) =>
  `${toDateKey(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const addMonths = (date: Date, months: number) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
};

const nthWeekdayOfMonth = (
  year: number,
  month: number,
  weekday: number,
  nth: number
) => {
  const date = new Date(year, month, 1);
  const offset = (weekday - date.getDay() + 7) % 7;
  date.setDate(1 + offset + (nth - 1) * 7);
  return date;
};

const lastWeekdayOfMonth = (year: number, month: number, weekday: number) => {
  const date = new Date(year, month + 1, 0);
  const offset = (date.getDay() - weekday + 7) % 7;
  date.setDate(date.getDate() - offset);
  return date;
};

const observedDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  if (date.getDay() === 0) {
    date.setDate(day + 1);
  }
  if (date.getDay() === 6) {
    date.setDate(day - 1);
  }
  return date;
};

const getHolidayKeys = (year: number) =>
  new Set([
    toDateKey(observedDate(year, 0, 1)),
    toDateKey(nthWeekdayOfMonth(year, 0, 1, 3)),
    toDateKey(nthWeekdayOfMonth(year, 1, 1, 3)),
    toDateKey(lastWeekdayOfMonth(year, 4, 1)),
    toDateKey(observedDate(year, 5, 19)),
    toDateKey(observedDate(year, 6, 4)),
    toDateKey(nthWeekdayOfMonth(year, 8, 1, 1)),
    toDateKey(nthWeekdayOfMonth(year, 9, 1, 2)),
    toDateKey(observedDate(year, 10, 11)),
    toDateKey(nthWeekdayOfMonth(year, 10, 4, 4)),
    toDateKey(observedDate(year, 11, 25)),
  ]);

export const getDateLimits = () => {
  const now = new Date();
  return {
    minDate: toDateKey(now),
    maxDate: toDateKey(addMonths(now, 6)),
  };
};

export const isClosedDate = (dateValue: string) => {
  if (!dateValue) {
    return true;
  }

  const date = new Date(`${dateValue}T12:00`);
  const day = date.getDay();

  return day === 0 || getHolidayKeys(date.getFullYear()).has(dateValue);
};

export const getAvailableTimeSlots = (
  dateValue: string,
  bookedTimes: string[],
  allowedBookedTime?: string
) => {
  if (!dateValue || isClosedDate(dateValue)) {
    return [];
  }

  const date = new Date(`${dateValue}T12:00`);
  const now = new Date();
  const maxDate = addMonths(now, 6);
  const day = date.getDay();
  const closeHour = day === 6 ? 15 : 18;
  const booked = new Set(
    bookedTimes.filter(time => time !== allowedBookedTime)
  );
  const slots: string[] = [];

  for (let hour = 9; hour < closeHour; hour += 1) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      const slot = new Date(`${dateValue}T${pad(hour)}:${pad(minute)}`);
      const value = toDateTimeValue(slot);

      if (slot <= now || slot > maxDate || booked.has(value)) {
        continue;
      }

      slots.push(value);
    }
  }

  return slots;
};

export const formatAppointmentDateTime = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const formatTimeLabel = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
