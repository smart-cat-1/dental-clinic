import {Link} from "react-router-dom";
import logo from "../assets/home/logo.jpg";

export default function Header() {
    return (
<header className="sticky top-0 z-50 bg-white px-[8%] py-6">
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="flex items-end flex-shrink-0">
      <img src={logo} alt="Logo" className="h-16" />
    </div>

    <nav className="flex flex-wrap justify-center md:justify-end gap-4 [&>a]:hover:text-blue-600 gap-8 flex-1 min-w-[240px]">
      <a href="/#home">Home</a>

      <div className="relative group inline-block">
          <span className="cursor-pointer flex items-center gap-1 hover:text-blue-600">
            <a href="/#services">Services</a>
            <span className="inline-block transition-transform duration-200 group-hover:rotate-180">∧</span>
          </span>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full hidden group-hover:block bg-white shadow-2lg py-2 min-w-[250px] border-y">
            <Link to="/services?tab=preventive" className="block px-4 py-2 hover:bg-gray-100">Preventive Dentistry</Link>
            <Link to="/services?tab=pediatric" className="block px-4 py-2 hover:bg-gray-100">Pediatric Dentistry</Link>
            <Link to="/services?tab=implant" className="block px-4 py-2 hover:bg-gray-100">Implant Dentistry</Link>
            <Link to="/services?tab=comprehensive" className="block px-4 py-2 hover:bg-gray-100">Comprehensive Treatment</Link>
            <Link to="/services?tab=orthodontics" className="block px-4 py-2 hover:bg-gray-100">Orthodontics</Link>
            <Link to="/services?tab=aesthetic" className="block px-4 py-2 hover:bg-gray-100">Aesthetic Dentistry</Link>
          </div>
        </div>

      <a href="/#team">Team</a>
      <a href="/#contact">Contact</a>
      <a href="/#reserve">Reserve</a>
      <Link to="../admin/login" className="whitespace-nowrap">Admin Login</Link>
    </nav>
  </div>
</header>
    );
}