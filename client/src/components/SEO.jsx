import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://europetourz.com";
const socialImageUrl = "https://europetourz.com/social-share-1200x630.jpg";

const defaultSeo = {
  title: "Europetourz | Europe Group Tours from India",
  description:
    "Explore Europetourz Europe group tours from India with guaranteed departures, hotels, breakfast, sightseeing, Schengen visa assistance and Indian tour managers.",
};

const seoConfig = {
  "/": defaultSeo,

  "/about": {
    title: "About Europetourz | Europe Group Tours from India",
    description:
      "Learn about Europetourz and our mission to provide professionally organised Europe group tours from India with transparent planning and trusted customer assistance.",
  },

  "/packages": {
    title: "Europe Tour Packages from India | Europetourz",
    description:
      "Browse Europetourz Europe tour packages covering Switzerland, Paris, Italy, Austria and more with hotels, breakfast, sightseeing and visa assistance.",
  },

  "/package/grand-europe-discovery": {
    title: "Grand Europe Discovery Tour Package | Europetourz",
    description:
      "Explore the Grand Europe Discovery tour covering Switzerland, Germany, Austria, Hungary, Czech Republic, Slovakia and Slovenia with accommodation, Indian meals and organised transport.",
  },

  "/package/grand-europe-express": {
    title: "Grand Europe Express Tour Package | Europetourz",
    description:
      "Discover the Grand Europe Express package featuring a carefully planned European itinerary, accommodation, sightseeing, Indian meals and professional tour assistance.",
  },

  "/contact": {
    title: "Contact Europetourz | Plan Your Europe Group Tour",
    description:
      "Contact Europetourz for Europe group tour availability, fixed departures, day tours, multi-day packages, Schengen visa assistance and personalised travel guidance.",
  },

  "/faq": {
    title: "Europe Tour FAQs | Europetourz",
    description:
      "Find answers about Europetourz bookings, payments, visas, itinerary changes, cancellations, inclusions and Europe tour planning.",
  },

  "/privacy-policy": {
    title: "Privacy Policy | Europetourz",
    description:
      "Read the Europetourz Privacy Policy and learn how personal information is collected, used, stored and protected.",
  },

  "/terms": {
    title: "Terms and Conditions | Europetourz",
    description:
      "Read the terms and conditions governing Europetourz enquiries, bookings, payments and travel services.",
  },

  "/cancellation-policy": {
    title: "Cancellation and Refund Policy | Europetourz",
    description:
      "Review the Europetourz cancellation charges, refund conditions and booking amendment policy.",
  },

  "/payment-policy": {
    title: "Payment Policy | Europetourz",
    description:
      "Learn about Europetourz payment methods, booking deposits, payment deadlines and refund processing.",
  },

  "/success": {
    title: "Payment Successful | Europetourz",
    description: "Your Europetourz payment was completed successfully.",
    noIndex: true,
  },

  "/admin/login": {
    title: "Admin Login | Europetourz",
    description: "Europetourz administration login.",
    noIndex: true,
  },

  "/admin/enquiries": {
    title: "Enquiry Management | Europetourz",
    description: "Europetourz enquiry management dashboard.",
    noIndex: true,
  },
};

function updateMetaTag(selector, attributes, content) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  element.setAttribute("content", content);
}

function updateCanonicalLink(url) {
  let canonicalLink = document.querySelector('link[rel="canonical"]');

  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute("href", url);
}

function SEO() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const config = seoConfig[pathname] || defaultSeo;
    const canonicalUrl = `${siteUrl}${pathname}`;

    document.title = config.title;

    updateMetaTag(
      'meta[name="description"]',
      { name: "description" },
      config.description
    );

    updateMetaTag(
      'meta[name="robots"]',
      { name: "robots" },
      config.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large"
    );

    updateMetaTag(
      'meta[property="og:type"]',
      { property: "og:type" },
      pathname.startsWith("/package/") ? "product" : "website"
    );

    updateMetaTag(
      'meta[property="og:site_name"]',
      { property: "og:site_name" },
      "Europetourz"
    );

    updateMetaTag(
      'meta[property="og:title"]',
      { property: "og:title" },
      config.title
    );

    updateMetaTag(
      'meta[property="og:description"]',
      { property: "og:description" },
      config.description
    );

    updateMetaTag(
      'meta[property="og:url"]',
      { property: "og:url" },
      canonicalUrl
    );

    updateMetaTag(
      'meta[property="og:image"]',
      { property: "og:image" },
      socialImageUrl
    );

    updateMetaTag(
      'meta[property="og:image:secure_url"]',
      { property: "og:image:secure_url" },
      socialImageUrl
    );

    updateMetaTag(
      'meta[property="og:image:type"]',
      { property: "og:image:type" },
      "image/jpeg"
    );

    updateMetaTag(
      'meta[property="og:image:width"]',
      { property: "og:image:width" },
      "1200"
    );

    updateMetaTag(
      'meta[property="og:image:height"]',
      { property: "og:image:height" },
      "630"
    );

    updateMetaTag(
      'meta[property="og:image:alt"]',
      { property: "og:image:alt" },
      config.title
    );

    updateMetaTag(
      'meta[name="twitter:card"]',
      { name: "twitter:card" },
      "summary_large_image"
    );

    updateMetaTag(
      'meta[name="twitter:title"]',
      { name: "twitter:title" },
      config.title
    );

    updateMetaTag(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      config.description
    );

    updateMetaTag(
      'meta[name="twitter:image"]',
      { name: "twitter:image" },
      socialImageUrl
    );

    updateMetaTag(
      'meta[name="twitter:image:alt"]',
      { name: "twitter:image:alt" },
      config.title
    );

    updateCanonicalLink(canonicalUrl);
  }, [location.pathname]);

  return null;
}

export default SEO;