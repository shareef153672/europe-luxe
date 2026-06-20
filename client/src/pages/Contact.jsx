import { useState } from "react";
import { packages } from "../assets/data/packages";

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
        "Backend is not reachable. Please make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
          alt="Europe travel enquiry"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/70 to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto pt-20">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-5">
            Plan Your Europe Holiday
          </p>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Contact Our Travel Expert
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Share your travel details and our team will help you choose the
            right Europe package with hotels, meals, sightseeing, visa support,
            and comfortable travel planning.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 grid lg:grid-cols-3 gap-10">
        {/* LEFT INFO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Why Enquire With Us?
            </h2>

            <div className="space-y-5">
              <InfoItem
                title="Personal Tour Guidance"
                description="Our travel expert helps you select the right package based on your dates, family size, budget, and comfort needs."
              />
              <InfoItem
                title="Indian Food Comfort"
                description="Our packages include Indian meals with veg, non-veg, and Jain meal options where available."
              />
              <InfoItem
                title="Europe Travel Support"
                description="We assist with Schengen visa guidance, travel insurance, airport transfers, hotels, sightseeing, and coach travel."
              />
              <InfoItem
                title="Premium Group Experience"
                description="Enjoy professional English/Hindi tour manager support and comfortable private coach travel."
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Quick Assistance
            </h3>

            <p className="text-gray-100 leading-relaxed mb-6">
              Need help choosing between Grand Europe Discovery and Grand Europe
              Express? Send your enquiry and we’ll guide you.
            </p>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Specialized In:</span>
                <br />
                Switzerland, Germany, Austria, Hungary, Czech Republic,
                Slovakia & Slovenia
              </p>

              <p>
                <span className="font-semibold">Support:</span>
                <br />
                Package selection, visa assistance, travel dates, hotel and meal
                planning
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
          >
            <div className="mb-10">
              <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
                Enquiry Form
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Tell Us About Your Trip
              </h2>

              <p className="text-gray-400 leading-relaxed">
                Fill the form below and our team will contact you with package
                details, availability, travel guidance, and next steps.
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 text-green-300 px-5 py-4">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 text-red-300 px-5 py-4">
                {errorMessage}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
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
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Preferred Package
                </label>

                <select
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0b1220] text-white border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
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
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Message / Special Requirements
              </label>

              <textarea
                name="message"
                rows="6"
                placeholder="Tell us about your travel dates, family details, food preference, visa status, or any special request..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#0b1220] text-white border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full md:w-auto px-10 py-5 rounded-2xl text-white font-semibold text-lg transition duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105"
              }`}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>

            <p className="text-gray-500 text-sm mt-5">
              By submitting this form, you agree to be contacted by our travel
              team for package assistance.
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
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#0b1220] text-white border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

function InfoItem({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 shrink-0">
        ✓
      </div>

      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}