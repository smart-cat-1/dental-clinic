import Footer from "../components/Footer";
import Header from "../components/Header";
import ContactInfo from "../components/ContactInfo";
import { useMemo, useState } from "react";

type ReserveForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
};

const initialForm: ReserveForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  message: ""
};

export default function Reserve() {
  const [form, setForm] = useState<ReserveForm>(initialForm);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setStatusMessage(null);
    setIsSuccess(false);
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.service !== "" &&
    form.date !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setStatusMessage("Please complete all required fields before submitting.");
      setIsSuccess(false);
      return;
    }

    setStatusMessage("Your appointment request has been submitted successfully.");
    setIsSuccess(true);
    console.log("Reservation request:", form);
    setForm(initialForm);
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

      {/* Main */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        {/* Left Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>

          <p className="text-gray-600 leading-8 mb-10">
            Our experienced dental specialists provide comprehensive care using advanced technology and patient-centered treatment plans. From preventive dentistry to full-mouth restoration, your smile is our priority.
          </p>

          <div className="space-y-6">
            <ContactInfo />
          </div>
        </div>

        {/* Form */}
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
                min={today}
              />
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
              disabled={!isFormValid}
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
