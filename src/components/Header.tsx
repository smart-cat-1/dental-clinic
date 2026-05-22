import {Link} from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
    return (
<header className="sticky top-0 bg-white px-[8%] py-6">
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="flex items-end flex-shrink-0">
      <img src={logo} alt="Logo" className="h-16" />
    </div>

    <nav className="flex flex-wrap justify-center md:justify-end gap-4 [&>a]:hover:text-blue-600 gap-8 flex-1 min-w-[240px]">
      <Link to="/">Home</Link>
      <Link to="#projects">Projects</Link>
      <Link to="/team">Team</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/reserve">Reserve</Link>
      <Link className="whitespace-nowrap" to="/admin/login">Admin Login</Link>
    </nav>
  </div>
</header>
    );
}