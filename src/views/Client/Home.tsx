import Header from "../../components/Header";
import bannerImage from "../../assets/home-banner.jpg";
import bannerTextImage from "../../assets/home-banner-text.png";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center">
        <img src={bannerImage} alt="Dental Clinic" className="w-full h-auto object-cover" />
        <img src={bannerTextImage} alt="Dental Clinic" className="w-full h-auto object-cover" />

        <section id="projects" className="w-full max-w-6xl px-4 py-12 bg-gray-100">
          <h2 className="text-5xl font-bold mb-4">Projects</h2>
          <div className="flex-col md:flex-row flex items-center justify-between gap-8">
            <p className="text-2xl">Comprehensive Dental Services</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">More+</button>
          </div>
          <div></div>
        </section>

        <section className="w-full max-w-6xl px-4 py-12 bg-white">
          <h2 className="text-5xl font-bold mb-4">12 Core Advantages</h2>
          <p className="text-2xl">Our commitment to quality</p>
        </section>

        <section id="team" className="w-full max-w-6xl px-4 py-12 bg-gray-100">
          <h2 className="text-5xl font-bold mb-4">Team</h2>
          <div className="flex-col md:flex-row flex items-center justify-between gap-8">
            <p className="text-2xl">We are a team of dedicated dental professionals</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">More+</button>
          </div>
        </section>

        <section id="contact" className="w-full max-w-6xl px-4 py-12 bg-white">
          <h2 className="text-5xl font-bold mb-4">Contact</h2>
          <div className="flex-col md:flex-row flex items-center justify-between gap-8">
            <p className="text-2xl">Have questions? Reach out to us!</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Now</button>
          </div>
        </section>

        <section id="reserve" className="w-full max-w-6xl px-4 py-12 bg-gray-100">
          <h2 className="text-5xl font-bold mb-4">Reserve</h2>
          <p className="text-2xl">Book your appointment today</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Now</button>
        </section>
      </main>
    </div>
  );
}