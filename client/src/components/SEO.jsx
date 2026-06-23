import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://europetourz.com";

const seoConfig = {
  "/": {
    title: "Europe Tourz | Premium Europe Tour Packages",
    description:
      "Explore carefully curated premium Europe tour packages with comfortable travel, organised itineraries and personalised assistance.",
  },
  "/about": {
    title: "About Europe Tourz | Premium European Travel",
    description:
      "Learn about Europe Tourz and our mission to provide comfortable, transparent and professionally organised European travel experiences.",
  },
  "/packages": {
    title: "Europe Tour Packages | Europe Tourz",
    description:
      "Browse premium multi-country Europe tour packages with accommodation, transportation, sightseeing and customer assistance.",
  },
  "/contact": {
    title: "Contact Europe Tourz | Plan Your Europe Holiday",
    description:
      "Contact Europe Tourz for package availability, tour details, group bookings and personalised European travel assistance.",
  },
  "/faq": {
    title: "Europe Tour FAQs | Europe Tourz",
    description:
      "Find answers about Europe tour bookings, payments, visas, itinerary changes, cancellations and package inclusions.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Europe Tourz",
    description:
      "Read the Europe Tourz privacy policy and learn how personal information is collected, used and protected.",
  },
  "/terms": {
    title: "Terms and Conditions | Europe Tourz",
    description:
      "Read the terms and conditions governing Europe Tourz enquiries, bookings, payments and travel services.",
  },
  "/cancellation-policy": {
    title: "Cancellation and Refund Policy | Europe Tourz",
    description:
      "Review the Europe Tourz cancellation charges, refund conditions and booking amendment policy.",
  },
  "/payment-policy": {
    title: "Payment Policy | Europe Tourz",
    description:
      "Learn about Europe Tourz payment methods, booking deposits, payment deadlines and refund processing.",
  },
  "/success": {
    title: "Payment Successful | Europe Tourz",
    description:
      "Your Europe Tourz payment was completed successfully.",
    noIndex: true,
  },
};

function updateMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attribute).forEach(([key, attributeValue]) => {
    element.setAttribute(key, attributeValue);
  });

  element.setAttribute("content", value);
}

function SEO() {
  const location = useLocation();

  useEffect(() => {
    const isPackagePage = location.pathname.startsWith("/package/");

    const config = isPackagePage
      ? {
          title: "Europe Tour Package Details | Europe Tourz",
          description:
            "View the itinerary, package inclusions, exclusions, pricing and booking details for this Europe Tourz package.",
        }
      : seoConfig[location.pathname] || seoConfig["/"];

    const canonicalUrl = `${siteUrl}${location.pathname}`;

    document.title = config.title;

    updateMetaTag(
      'meta[name="description"]',
      { name: "description" },
      config.description
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
      'meta[property="og:type"]',
      { property: "og:type" },
      "website"
    );

    updateMetaTag(
      'meta[property="og:site_name"]',
      { property: "og:site_name" },
      "Europe Tourz"
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
      'meta[name="robots"]',
      { name: "robots" },
      config.noIndex ? "noindex, nofollow" : "index, follow"
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute("href", canonicalUrl);
  }, [location.pathname]);

  return null;
}

export default SEO;