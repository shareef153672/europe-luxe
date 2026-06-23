const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://europetourz.com/#organization",
  name: "Europe Tourz",
  url: "https://europetourz.com",
  email: "info@europetourz.com",
  description:
    "Europe Tourz provides curated premium European tour packages with organised itineraries, comfortable travel and personalised customer assistance.",
  telephone: ["+421951819086", "+917022440601"],
  areaServed: {
    "@type": "Place",
    name: "Europe",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+421951819086",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+917022440601",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Grand Europe Discovery",
        url: "https://europetourz.com/package/grand-europe-discovery",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "TouristTrip",
        name: "Grand Europe Express",
        url: "https://europetourz.com/package/grand-europe-express",
      },
    },
  ],
};

function StructuredData() {
  return (
    <script
      id="europe-tourz-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

export default StructuredData;