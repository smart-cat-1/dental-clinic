import { useEffect, useMemo, useState } from "react";
import {
  confirmAppointment,
  getAppointments,
  type Appointment,
} from "../api/appointmentApi";
import Header from "../components/Header";
import {
  formatAppointmentDateTime,
  formatTimeLabel,
  getAvailableTimeSlots,
  getDateLimits,
} from "../utils/appointmentRules";

type EditState = Record<number, { date: string; time: string }>;

const getDatePart = (value: string) => value.slice(0, 10);

export default function Management() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editState, setEditState] = useState<EditState>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const { minDate, maxDate } = useMemo(() => getDateLimits(), []);
  const bookedTimes = useMemo(
    () => appointments.map(appointment => appointment.appointmentAt),
    [appointments]
  );
  const pendingAppointments = appointments.filter(
    appointment => appointment.status === "pending"
  );
  const confirmedAppointments = appointments.filter(
    appointment => appointment.status === "confirmed"
  );

  useEffect(() => {
    getAppointments()
      .then(({ appointments }) => {
        setAppointments(appointments);
        setEditState(
          Object.fromEntries(
            appointments.map(appointment => [
              appointment.id,
              {
                date: getDatePart(appointment.appointmentAt),
                time: appointment.appointmentAt,
              },
            ])
          )
        );
      })
      .catch(error => {
        setStatusMessage(
          error instanceof Error ? error.message : "Unable to load appointments."
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateEditState = (
    appointment: Appointment,
    field: "date" | "time",
    value: string
  ) => {
    setEditState(prev => ({
      ...prev,
      [appointment.id]: {
        date:
          field === "date"
            ? value
            : prev[appointment.id]?.date || getDatePart(appointment.appointmentAt),
        time: field === "date" ? "" : value,
      },
    }));
    setStatusMessage(null);
  };

  const handleConfirm = async (appointment: Appointment) => {
    const selectedTime =
      editState[appointment.id]?.time || appointment.appointmentAt;

    if (!selectedTime) {
      setStatusMessage("Please choose an appointment time before confirming.");
      return;
    }

    try {
      setConfirmingId(appointment.id);
      const { appointment: updatedAppointment } = await confirmAppointment(
        appointment.id,
        selectedTime
      );

      setAppointments(prev =>
        prev.map(item =>
          item.id === updatedAppointment.id ? updatedAppointment : item
        )
      );
      setEditState(prev => ({
        ...prev,
        [updatedAppointment.id]: {
          date: getDatePart(updatedAppointment.appointmentAt),
          time: updatedAppointment.appointmentAt,
        },
      }));
      setStatusMessage("Appointment added to the admin calendar.");
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to confirm appointment."
      );
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Management</h1>
          <p className="mt-2 text-slate-600">
            Review appointment requests, adjust times, and add confirmed visits to the admin calendar.
          </p>
        </div>

        {statusMessage && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-900">
            {statusMessage}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Appointment Requests
              </h2>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                {pendingAppointments.length} pending
              </span>
            </div>

            {isLoading ? (
              <div className="rounded-lg bg-white p-8 text-slate-500 shadow-sm">
                Loading appointments...
              </div>
            ) : pendingAppointments.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-slate-500 shadow-sm">
                No pending appointment requests.
              </div>
            ) : (
              <div className="grid gap-5">
                {pendingAppointments.map(appointment => {
                  const selectedDate =
                    editState[appointment.id]?.date ||
                    getDatePart(appointment.appointmentAt);
                  const selectedTime =
                    editState[appointment.id]?.time || appointment.appointmentAt;
                  const availableSlots = getAvailableTimeSlots(
                    selectedDate,
                    bookedTimes,
                    appointment.appointmentAt
                  );

                  return (
                    <article
                      key={appointment.id}
                      className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {appointment.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Requested {formatAppointmentDateTime(appointment.appointmentAt)}
                          </p>
                        </div>
                        <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                        <p><span className="font-semibold text-slate-900">Phone:</span> {appointment.phone}</p>
                        <p><span className="font-semibold text-slate-900">Email:</span> {appointment.email}</p>
                        <p><span className="font-semibold text-slate-900">Service:</span> {appointment.service}</p>
                        <p><span className="font-semibold text-slate-900">Submitted:</span> {formatAppointmentDateTime(appointment.createdAt)}</p>
                      </div>

                      {appointment.message && (
                        <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                          {appointment.message}
                        </p>
                      )}

                      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                        <label className="block">
                          <span className="text-sm font-medium text-slate-700">
                            Appointment Date
                          </span>
                          <input
                            type="date"
                            min={minDate}
                            max={maxDate}
                            value={selectedDate}
                            onChange={event =>
                              updateEditState(appointment, "date", event.target.value)
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium text-slate-700">
                            Appointment Time
                          </span>
                          <select
                            value={selectedTime}
                            onChange={event =>
                              updateEditState(appointment, "time", event.target.value)
                            }
                            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select time</option>
                            {availableSlots.map(slot => (
                              <option key={slot} value={slot}>
                                {formatTimeLabel(slot)}
                              </option>
                            ))}
                          </select>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleConfirm(appointment)}
                          disabled={confirmingId === appointment.id || !selectedTime}
                          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                          {confirmingId === appointment.id ? "Adding..." : "Confirm"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <aside>
            <h2 className="mb-4 text-2xl font-semibold text-slate-900">
              Admin Calendar
            </h2>
            <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
              {confirmedAppointments.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Confirmed appointments will appear here.
                </p>
              ) : (
                <div className="space-y-4">
                  {confirmedAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className="rounded-lg border border-emerald-200 bg-emerald-50 p-4"
                    >
                      <p className="font-semibold text-emerald-950">
                        {formatAppointmentDateTime(appointment.appointmentAt)}
                      </p>
                      <p className="mt-1 text-sm text-emerald-900">
                        {appointment.name} - {appointment.service}
                      </p>
                      <p className="mt-1 text-xs text-emerald-700">
                        {appointment.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
