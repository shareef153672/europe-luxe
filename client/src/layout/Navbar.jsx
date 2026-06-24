import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

const location = useLocation();
const { currency, setCurrency } = useCurrency();

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 50);
};

window.addEventListener("scroll", handleScroll);
handleScroll();

return () => window.removeEventListener("scroll", handleScroll);

}, []);

useEffect(() => {
setMobileOpen(false);
}, [location.pathname]);

const navLinks = [
{ name: "Home", path: "/" },
{ name: "Packages", path: "/packages" },
{ name: "Why Choose Us", path: "/#why-choose-us" },
{ name: "Contact", path: "/contact" },
];

const isActive = (path) => {
if (path === "/") return location.pathname === "/";
if (path.startsWith("/#")) return false;

return location.pathname.startsWith(path);

};

return (
<header
className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#050812]/95 shadow-2xl backdrop-blur-xl"
          : "border-b border-white/5 bg-[#050812]/80 backdrop-blur-xl"
      }`}
> <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
{/* LOGO */} <Link
       to="/"
       aria-label="Europe Tourz home"
       className="flex shrink-0 items-center transition duration-300 hover:opacity-90"
     > <img
         src="/europe-tourz-logo.png"
         alt="Europe Tourz - Premium Europe Tours"
         className="h-14 w-auto object-contain sm:h-16"
       /> </Link>

    {/* DESKTOP NAV */}
    <div className="hidden items-center gap-8 text-sm font-semibold tracking-wide lg:flex">
      {navLinks.map((link) =>
        link.path.startsWith("/#") ? (
          <a
            key={link.name}
            href={link.path}
            className="text-white transition duration-300 hover:text-yellow-400"
          >
            {link.name}
          </a>
        ) : (
          <Link
            key={link.name}
            to={link.path}
            className={`transition duration-300 ${
              isActive(link.path)
                ? "text-yellow-400"
                : "text-white hover:text-yellow-400"
            }`}
          >
            {link.name}
          </Link>
        )
      )}
    </div>

    {/* DESKTOP RIGHT SIDE */}
    <div className="hidden items-center gap-4 md:flex">
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
        aria-label="Select currency"
        className="cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option className="bg-white text-black" value="INR">
          INR
        </option>

        <option className="bg-white text-black" value="EUR">
          EUR
        </option>

        <option className="bg-white text-black" value="USD">
          USD
        </option>
      </select>

      <Link
        to="/contact"
        className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-white/20"
      >
        Enquire
      </Link>

      <Link
        to="/packages"
        className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 font-semibold text-white transition duration-300 hover:scale-105"
      >
        Book Tour
      </Link>
    </div>

    {/* MOBILE MENU BUTTON */}
    <button
      type="button"
      onClick={() => setMobileOpen((currentValue) => !currentValue)}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white md:hidden"
      aria-label="Toggle mobile menu"
      aria-expanded={mobileOpen}
    >
      <span className="text-2xl">{mobileOpen ? "×" : "☰"}</span>
    </button>
  </nav>

  {/* MOBILE MENU */}
  {mobileOpen && (
    <div className="border-t border-white/10 bg-[#050812]/98 backdrop-blur-xl md:hidden">
      <div className="space-y-5 px-6 py-6">
        {navLinks.map((link) =>
          link.path.startsWith("/#") ? (
            <a
              key={link.name}
              href={link.path}
              className="block text-white transition hover:text-yellow-400"
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className={`block transition ${
                isActive(link.path)
                  ? "text-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              {link.name}
            </Link>
          )
        )}

        <div className="border-t border-white/10 pt-4">
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            aria-label="Select currency"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-xl focus:outline-none"
          >
            <option className="bg-white text-black" value="INR">
              INR
            </option>

            <option className="bg-white text-black" value="EUR">
              EUR
            </option>

            <option className="bg-white text-black" value="USD">
              USD
            </option>
          </select>
        </div>

        <Link
          to="/contact"
          className="block rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-center font-semibold text-white"
        >
          Submit Enquiry
        </Link>

        <Link
          to="/packages"
          className="block rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-4 text-center font-semibold text-white"
        >
          Book Tour
        </Link>
      </div>
    </div>
  )}
</header>

);
}
