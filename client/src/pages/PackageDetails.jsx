import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packages } from "../assets/data/packages";
import { useCurrency } from "../context/CurrencyContext";

const whatsappUrl = "https://wa.me/421951819086";

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
      <div className="flex min-h-screen items-center justify-center bg-[#070b14] px-6 text-white">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-4xl">Package Not Found</h1>
          <p className="mb-8 text-gray-400">
            The package you are looking for does not exist.
          </p>

          <Link
            to="/packages"
            className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 font-semibold"
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
        `${import.meta.env.VITE_API_BASE_URL}/api/create-checkout-session`,
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
    <div className="min-h-screen bg-[#070b14] text-white">
      <section className="relative min-h-[760px] overflow-hidden px-6 pb-20 pt-36 md:px-8">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={pkg.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/75 to-black/45" />

        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-end">
          <div className="max-w-5xl">
            <Link
              to="/packages"
              className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-gray-200 backdrop-blur transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              ← Back to Packages
            </Link>

            <p className="mb-5 text-sm uppercase tracking-[0.3em] text-yellow-400">
              Premium Europe Tour Package
            </p>

            <h1 className="mb-6 max-w-5xl font-serif text-5xl font-bold leading-tight md:text-7xl">
              {pkg.title}
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-200 md:text-xl">
              {pkg.duration} • {pkg.style}
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {pkg.countries?.map((country) => (
                <span
                  key={country}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-md"
                >
                  {country}
                </span>
              ))}
            </div>

            <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <HeroStat label="Duration" value={pkg.duration} />
              <HeroStat
                label="Countries"
                value={`${pkg.countries?.length || 0} Countries`}
              />
              <HeroStat label="Rating" value={`⭐ ${pkg.rating} / 5`} />
              <HeroStat label="Starting From" value={convertPrice(pkg.price)} />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-6 md:px-8">
        <div className="-mt-12 rounded-3xl border border-white/10 bg-[#0b101c]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[pkg.heroImage, ...(pkg.images || [])].map((img, index) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`h-24 min-w-40 overflow-hidden rounded-2xl border transition ${
                  activeImage === img
                    ? "border-yellow-400"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={img}
                  alt={`${pkg.title} gallery ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <ContentSection eyebrow="Overview" title="Tour Overview">
            <p className="text-lg leading-relaxed text-gray-300">
              {pkg.overview}
            </p>
          </ContentSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureTile icon="✈️" title="Flights" text="Assistance available" />
            <FeatureTile icon="🏨" title="Hotels" text="Premium stays" />
            <FeatureTile icon="🍽️" title="Meals" text="Indian meals" />
            <FeatureTile icon="🛂" title="Visa" text="Schengen guidance" />
          </div>

          {pkg.travelExperience && (
            <ContentSection
              eyebrow="Experience"
              title="Your Premium Travel Experience"
            >
              <p className="text-lg leading-relaxed text-gray-300">
                {pkg.travelExperience}
              </p>
            </ContentSection>
          )}

          <ContentSection eyebrow="Itinerary" title="Day-Wise Travel Plan">
            <div className="space-y-6">
              {pkg.itinerary.map((day, index) => (
                <div
                  key={day.day}
                  className="relative border-l border-yellow-400/30 pb-7 pl-9 last:pb-0"
                >
                  <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#070b14] bg-yellow-400 text-sm font-bold text-black">
                    {index + 1}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">
                    {day.day}
                  </h3>

                  <p className="leading-relaxed text-gray-400">
                    {day.description}
                  </p>
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection eyebrow="Highlights" title="Package Highlights">
            <div className="grid gap-4 sm:grid-cols-2">
              {pkg.highlights?.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </div>
          </ContentSection>

          <div className="grid gap-8 md:grid-cols-2">
            <ContentSection eyebrow="Included" title="Inclusions">
              <div className="space-y-3">
                {pkg.inclusions?.map((item) => (
                  <CheckItem key={item} text={item} />
                ))}
              </div>
            </ContentSection>

            <ContentSection eyebrow="Not Included" title="Exclusions">
              <div className="space-y-3">
                {pkg.exclusions?.map((item) => (
                  <CrossItem key={item} text={item} />
                ))}
              </div>
            </ContentSection>
          </div>

          {pkg.accommodation && (
            <ContentSection eyebrow="Stay" title="Accommodation">
              <h3 className="mb-3 text-2xl font-semibold text-yellow-400">
                {pkg.accommodation.title}
              </h3>

              <p className="text-lg leading-relaxed text-gray-300">
                {pkg.accommodation.description}
              </p>
            </ContentSection>
          )}

          {pkg.customerExpectation && (
            <ContentSection eyebrow="Guest Experience" title="What Customers Can Expect">
              <p className="text-lg leading-relaxed text-gray-300">
                {pkg.customerExpectation}
              </p>
            </ContentSection>
          )}

          <ContentSection eyebrow="Policy" title="Cancellation Policy">
            <p className="text-lg leading-relaxed text-gray-300">
              {pkg.cancellationPolicy}
            </p>
          </ContentSection>

          <ContentSection eyebrow="Reviews" title="Customer Reviews">
            <div className="grid gap-6 md:grid-cols-2">
              {pkg.reviews?.map((review, index) => (
                <div
                  key={review.name}
                  className="rounded-2xl border border-white/10 bg-[#0b1220] p-6"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-lg font-bold">
                      {review.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-sm text-gray-500">
                        Verified Europetourz Guest
                      </p>
                    </div>
                  </div>

                  <p className="mb-3 text-yellow-400">★★★★★</p>

                  <p className="leading-relaxed text-gray-300">
                    “{review.comment}”
                  </p>
                </div>
              ))}
            </div>
          </ContentSection>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-32 rounded-3xl border border-white/10 bg-[#0b101c]/95 p-8 shadow-2xl backdrop-blur-xl">
            <p className="mb-2 text-gray-400">Starting from</p>

            <h2 className="mb-2 text-4xl font-bold text-yellow-400">
              {convertPrice(pkg.price)}
            </h2>

            <p className="mb-6 text-gray-400">Per Person</p>

            <div className="mb-8 space-y-4">
              <BookingPoint text={pkg.duration} />
              <BookingPoint text={`${pkg.countries?.length || 0} Countries`} />
              <BookingPoint text="Premium hotel stay" />
              <BookingPoint text="Indian meals support" />
              <BookingPoint text="Private AC coach" />
              <BookingPoint text="English/Hindi tour manager" />
              <BookingPoint text="Schengen visa assistance" />
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 py-5 text-lg font-semibold transition duration-300 hover:scale-105"
            >
              Reserve with Stripe
            </button>

            <Link
              to="/contact"
              className="mt-4 block w-full rounded-2xl border border-white/15 bg-white/10 py-4 text-center font-semibold text-white transition hover:bg-white/20"
            >
              Send Enquiry
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block w-full rounded-2xl border border-green-400/30 bg-green-400/10 py-4 text-center font-semibold text-green-300 transition hover:bg-green-400/20"
            >
              WhatsApp Expert
            </a>

            <p className="mt-5 text-center text-sm text-gray-500">
              Secure checkout powered by Stripe. Final confirmation is subject to
              availability and travel documentation.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="mb-2 text-sm text-gray-400">Need assistance?</p>
              <p className="font-semibold text-white">
                Talk to our Europe travel expert before booking.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-white/10 bg-[#0b1220] p-4 md:hidden">
        <div>
          <p className="text-xs text-gray-400">From</p>
          <div className="text-lg font-bold text-yellow-400">
            {convertPrice(pkg.price)}
          </div>
        </div>

        <Link
          to="/contact"
          className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 font-semibold"
        >
          Enquire Now
        </Link>
      </div>
    </div>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-gray-400">
        {label}
      </p>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}

function FeatureTile({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}

function ContentSection({ eyebrow, title, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
          {eyebrow}
        </p>
      )}

      <h2 className="mb-6 font-serif text-3xl font-semibold text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex gap-3 text-gray-300">
      <span className="shrink-0 text-green-400">✔</span>
      <span>{text}</span>
    </div>
  );
}

function CrossItem({ text }) {
  return (
    <div className="flex gap-3 text-gray-300">
      <span className="shrink-0 text-red-400">✘</span>
      <span>{text}</span>
    </div>
  );
}

function BookingPoint({ text }) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      <span className="h-2 w-2 rounded-full bg-yellow-400" />
      <span>{text}</span>
    </div>
  );
}