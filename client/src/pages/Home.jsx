import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { packages } from "../assets/data/packages";
import { useCurrency } from "../context/CurrencyContext";

const inclusions = [
  "✈️ Flights",
  "🏨 Hotels",
  "🍳 Breakfast",
  "📍 Sightseeing",
  "🛂 Visa Assistance",
];

const trustBadges = [
  "✅ 5000+ Happy Travelers",
  "✅ Schengen Visa Assistance",
  "✅ Tour Manager",
  "✅ Fixed Departure Tours",
  "✅ EMI Available",
];

const departures = [
  {
    tour: "Europe Grand Tour",
    days: "12 Days",
    departure: "15 Aug 2026",
    price: "₹1,99,999",
  },
  {
    tour: "Swiss & Paris",
    days: "8 Days",
    departure: "22 Aug 2026",
    price: "₹1,49,999",
  },
  {
    tour: "Europe Highlights",
    days: "10 Days",
    departure: "5 Sep 2026",
    price: "₹1,79,999",
  },
];

const dayTours = [
  {
    title: "Austria Highlights Day Tour",
    description:
      "Explore Melk Abbey, Hallstatt, Salzburg and scenic Austrian lake routes in a professionally guided day experience.",
    icon: "🏔️",
  },
  {
    title: "Budapest Day Tour",
    description:
      "Enjoy a full-day Budapest experience with guided city highlights, beautiful architecture and cultural sightseeing.",
    icon: "🌉",
  },
  {
    title: "Prague Day Tour",
    description:
      "Discover Prague’s old town charm, historic squares, castles and iconic European city views with guided assistance.",
    icon: "🏰",
  },
];

export default function Home() {
  const { convertPrice } = useCurrency();

  return (
    <div className="bg-[#070b14] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <motion.img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Europetourz Europe group tours"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/75 to-black/45" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto pt-24"
        >
          <p className="text-yellow-400 uppercase tracking-[0.35em] text-sm mb-6">
            Europetourz Fixed Departure Tours
          </p>

          <h1 className="text-4xl md:text-7xl font-serif tracking-wide leading-tight mb-6">
            Europe Group Tours from India – Guaranteed Departures 2026
          </h1>

          <p className="text-gray-200 text-lg md:text-xl max-w-4xl mx-auto mb-6 leading-relaxed">
            Visit Switzerland, Paris, Italy, Austria & more with Indian tour
            managers.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {inclusions.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-gray-100 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#upcoming-tours"
              className="px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl font-semibold text-lg hover:scale-105 transition duration-300"
            >
              View Upcoming Tours
            </a>

            <Link
              to="/contact"
              className="px-10 py-5 bg-white/10 border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {/* TRUST BADGES */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 -mt-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center text-gray-100"
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING DEPARTURES */}
      <section
        id="upcoming-tours"
        className="max-w-7xl mx-auto px-6 md:px-8 py-24"
      >
        <div className="text-center mb-12">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Upcoming Tour Departures
          </p>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Fixed Departure Europe Tours 2026
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Reserve your seat for professionally managed Europe group tours with
            planned departures, tour manager support and visa assistance.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="hidden md:grid grid-cols-5 bg-black/30 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
            <span>Tour</span>
            <span>Days</span>
            <span>Departure</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {departures.map((departure) => (
            <div
              key={departure.tour}
              className="grid gap-4 border-t border-white/10 px-6 py-6 md:grid-cols-5 md:items-center"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 md:hidden">
                  Tour
                </p>
                <p className="font-bold text-white">{departure.tour}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 md:hidden">
                  Days
                </p>
                <p className="text-gray-300">{departure.days}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 md:hidden">
                  Departure
                </p>
                <p className="text-gray-300">{departure.departure}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 md:hidden">
                  Price
                </p>
                <p className="text-xl font-bold text-yellow-400">
                  {departure.price}
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex justify-center rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
              >
                Book Seat Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* NEW MAIN MESSAGE */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
            Explore Europe's most beautiful destinations with professionally
            guided day tours, multi-day holidays, and group departures tailored
            for travelers worldwide
          </h2>
        </div>
      </section>

      {/* DAY TOURS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="text-center mb-14">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Day Tour Activities
          </p>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Guided Day Tours Across Europe
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {dayTours.map((tour) => (
            <ExperienceCard
              key={tour.title}
              icon={tour.icon}
              title={tour.title}
              description={tour.description}
            />
          ))}
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="text-center mb-16">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Multi-day Tour Packages
          </p>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Featured Europe Packages
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose from carefully planned Europe tours designed for comfort,
            sightseeing, Indian food preferences, and stress-free travel.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:border-yellow-400/50 transition duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm text-yellow-400 border border-white/10">
                  ⭐ {pkg.rating} / 5
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-serif font-bold mb-3">
                    {pkg.title}
                  </h3>

                  <p className="text-gray-300">
                    {pkg.duration} • {pkg.style}
                  </p>
                </div>
              </div>

              <div className="p-7">
                <div className="flex flex-wrap gap-2 mb-5">
                  {pkg.countries?.slice(0, 5).map((country) => (
                    <span
                      key={country}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                      {country}
                    </span>
                  ))}

                  {pkg.countries?.length > 5 && (
                    <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-sm text-yellow-400">
                      +{pkg.countries.length - 5} More
                    </span>
                  )}
                </div>

                <p className="text-gray-400 leading-relaxed mb-7 line-clamp-3">
                  {pkg.overview}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Starting from</p>
                    <p className="text-3xl font-bold text-yellow-400">
                      {convertPrice(pkg.price)}
                    </p>
                    <p className="text-gray-500 text-sm">Per Person</p>
                  </div>

                  <Link
                    to={`/package/${pkg.id}`}
                    className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold hover:scale-105 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        id="why-choose-us"
        className="max-w-7xl mx-auto px-6 md:px-8 pb-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
              Why Travel With Us
            </p>

            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Designed for Indian Travelers Who Want Comfort in Europe
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Our Europe packages are planned with premium hotels, Indian meals,
              private coach travel, experienced drivers, and English/Hindi tour
              managers. From airport pickup to sightseeing coordination, we make
              the journey smooth and comfortable.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureCard
                title="Private Luxury Coach"
                description="Comfortable AC minibus or coach throughout the tour."
              />
              <FeatureCard
                title="Indian Meals"
                description="Daily Indian meals with veg, non-veg, and Jain options."
              />
              <FeatureCard
                title="Tour Manager"
                description="Professional English/Hindi-speaking tour support."
              />
              <FeatureCard
                title="Premium Hotels"
                description="Quality stays selected for comfort and convenience."
              />
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3"
              alt="Europe guided travel"
              className="rounded-3xl w-full h-[650px] object-cover"
            />

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 bg-white/10 border border-white/15 backdrop-blur-xl rounded-3xl p-6">
              <h3 className="text-2xl font-serif font-bold mb-3">
                Stress-Free Europe Experience
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Smooth border crossings, luggage assistance, guided tours, and
                comfortable long-distance travel across Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="text-center mb-16">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Traveler Stories
          </p>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Loved by Our Guests
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ReviewCard
            name="Amit Sharma"
            text="A complete Europe experience with Indian meals, smooth travel, and excellent guide support."
          />
          <ReviewCard
            name="Priya Reddy"
            text="Loved Switzerland, Hallstatt, Prague, and Lake Bled. Very comfortable and well-planned."
          />
          <ReviewCard
            name="Rahul Mehta"
            text="Best short Europe package. Covered many places comfortably without travel stress."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Ready to Plan Your Europe Holiday?
            </h2>

            <p className="text-gray-100 max-w-2xl mx-auto text-lg mb-10">
              Explore Europetourz packages and choose the journey that fits your
              travel plan, comfort expectation, and budget.
            </p>

            <Link
              to="/packages"
              className="inline-block px-10 py-5 bg-white text-black rounded-2xl font-semibold text-lg hover:scale-105 transition duration-300"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function ExperienceCard({ icon, title, description }) {
  return (
    <div className="bg-[#070b14] border border-white/10 rounded-3xl p-8 text-center hover:-translate-y-2 hover:border-yellow-400/50 transition duration-300">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function ReviewCard({ name, text }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
      <p className="text-yellow-400 mb-4">★★★★★</p>
      <p className="text-gray-300 leading-relaxed mb-6">“{text}”</p>
      <p className="font-semibold text-white">{name}</p>
    </div>
  );
}