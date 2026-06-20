import { Link } from "react-router-dom";
import { packages } from "../assets/data/packages";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050812] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="text-3xl font-serif tracking-wide text-white hover:text-yellow-400 transition"
            >
              Europe Luxe
            </Link>

            <p className="text-gray-400 mt-5 leading-relaxed">
              Premium Europe tour packages designed for Indian travelers with
              5-star hotels, Indian meals, private coach travel, and
              English/Hindi tour management.
            </p>

            <div className="flex gap-3 mt-6">
              <span className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                f
              </span>
              <span className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                in
              </span>
              <span className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                ▶
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-yellow-400 transition"
                >
                  Packages
                </Link>
              </li>
              <li>
                <a href="/#why-choose-us" className="hover:text-yellow-400 transition">
                  Why Choose Us
                </a>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-yellow-400 transition"
                >
                  Book Your Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* PACKAGES */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Tour Packages</h3>

            <ul className="space-y-3 text-gray-400">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    to={`/package/${pkg.id}`}
                    className="hover:text-yellow-400 transition"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Contact & Support</h3>

            <div className="space-y-4 text-gray-400">
              <p>
                <span className="text-white font-medium">Support:</span>
                <br />
                Available for tour queries and booking assistance.
              </p>

              <p>
                <span className="text-white font-medium">Email:</span>
                <br />
                support@europeluxe.com
              </p>

              <p>
                <span className="text-white font-medium">Specialized In:</span>
                <br />
                Switzerland, Germany, Austria, Hungary, Czech Republic,
                Slovakia & Slovenia tours.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-sm">
          <p>© {currentYear} Europe Luxe. All rights reserved.</p>

          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Cancellation Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}