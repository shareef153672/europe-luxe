import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050811] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <p className="text-2xl font-bold text-yellow-400">
                Europe Tourz
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                Premium Europe Tours
              </p>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-gray-400">
              Curated European tour experiences with comfort, premium service
              and personalised travel assistance.
            </p>

            <a
              href="mailto:info@europetourz.com"
              className="mt-5 inline-block text-yellow-300 transition hover:text-yellow-200"
            >
              info@europetourz.com
            </a>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h2>

            <nav className="mt-5 flex flex-col gap-3 text-gray-400">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/packages">Tour Packages</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/admin/login">Admin Login</FooterLink>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Featured Tours
            </h2>

            <nav className="mt-5 flex flex-col gap-3 text-gray-400">
              <FooterLink to="/package/grand-europe-discovery">
                Grand Europe Discovery
              </FooterLink>

              <FooterLink to="/package/grand-europe-express">
                Grand Europe Express
              </FooterLink>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
              Legal
            </h2>

            <nav className="mt-5 flex flex-col gap-3 text-gray-400">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms and Conditions</FooterLink>
              <FooterLink to="/cancellation-policy">
                Cancellation & Refund Policy
              </FooterLink>
              <FooterLink to="/payment-policy">Payment Policy</FooterLink>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} Europe Tourz. All rights reserved.
            </p>

            <p>
              Secure payments powered by trusted payment providers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="transition hover:text-yellow-300"
    >
      {children}
    </Link>
  );
}

export default Footer;