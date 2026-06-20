import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { packages } from "../assets/data/packages";
import { useCurrency } from "../context/CurrencyContext";

export default function Packages() {
  const { t } = useTranslation();
  const { convertPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-[#070b14] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Europe Luxe Collection
          </p>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            {t("packages_title")}
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover carefully curated luxury travel experiences across Europe,
            designed for comfort, elegance, and unforgettable memories.
          </p>
        </div>

        {/* PACKAGES GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 hover:border-yellow-400/50 transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm text-yellow-400 border border-white/10">
                  ⭐ {pkg.rating} / 5
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h2 className="text-2xl font-serif font-bold mb-2">
                    {pkg.title}
                  </h2>

                  <p className="text-gray-300 text-sm">
                    {pkg.duration} • {pkg.style}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                  {pkg.overview}
                </p>

                {/* PACKAGE INFO */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <p className="text-gray-500 mb-1">Duration</p>
                    <p className="text-white font-medium">{pkg.duration}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <p className="text-gray-500 mb-1">Reviews</p>
                    <p className="text-white font-medium">
                      {pkg.reviews?.length || 0} Reviews
                    </p>
                  </div>
                </div>

                {/* PRICE + BUTTON */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Starting from</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {convertPrice(pkg.price)}
                    </p>
                  </div>

                  <Link
                    to={`/package/${pkg.id}`}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold hover:scale-105 transition duration-300"
                  >
                    {t("view_details")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {packages.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-3">No packages available</h2>
            <p className="text-gray-400">
              Please add packages inside assets/data/packages.js
            </p>
          </div>
        )}
      </div>
    </div>
  );
}