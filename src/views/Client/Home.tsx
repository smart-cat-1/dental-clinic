import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactInfo from "../../components/ContactInfo";
import bannerImage from "../../assets/home/banner.jpg";
import bannerTextImage from "../../assets/home/text.jpg";
import doctor1 from "../../assets/team/doctor1.jpg";
import doctor2 from "../../assets/team/doctor2.jpg";
import doctor3 from "../../assets/team/doctor3.jpg";
import { AdvantagePage, ServicePage} from "../../components/CarouselPage";



export default function Home() {
  return (
    <div>
      <Header />
      <main id="home" className="scroll-mt-24 flex flex-col items-center">
        <img src={bannerImage} alt="Dental Clinic" className="w-full h-auto object-cover" />
        <img src={bannerTextImage} alt="Dental Clinic" className="w-full h-auto object-cover" />

        <section id="services" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 pl-7 text-blue-800">Services</h2>
            <div className="flex-col md:flex-row flex items-center justify-between gap-8">
              <p className="text-2xl pl-7">Our Professional Dental Treatments</p>
              <Link to="/services" className="bg-blue-500 text-white px-4 py-2 mr-9 rounded hover:bg-blue-600">More+</Link>
            </div>
            <ServicePage />
          </div>
        </section>

        <section className="w-full bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 pl-7 text-blue-800">Nine Core Advantages</h2>
            <p className="text-2xl pl-7">Why choose us?</p>
            <AdvantagePage />
          </div>
        </section>

        <section id="team" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 text-blue-800 pl-7">Team</h2>
            <p className="text-2xl pl-7 mb-8">Main Professional Dental Experts</p>
            <div className="space-y-6">
              <img src={doctor1} alt="Doctor 1" className="w-full rounded-3xl object-cover" />
              <img src={doctor2} alt="Doctor 2" className="w-full rounded-3xl object-cover" />
              <img src={doctor3} alt="Doctor 3" className="w-full rounded-3xl object-cover" />
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 w-full bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16">
            <h2 className="text-5xl font-bold mb-4 text-blue-800 pl-7">Contact</h2>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-6">
                <p className="text-2xl pl-7">Have questions? Reach out to us!</p>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <ContactInfo />
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="Lincoln Memorial Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-77.0522%2C38.8880%2C-77.0481%2C38.8905&layer=mapnik&marker=38.88926897957032%2C-77.05018048464742"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="reserve" className="scroll-mt-24 w-full bg-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 xl:px-16 text-center">
            <h2 className="text-5xl font-bold mb-4 text-blue-800">Reserve</h2>
            <p className="text-2xl">Book your appointment today</p>
            <Link to="/reserve" className="mx-auto mt-10 block min-w-[260px] rounded-full bg-blue-600 px-12 py-4 text-lg font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-700">
              Reserve Now
            </Link>
          </div>
        </section>

        <footer className="w-full bg-black">
          <Footer />
        </footer>

      </main>
    </div>
  );
}