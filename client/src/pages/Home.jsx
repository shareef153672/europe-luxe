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

const featuredDestinations = [
  {
    name: "Switzerland",
    subtitle: "Alps, lakes and scenic train routes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  },
  {
    name: "Paris",
    subtitle: "Eiffel Tower, Seine and romantic city walks",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    name: "Italy",
    subtitle: "Rome, Venice, architecture and culture",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
  },
  {
    name: "Austria",
    subtitle: "Vienna, Salzburg, Hallstatt and alpine beauty",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af",
  },
  {
    name: "Prague",
    subtitle: "Castles, old town charm and historic streets",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d",
  },
  {
    name: "Budapest",
    subtitle: "Danube views, bridges and grand architecture",
    image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2",
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
    <div className="overflow-hidden bg-[#070b14] text-white">
      <section className="relative flex min-h-[860px] items-center justify-center px-6 pb-24 pt-40 text-center md:min-h-[900px] md:pt-44">
        <motion.img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8 }}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Europetourz Europe group tours"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-black/75 to-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400 sm:text-sm">
            Europetourz Fixed Departure Tours
          </p>

          <h1 className="mx-auto mb-6 max-w-6xl font-serif text-4xl font-bold leading-[1.08] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Europe Group Tours from India – Guaranteed Departures 2026
          </h1>

          <p className="mx-auto mb-7 max-w-4xl text-lg leading-relaxed text-gray-200 md:text-xl">
            Visit Switzerland, Paris, Italy, Austria & more with Indian tour
            managers.
          </p>

          <div className="mb-9 flex flex-wrap justify-center gap-3">
            {inclusions.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-gray-100 backdrop-blur"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#upcoming-tours"
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 px-9 py-4 text-base font-semibold text-white transition duration-300 hover:scale-105 md:px-10 md:py-5 md:text-lg"
            >
              View Upcoming Tours
            </a>

            <Link
              to="/contact"
              className="rounded-2xl border border-white/20 bg-white/10 px-9 py-4 text-base font-semibold text-white transition duration-300 hover:bg-white/20 md:px-10 md:py-5 md:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-6 md:px-8">
        <div className="-mt-16 grid gap-4 rounded-3xl border border-white/10 bg-[#0b101c]/95 p-5 shadow-2xl backdrop-blur-xl sm:grid-cols-2 md:p-6 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex min-h-[92px] items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-center text-base font-semibold leading-relaxed text-gray-100"
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      <section
        id="upcoming-tours"
        className="mx-auto max-w-7xl px-6 py-24 md:px-8"
      >
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Upcoming Tour Departures
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
            Fixed Departure Europe Tours 2026
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
            Reserve your seat for professionally managed Europe group tours with
            planned departures, tour manager support and visa assistance.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="hidden grid-cols-5 bg-black/30 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400 md:grid">
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
                className="inline-flex justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-3 font-bold text-white transition hover:scale-105"
              >
                Book Seat Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-8">
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
            Explore Europe’s most beautiful destinations with professionally
            guided day tours, multi-day holidays, and group departures tailored
            for travelers worldwide.
          </h2>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Featured Destinations
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
            Europe’s Most Loved Places
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
            From Swiss mountain landscapes to Parisian landmarks and Central
            European old towns, Europetourz helps you experience Europe with
            comfort, planning and personal assistance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              name={destination.name}
              subtitle={destination.subtitle}
              image={destination.image}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Day Tour Activities
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
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

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Multi-day Tour Packages
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
            Featured Europe Packages
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Choose from carefully planned Europe tours designed for comfort,
            sightseeing, Indian food preferences, and stress-free travel.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-yellow-400 backdrop-blur-md">
                  ⭐ {pkg.rating} / 5
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="mb-3 font-serif text-3xl font-bold">
                    {pkg.title}
                  </h3>

                  <p className="text-gray-300">
                    {pkg.duration} • {pkg.style}
                  </p>
                </div>
              </div>

              <div className="p-7">
                <div className="mb-5 flex flex-wrap gap-2">
                  {pkg.countries?.slice(0, 5).map((country) => (
                    <span
                      key={country}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                    >
                      {country}
                    </span>
                  ))}

                  {pkg.countries?.length > 5 && (
                    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm text-yellow-400">
                      +{pkg.countries.length - 5} More
                    </span>
                  )}
                </div>

                <p className="mb-7 line-clamp-3 leading-relaxed text-gray-400">
                  {pkg.overview}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-3xl font-bold text-yellow-400">
                      {convertPrice(pkg.price)}
                    </p>
                    <p className="text-sm text-gray-500">Per Person</p>
                  </div>

                  <Link
                    to={"/package/" + pkg.id}
                    className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4 font-semibold transition duration-300 hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="why-choose-us"
        className="mx-auto max-w-7xl px-6 pb-24 md:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
              Why Travel With Us
            </p>

            <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
              Designed for Indian Travelers Who Want Comfort in Europe
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-400">
              Our Europe packages are planned with premium hotels, Indian meals,
              private coach travel, experienced drivers, and English/Hindi tour
              managers. From airport pickup to sightseeing coordination, we make
              the journey smooth and comfortable.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
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
              className="h-[650px] w-full rounded-3xl object-cover"
            />

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="mb-3 font-serif text-2xl font-bold">
                Stress-Free Europe Experience
              </h3>
              <p className="leading-relaxed text-gray-300">
                Smooth border crossings, luggage assistance, guided tours, and
                comfortable long-distance travel across Europe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Traveler Stories
          </p>

          <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
            Loved by Our Guests
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ReviewCard
            name="Amit Sharma"
            city="Bengaluru"
            text="A complete Europe experience with Indian meals, smooth travel, and excellent guide support."
          />
          <ReviewCard
            name="Priya Reddy"
            city="Hyderabad"
            text="Loved Switzerland, Hallstatt, Prague, and Lake Bled. Very comfortable and well-planned."
          />
          <ReviewCard
            name="Rahul Mehta"
            city="Mumbai"
            text="Best short Europe package. Covered many places comfortably without travel stress."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10">
            <h2 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
              Ready to Plan Your Europe Holiday?
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-100">
              Explore Europetourz packages and choose the journey that fits your
              travel plan, comfort expectation, and budget.
            </p>

            <Link
              to="/packages"
              className="inline-block rounded-2xl bg-white px-10 py-5 text-lg font-semibold text-black transition duration-300 hover:scale-105"
            >
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function DestinationCard({ name, subtitle, image }) {
  return (
    <div className="group relative h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl">
      <img
        src={image}
        alt={name + " Europe tour destination"}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-yellow-300">
          Destination
        </p>

        <h3 className="mb-3 font-serif text-3xl font-bold text-white">
          {name}
        </h3>

        <p className="leading-relaxed text-gray-200">{subtitle}</p>

        <Link
          to="/contact"
          className="mt-5 inline-flex rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
        >
          Plan This Trip
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

function ExperienceCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#070b14] p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50">
      <div className="mb-6 text-5xl">{icon}</div>
      <h3 className="mb-4 font-serif text-2xl font-bold">{title}</h3>
      <p className="leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

function ReviewCard({ name, city, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-lg font-bold text-white">
          {name.charAt(0)}
        </div>

        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-500">{city}</p>
        </div>
      </div>

      <p className="mb-4 text-yellow-400">★★★★★</p>
      <p className="leading-relaxed text-gray-300">“{text}”</p>
    </div>
  );
}