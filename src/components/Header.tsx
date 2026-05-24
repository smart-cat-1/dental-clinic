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
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#team">Team</a>
      <a href="#contact">Contact</a>
      <a href="#reserve">Reserve</a>
      <Link to="../admin/login" className="whitespace-nowrap">Admin Login</Link>
    </nav>
  </div>
</header>
    );
}