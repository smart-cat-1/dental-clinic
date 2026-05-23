import Header from "../../components/Header";
import bannerImage from "../../assets/home-banner.jpg";
import bannerTextImage from "../../assets/home-banner-text.jpg";
import doctor1 from "../../assets/doctor1.jpg";
import doctor2 from "../../assets/doctor2.jpg";
import doctor3 from "../../assets/doctor3.jpg";
import ServicePage from "../../components/Carousel";
import AdvantagesCarousel from "../../components/AdvantagesCarousel";

export default function Home() {
  return (
    <div>
      <Header />
      <main id="home" className="scroll-mt-24 flex flex-col items-center">
        <img src={bannerImage} alt="Dental Clinic" className="w-full h-auto object-cover" />
        <img src={bannerTextImage} alt="Dental Clinic" className="w-full h-auto object-cover" />

        <section id="projects" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 pl-7">Projects</h2>
            <div className="flex-col md:flex-row flex items-center justify-between gap-8">
              <p className="text-2xl pl-7">Comprehensive Dental Services</p>
              <button className="bg-blue-500 text-white px-4 py-2 mr-9 rounded hover:bg-blue-600">More+</button>
            </div>
            <ServicePage />
          </div>
        </section>

        <section className="w-full bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 pl-7">Ten Core Advantages</h2>
            <p className="text-2xl pl-7">Our commitment to quality</p>
            <AdvantagesCarousel showCount={4} className="mt-8" />
          </div>
        </section>

        <section id="team" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4">Team</h2>
            <div className="space-y-6">
              <img src={doctor1} alt="Doctor 1" className="w-full rounded-3xl object-cover" />
              <img src={doctor2} alt="Doctor 2" className="w-full rounded-3xl object-cover" />
              <img src={doctor3} alt="Doctor 3" className="w-full rounded-3xl object-cover" />
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 w-full bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4">Contact</h2>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-6">
                <p className="text-2xl">Have questions? Reach out to us!</p>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <a href="tel:123-456-7890" className="text-2xl text-blue-600 hover:text-blue-800">123-456-7890</a>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <a href="mailto:123456@ikun.com" className="text-2xl text-blue-600 hover:text-blue-800">123456@ikun.com</a>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="Lincoln Memorial Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-77.0522%2C38.8880%2C-77.0481%2C38.8905&layer=mapnik&marker=38.88926897957032%2C-77.05018048464742"
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="reserve" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16 text-center">
            <h2 className="text-5xl font-bold mb-4">Reserve</h2>
            <p className="text-2xl">Book your appointment today</p>
            <button className="mx-auto mt-10 block min-w-[260px] rounded-full bg-blue-600 px-12 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-700">
              Reserve Now
            </button>
          </div>
        </section>

        <footer className="w-full bg-black text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <div className="flex flex-col gap-6 text-center md:text-left md:flex-row md:items-center md:justify-between">
              <p className="text-lg font-semibold">Dental Clinic</p>
              <p className="text-sm text-slate-400">© 2026 Dental Clinic. All rights reserved.</p>
              <p className="text-sm text-slate-400">support@dentalclinic.com</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}