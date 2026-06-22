import { Link } from "react-router-dom";

const values = [
  {
    title: "Carefully Curated Tours",
    description:
      "Every itinerary is designed to balance iconic attractions, comfortable travel and memorable European experiences.",
  },
  {
    title: "Personalised Assistance",
    description:
      "Our team supports travellers from their first enquiry through booking, preparation and the completion of their journey.",
  },
  {
    title: "Transparent Service",
    description:
      "We clearly communicate package inclusions, exclusions, payment terms and important travel information.",
  },
  {
    title: "Comfort and Quality",
    description:
      "We focus on quality accommodation, organised transport and travel experiences designed for comfort.",
  },
];

function About() {
  return (
    <section className="min-h-screen bg-[#070b14] text-white">
      <div className="border-b border-white/10 bg-gradient-to-b from-yellow-400/10 to-transparent px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            About Europe Tourz
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Making European travel comfortable, memorable and well organised
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Europe Tourz creates curated European travel experiences for
            travellers who value comfort, thoughtful planning and dependable
            support throughout their journey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Our Story
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              European journeys designed with care
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-gray-300">
              <p>
                Europe Tourz was created to make multi-country European tours
                easier to understand, book and enjoy.
              </p>

              <p>
                We bring together carefully planned itineraries, accommodation,
                transportation, sightseeing and customer assistance into one
                organised travel experience.
              </p>

              <p>
                From Switzerland and Germany to Austria, Hungary, the Czech
                Republic and beyond, our packages are built to offer a balance
                of famous destinations, cultural experiences and comfortable
                travel.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold">Our Mission</h3>

            <p className="mt-4 leading-8 text-gray-300">
              To provide travellers with transparent, dependable and
              professionally organised European tour experiences that create
              lasting memories.
            </p>

            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold">Our Vision</h3>

              <p className="mt-4 leading-8 text-gray-300">
                To become a trusted travel brand for customers seeking premium
                European group tours and personalised travel assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
              What We Stand For
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Service built around the traveller
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:border-yellow-400/30"
              >
                <h3 className="text-xl font-bold text-yellow-300">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold">Planning a Europe tour?</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
            Share your preferred package, travel month and group size. Our team
            will contact you with availability and the next steps.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/packages"
              className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
            >
              Explore Packages
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;