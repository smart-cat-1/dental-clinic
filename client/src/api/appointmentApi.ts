export type AppointmentStatus = "pending" | "confirmed";

export type Appointment = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentAt: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
  confirmedAt: string | null;
};

export type AppointmentPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  appointmentAt: string;
  message: string;
};

const API_BASE = "http://localhost:3001/api";

const parseResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getAppointments = async () => {
  const response = await fetch(`${API_BASE}/appointments`);
  return parseResponse<{ appointments: Appointment[] }>(response);
};

export const createAppointment = async (payload: AppointmentPayload) => {
  const response = await fetch(`${API_BASE}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return parseResponse<{ appointment: Appointment }>(response);
};

export const confirmAppointment = async (
  id: number,
  appointmentAt: string
) => {
  const response = await fetch(`${API_BASE}/appointments/${id}/confirm`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appointmentAt }),
  });

  return parseResponse<{ appointment: Appointment }>(response);
};
