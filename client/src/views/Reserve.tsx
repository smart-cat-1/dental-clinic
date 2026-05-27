import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Contact from "../components/Contact";
import {
  createAppointment,
  getAppointments,
  type Appointment,
} from "../api/appointmentApi";
import {
  formatTimeLabel,
  getAvailableTimeSlots,
  getDateLimits,
  isClosedDate,
} from "../utils/appointmentRules";

type ReserveForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

const initialForm: ReserveForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

export default function Reserve() {
  const [form, setForm] = useState<ReserveForm>(initialForm);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { minDate, maxDate } = useMemo(() => getDateLimits(), []);
  const bookedTimes = useMemo(
    () => appointments.map(appointment => appointment.appointmentAt),
    [appointments]
  );
  const availableSlots = useMemo(
    () => getAvailableTimeSlots(form.date, bookedTimes),
    [bookedTimes, form.date]
  );

  useEffect(() => {
    getAppointments()
      .then(({ appointments }) => setAppointments(appointments))
      .catch(() => {
        setStatusMessage("Unable to load available appointment times.");
        setIsSuccess(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
    }));
    setStatusMessage(null);
    setIsSuccess(false);
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.service !== "" &&
    form.date !== "" &&
    form.time !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setStatusMessage("Please complete all required fields before submitting.");
      setIsSuccess(false);
      return;
    }

    if (isClosedDate(form.date) || !availableSlots.includes(form.time)) {
      setStatusMessage("Please choose an available time during office hours.");
      setIsSuccess(false);
      return;
    }

    try {
      setIsSubmitting(true);
      const { appointment } = await createAppointment({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        appointmentAt: form.time,
        message: form.message,
      });

      setAppointments(prev => [...prev, appointment]);
      setStatusMessage("Your appointment request has been submitted successfully.");
      setIsSuccess(true);
      setForm(initialForm);
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your appointment request."
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">Reserve Your Appointment</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Schedule your visit with our professional dental team.
          We are committed to providing comfortable and personalized care for every patient.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>

          <p className="text-gray-600 leading-8 mb-10">
            Our experienced dental specialists provide comprehensive care using advanced technology and patient-centered treatment plans. From preventive dentistry to full-mouth restoration, your smile is our priority.
          </p>

          <div className="space-y-6">
            <Contact />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Book Appointment</h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {statusMessage && (
              <div
                className={`rounded-2xl border px-5 py-4 text-sm ${
                  isSuccess
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-rose-300 bg-rose-50 text-rose-800"
                }`}
                role="status"
              >
                {statusMessage}
              </div>
            )}

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
                aria-required="true"
                aria-invalid={form.name.trim() === "" ? "true" : "false"}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. +1 (540) 555-1212"
                required
                aria-required="true"
                aria-invalid={form.phone.trim() === "" ? "true" : "false"}
                pattern="[0-9+()\s-]{7,25}"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
                required
                aria-required="true"
                aria-invalid={form.email.trim() === "" ? "true" : "false"}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Service</span>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
                aria-invalid={form.service === "" ? "true" : "false"}
              >
                <option value="">Select Service</option>
                <option value="Preventive Dentistry">Preventive Dentistry</option>
                <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                <option value="Implant Dentistry">Implant Dentistry</option>
                <option value="Comprehensive Treatment">Comprehensive Treatment</option>
                <option value="Orthodontics">Orthodontics</option>
                <option value="Aesthetic Dentistry">Aesthetic Dentistry</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Preferred Date</span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                aria-required="true"
                aria-invalid={form.date === "" ? "true" : "false"}
                min={minDate}
                max={maxDate}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Preferred Time</span>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                required
                disabled={!form.date || availableSlots.length === 0}
                aria-required="true"
                aria-invalid={form.time === "" ? "true" : "false"}
              >
                <option value="">
                  {form.date ? "Select available time" : "Choose a date first"}
                </option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {formatTimeLabel(slot)}
                  </option>
                ))}
              </select>
              {form.date && availableSlots.length === 0 && (
                <p className="mt-2 text-sm text-rose-600">
                  No appointment times are available for this date.
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">
                Monday-Friday 9:00 AM-6:00 PM, Saturday 9:00 AM-3:00 PM. Sundays,
                holidays, past times, and dates more than six months away are unavailable.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Additional Notes</span>
              <textarea
                name="message"
                placeholder="Tell us more about your request"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl text-lg font-semibold disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm Reservation"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
