import { Link } from "react-router-dom";

function Footer() {
const currentYear = new Date().getFullYear();

return ( <footer className="border-t border-white/10 bg-[#050811] text-white"> <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"> <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5"> <div className="lg:col-span-2"> <Link
           to="/"
           aria-label="Europe Tourz home"
           className="inline-flex items-center transition hover:opacity-90"
         > <img
             src="/europe-tourz-logo.png"
             alt="Europe Tourz - Premium Europe Tours"
             className="h-20 w-auto object-contain sm:h-24"
           /> </Link>

        <p className="mt-5 max-w-md leading-7 text-gray-400">
          Curated European tour experiences with comfortable travel,
          premium service, transparent planning and personalised customer
          assistance.
        </p>

        <div className="mt-5 space-y-3">
          <a
            href="mailto:info@europetourz.com"
            className="block text-yellow-300 transition hover:text-yellow-200"
          >
            info@europetourz.com
          </a>

          <a
            href="https://wa.me/421951819086"
            target="_blank"
            rel="noreferrer"
            className="block text-gray-400 transition hover:text-white"
          >
            +421 951 819 086
          </a>

          <a
            href="https://wa.me/917022440601"
            target="_blank"
            rel="noreferrer"
            className="block text-gray-400 transition hover:text-white"
          >
            +91 70224 40601
          </a>

          <Link
            to="/contact"
            className="inline-block text-sm text-gray-400 transition hover:text-white"
          >
            Send us an enquiry
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
          Quick Links
        </h2>

        <nav className="mt-5 flex flex-col gap-3 text-gray-400">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/packages">Tour Packages</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
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
          <FooterLink to="/privacy-policy">
            Privacy Policy
          </FooterLink>

          <FooterLink to="/terms">
            Terms and Conditions
          </FooterLink>

          <FooterLink to="/cancellation-policy">
            Cancellation & Refund Policy
          </FooterLink>

          <FooterLink to="/payment-policy">
            Payment Policy
          </FooterLink>

          <FooterLink to="/admin/login">
            Admin Login
          </FooterLink>
        </nav>
      </div>
    </div>

    <div className="mt-12 border-t border-white/10 pt-7">
      <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>© {currentYear} Europe Tourz. All rights reserved.</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            to="/privacy-policy"
            className="transition hover:text-yellow-300"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="transition hover:text-yellow-300"
          >
            Terms
          </Link>

          <Link
            to="/cancellation-policy"
            className="transition hover:text-yellow-300"
          >
            Refunds
          </Link>
        </div>

        <p>Secure payments through trusted payment providers.</p>
      </div>
    </div>
  </div>
</footer>

);
}

function FooterLink({ to, children }) {
return ( <Link
   to={to}
   className="transition hover:text-yellow-300"
 >
{children} </Link>
);
}

export default Footer;
