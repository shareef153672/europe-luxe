import { useState } from "react";
import { packages } from "../assets/data/packages";

const primaryPhone = "+421 951 819 086";
const alternatePhone = "+91 70224 40601";
const primaryWhatsApp = "https://wa.me/421951819086";
const alternateWhatsApp = "https://wa.me/917022440601";
const instagramUrl = "https://www.instagram.com/europe_tourz?igsh=MTM0ejIzeXduZDcxNQ==";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    packageName: "",
    travelers: "",
    travelMonth: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to submit enquiry.");
        return;
      }

      setSuccessMessage(
        "Thank you! Your enquiry has been received. Our travel expert will contact you soon."
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        packageName: "",
        travelers: "",
        travelMonth: "",
        message: "",
      });
    } catch (error) {
      console.error("Enquiry submit error:", error);
      setErrorMessage(
        "We could not submit your enquiry right now. Please contact us on WhatsApp or email info@europetourz.com."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <section className="relative flex min-h-[58vh] items-center justify-center overflow-hidden px-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
          alt="Europetourz Europe travel enquiry"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/70 to-black/40" />

        <div className="relative z-10 mx-auto max-w-4xl pt-20">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Europetourz Contact Desk
          </p>

          <h1 className="mb-6 font-serif text-5xl font-bold md:text-7xl">
            Plan Your Europe Group Tour
          </h1>

          <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
            Speak with our travel team for guaranteed Europe departures from India,
            Schengen visa assistance, hotels, breakfast, sightseeing, tour manager
            support, and fixed departure package guidance.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-6 font-serif text-3xl font-bold">
              Contact Europetourz
            </h2>

            <div className="space-y-4">
              <ContactCard
                label="Email"
                value="info@europetourz.com"
                href="mailto:info@europetourz.com"
              />

              <ContactCard
                label="Primary WhatsApp"
                value={primaryPhone}
                href={primaryWhatsApp}
              />

              <ContactCard
                label="Alternate WhatsApp"
                value={alternatePhone}
                href={alternateWhatsApp}
              />

              <ContactCard
                label="Instagram"
                value="@europe_tourz"
                href={instagramUrl}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8">
            <h3 className="mb-4 font-serif text-2xl font-bold text-yellow-300">
              Slovakia Office Address
            </h3>

            <address className="not-italic leading-8 text-gray-200">
              Dunajská 4516/66
              <br />
              Bratislava - mestská časť Staré Mesto 811 08
              <br />
              Slovakia
            </address>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
            <h3 className="mb-4 font-serif text-2xl font-bold">
              Quick Assistance
            </h3>

            <p className="mb-6 leading-relaxed text-gray-100">
              Need help choosing a fixed departure tour, day activity, or multi-day
              Europe package? Share your travel month and group size, and we will
              guide you with suitable options.
            </p>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Popular Inclusions:</span>
                <br />
                Flights, hotels, breakfast, sightseeing, visa assistance, and tour
                manager support.
              </p>

              <p>
                <span className="font-semibold">Popular Destinations:</span>
                <br />
                Switzerland, Paris, Italy, Austria, Germany, Slovakia, Hungary,
                Czech Republic, and more.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="mb-5 font-serif text-2xl font-bold">
              Why Enquire With Us?
            </h3>

            <div className="space-y-5">
              <InfoItem
                title="Guaranteed Departures 2026"
                description="Professionally planned group tours from India with fixed departure options."
              />
              <InfoItem
                title="Schengen Visa Assistance"
                description="Guidance for documents, appointment preparation, and travel planning."
              />
              <InfoItem
                title="Indian Travel Comfort"
                description="Tour manager support, comfortable hotels, breakfast, sightseeing, and practical guidance."
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-10"
          >
            <div className="mb-10">
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-400">
                Enquiry Form
              </p>

              <h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">
                Tell Us About Your Trip
              </h2>

              <p className="leading-relaxed text-gray-400">
                Fill the form below and our team will contact you with package
                details, upcoming tour departures, availability, visa guidance,
                and next steps.
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 px-5 py-4 text-green-300">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-4 text-red-300">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormField
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="yourname@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Preferred Package
                </label>

                <select
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                  <option value="Day Tour Activities">Day Tour Activities</option>
                  <option value="Custom Multi-day Tour Package">
                    Custom Multi-day Tour Package
                  </option>
                </select>
              </div>

              <FormField
                label="Number of Travelers"
                name="travelers"
                type="number"
                placeholder="Example: 2"
                value={formData.travelers}
                onChange={handleChange}
                required
              />

              <FormField
                label="Preferred Travel Month"
                name="travelMonth"
                type="text"
                placeholder="Example: May 2026"
                value={formData.travelMonth}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Message / Special Requirements
              </label>

              <textarea
                name="message"
                rows="6"
                placeholder="Tell us your travel dates, family details, food preference, visa status, preferred countries, or any special request..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full rounded-2xl px-10 py-5 text-lg font-semibold text-white transition duration-300 md:w-auto ${
                loading
                  ? "cursor-not-allowed bg-gray-600"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105"
              }`}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="mt-5 text-sm text-gray-500">
              By submitting this form, you agree to be contacted by the Europetourz
              team through phone, WhatsApp, or email for package assistance.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-300">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

function ContactCard({ label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="block rounded-2xl border border-white/10 bg-[#0b1220] p-5 transition hover:border-yellow-400/50 hover:bg-white/10"
    >
      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
        {label}
      </span>
      <span className="mt-2 block text-base font-semibold text-white">
        {value}
      </span>
    </a>
  );
}

function InfoItem({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
        ✓
      </div>

      <div>
        <h3 className="mb-1 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      </div>
    </div>
  );
}