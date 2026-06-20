import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packages } from "../assets/data/packages";
import { useCurrency } from "../context/CurrencyContext";

export default function PackageDetails() {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);
  const { convertPrice } = useCurrency();

  const [activeImage, setActiveImage] = useState(pkg?.heroImage);

  useEffect(() => {
    if (pkg?.heroImage) {
      setActiveImage(pkg.heroImage);
    }
  }, [pkg]);

  useEffect(() => {
    if (pkg?.seo) {
      document.title = pkg.seo.title;

      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );

      if (metaDescription) {
        metaDescription.setAttribute("content", pkg.seo.description);
      }
    }
  }, [pkg]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Package Not Found</h1>
          <p className="text-gray-400 mb-8">
            The package you are looking for does not exist.
          </p>
          <Link
            to="/packages"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold"
          >
            View All Packages
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ packageId: pkg.id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data);
        alert(data.error || "Unable to start checkout. Please try again.");
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout service is not available. Please try again later.");
    }
  };

  return (
    <div className="bg-[#070b14] text-white min-h-screen">
      {/* HERO */}
      <section className="relative h-[82vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={pkg.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/60 to-black/30" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-8 flex items-end pb-16">
          <div className="max-w-4xl">
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-5">
              Premium Europe Tour Package
            </p>

            <h1 className="text-5xl md:text-7xl font-serif tracking-wide leading-tight mb-6">
              {pkg.title}
            </h1>

            <p className="text-gray-200 text-lg md:text-xl mb-8">
              {pkg.duration} • {pkg.style}
            </p>

            <div className="flex flex-wrap gap-3">
              {pkg.countries?.map((country) => (
                <span
                  key={country}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-sm"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 -mt-10 relative z-20">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[pkg.heroImage, ...(pkg.images || [])].map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`min-w-36 h-24 rounded-2xl overflow-hidden border transition ${
                  activeImage === img
                    ? "border-yellow-400"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt={`${pkg.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">
          {/* QUICK FACTS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard label="Duration" value={pkg.duration} />
            <InfoCard
              label="Countries"
              value={`${pkg.countries?.length || 0} Countries`}
            />
            <InfoCard label="Rating" value={`⭐ ${pkg.rating} / 5`} />
            <InfoCard
              label="Reviews"
              value={`${pkg.reviews?.length || 0} Reviews`}
            />
          </div>

          {/* OVERVIEW */}
          <ContentSection title="Tour Overview">
            <p className="text-gray-300 text-lg leading-relaxed">
              {pkg.overview}
            </p>
          </ContentSection>

          {/* TRAVEL EXPERIENCE */}
          {pkg.travelExperience && (
            <ContentSection title="Your Premium Travel Experience">
              <p className="text-gray-300 text-lg leading-relaxed">
                {pkg.travelExperience}
              </p>
            </ContentSection>
          )}

          {/* ITINERARY */}
          <ContentSection title="Day-Wise Itinerary">
            <div className="space-y-6">
              {pkg.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l border-yellow-400/30 last:pb-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-yellow-400 border-4 border-[#070b14]" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {day.day}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </ContentSection>

          {/* HIGHLIGHTS */}
          <ContentSection title="Package Highlights">
            <div className="grid sm:grid-cols-2 gap-4">
              {pkg.highlights?.map((item, index) => (
                <CheckItem key={index} text={item} />
              ))}
            </div>
          </ContentSection>

          {/* INCLUSIONS AND EXCLUSIONS */}
          <div className="grid md:grid-cols-2 gap-8">
            <ContentSection title="Inclusions">
              <div className="space-y-3">
                {pkg.inclusions?.map((item, index) => (
                  <CheckItem key={index} text={item} />
                ))}
              </div>
            </ContentSection>

            <ContentSection title="Exclusions">
              <div className="space-y-3">
                {pkg.exclusions?.map((item, index) => (
                  <CrossItem key={index} text={item} />
                ))}
              </div>
            </ContentSection>
          </div>

          {/* ACCOMMODATION */}
          {pkg.accommodation && (
            <ContentSection title="Accommodation">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-3">
                {pkg.accommodation.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {pkg.accommodation.description}
              </p>
            </ContentSection>
          )}

          {/* CUSTOMER EXPECTATION */}
          {pkg.customerExpectation && (
            <ContentSection title="What Customers Can Expect">
              <p className="text-gray-300 text-lg leading-relaxed">
                {pkg.customerExpectation}
              </p>
            </ContentSection>
          )}

          {/* CANCELLATION POLICY */}
          <ContentSection title="Cancellation Policy">
            <p className="text-gray-300 text-lg leading-relaxed">
              {pkg.cancellationPolicy}
            </p>
          </ContentSection>

          {/* REVIEWS */}
          <ContentSection title="Customer Reviews">
            <div className="grid md:grid-cols-2 gap-6">
              {pkg.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <p className="text-yellow-400 mb-3">★★★★★</p>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    “{review.comment}”
                  </p>
                  <p className="font-semibold text-white">{review.name}</p>
                </div>
              ))}
            </div>
          </ContentSection>
        </div>

        {/* RIGHT BOOKING CARD */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <p className="text-gray-400 mb-2">Starting from</p>

            <h2 className="text-4xl font-bold text-yellow-400 mb-2">
              {convertPrice(pkg.price)}
            </h2>

            <p className="text-gray-400 mb-6">Per Person</p>

            <div className="space-y-4 mb-8">
              <BookingPoint text={pkg.duration} />
              <BookingPoint text={`${pkg.countries?.length || 0} Countries`} />
              <BookingPoint text="5-Star Hotel Stay" />
              <BookingPoint text="Indian Meals Included" />
              <BookingPoint text="Private AC Coach" />
              <BookingPoint text="English/Hindi Tour Manager" />
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-lg hover:scale-105 transition duration-300"
            >
              Reserve Now
            </button>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Secure checkout powered by Stripe.
            </p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">Need assistance?</p>
              <p className="text-white font-semibold">
                Talk to our Europe travel expert
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0b1220] p-4 md:hidden flex justify-between items-center border-t border-white/10 z-50">
        <div>
          <p className="text-xs text-gray-400">From</p>
          <div className="text-yellow-400 font-bold text-lg">
            {convertPrice(pkg.price)}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-semibold"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-gray-500 text-sm mb-2">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

function ContentSection({ title, children }) {
  return (
    <section className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
      <h2 className="text-3xl font-serif font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex gap-3 text-gray-300">
      <span className="text-green-400 shrink-0">✔</span>
      <span>{text}</span>
    </div>
  );
}

function CrossItem({ text }) {
  return (
    <div className="flex gap-3 text-gray-300">
      <span className="text-red-400 shrink-0">✘</span>
      <span>{text}</span>
    </div>
  );
}

function BookingPoint({ text }) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      <span className="w-2 h-2 rounded-full bg-yellow-400" />
      <span>{text}</span>
    </div>
  );
}