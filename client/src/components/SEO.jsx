import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://europetourz.com";
const socialImageUrl =
"https://europetourz.com/social-share-1200x630.jpg";

const defaultSeo = {
title: "Europe Tourz | Premium Europe Tour Packages",
description:
"Explore carefully curated premium Europe tour packages with comfortable travel, organised itineraries and personalised assistance.",
};

const seoConfig = {
"/": defaultSeo,

"/about": {
title: "About Europe Tourz | Premium European Travel",
description:
"Learn about Europe Tourz and our mission to provide comfortable, transparent and professionally organised European travel experiences.",
},

"/packages": {
title: "Premium Europe Tour Packages | Europe Tourz",
description:
"Browse premium multi-country Europe tour packages with accommodation, private coach travel, sightseeing and personalised assistance.",
},

"/package/grand-europe-discovery": {
title: "Grand Europe Discovery Tour Package | Europe Tourz",
description:
"Explore the Grand Europe Discovery tour covering Switzerland, Germany, Austria, Hungary, the Czech Republic, Slovakia and Slovenia with premium accommodation, Indian meals and organised transport.",
},

"/package/grand-europe-express": {
title: "Grand Europe Express Tour Package | Europe Tourz",
description:
"Discover the Grand Europe Express package featuring a carefully planned European itinerary, comfortable accommodation, organised sightseeing, Indian meals and professional tour assistance.",
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
"Read the Europe Tourz Privacy Policy and learn how personal information is collected, used, stored and protected.",
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

"/admin/login": {
title: "Admin Login | Europe Tourz",
description: "Europe Tourz administration login.",
noIndex: true,
},

"/admin/enquiries": {
title: "Enquiry Management | Europe Tourz",
description: "Europe Tourz enquiry management dashboard.",
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
  "Europe Tourz"
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
