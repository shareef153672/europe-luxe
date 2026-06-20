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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050812]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-[#050812]/80 backdrop-blur-xl border-b border-white/5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="flex flex-col leading-none text-white hover:text-yellow-400 transition duration-300"
        >
          <span className="text-2xl md:text-3xl font-serif tracking-wide">
            Europe Luxe
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-yellow-400 mt-1">
            Premium Tours
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-9 text-sm font-semibold tracking-wide">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.path}
                className="text-white hover:text-yellow-400 transition duration-300"
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

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-white/10 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
          >
            <option className="text-black bg-white" value="INR">
              INR
            </option>
            <option className="text-black bg-white" value="EUR">
              EUR
            </option>
            <option className="text-black bg-white" value="USD">
              USD
            </option>
          </select>

          <Link
            to="/contact"
            className="px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/20 transition duration-300"
          >
            Enquire
          </Link>

          <Link
            to="/packages"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300"
          >
            Book Tour
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white"
          aria-label="Toggle mobile menu"
        >
          <span className="text-2xl">{mobileOpen ? "×" : "☰"}</span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050812]/98 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 space-y-5">
            {navLinks.map((link) =>
              link.path.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="block text-white hover:text-yellow-400 transition"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block transition ${
                    isActive(link.path) ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <div className="pt-4 border-t border-white/10">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-xl text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none"
              >
                <option className="text-black bg-white" value="INR">
                  INR
                </option>
                <option className="text-black bg-white" value="EUR">
                  EUR
                </option>
                <option className="text-black bg-white" value="USD">
                  USD
                </option>
              </select>
            </div>

            <Link
              to="/contact"
              className="block text-center px-5 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
            >
              Submit Enquiry
            </Link>

            <Link
              to="/packages"
              className="block text-center px-5 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold"
            >
              Book Tour
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}