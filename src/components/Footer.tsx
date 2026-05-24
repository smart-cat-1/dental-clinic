import logo from "../assets/home/logo2.png";

export default function Footer() {
    return (
<footer className="w-full bg-black text-white border-t border-white/10">
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 xl:px-16">
    
    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

      <div className="lg:col-span-2">
        <img src={logo} alt="Logo" className="h-12" />

        <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
          Providing premium dental care with advanced technology and
          compassionate specialists. Your healthy smile is our priority.
        </p>

        <div className="mt-6 flex gap-4">
          {["FB", "IG", "X", "LN"].map((item) => (
            <div
              key={item}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 text-xs transition hover:border-cyan-400 hover:text-cyan-400"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
          Quick Links
        </h3>

        <ul className="flex flex-col mt-5 space-y-3 text-sm text-slate-400">
          {["Home", "Services", "Team", "Contact", "Reserve"].map(
            (link) => (
              <a
                href={`#${link.toLowerCase()}`}
                key={link}
                className="cursor-pointer transition hover:text-cyan-400"
              >
                {link}
              </a>
            )
          )}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
          Services
        </h3>

        <ul className="mt-5 space-y-3 text-sm text-slate-400">
          {[
            "Preventive Dentistry",
            "Pediatric Dentistry",
            "Implant Dentistry",
            "Comprehensive Treatment",
            "Orthodontics",
            "Aesthetic Dentistry",
          ].map((service) => (
            <li
              key={service}
              className="cursor-pointer transition hover:text-cyan-400"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80">
          Contact
        </h3>

        <div className="mt-5 space-y-4 text-sm text-slate-400">
          <p>support@dentalclinic.com</p>
          <p>+1 (540) 555-1212</p>
          <p>
            1200 Healthcare Drive <br />
            Richmond, VA, 23220
          </p>

          <div className="pt-2">
            <p className="text-white">Mon - Fri</p>
            <p>9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>

    <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    {/* Bottom */}
    <div className="flex flex-col gap-4 text-center text-sm text-slate-500 md:flex-row md:justify-between">
      <p>© 2026 Dental Clinic. All rights reserved.</p>

      <div className="flex justify-center gap-6">
        <p className="cursor-pointer hover:text-cyan-400 transition">
          Privacy Policy
        </p>
        <p className="cursor-pointer hover:text-cyan-400 transition">
          Terms of Service
        </p>
      </div>
    </div>
  </div>
</footer>
);
}