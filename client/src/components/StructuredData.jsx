import { useLocation } from "react-router-dom";

const organisationData = {
"@type": "TravelAgency",
"@id": "https://europetourz.com/#organization",
name: "Europe Tourz",
url: "https://europetourz.com",
email: "[info@europetourz.com](mailto:info@europetourz.com)",
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
};

const packageStructuredData = {
"/package/grand-europe-discovery": {
"@type": "TouristTrip",
"@id":
"https://europetourz.com/package/grand-europe-discovery#tour",
name: "Grand Europe Discovery",
url: "https://europetourz.com/package/grand-europe-discovery",
description:
"An 11-day premium multi-country European tour covering Switzerland, Germany, Austria, Hungary, the Czech Republic, Slovakia and Slovenia.",
image:
"https://europetourz.com/social-share-1200x630.jpg",
touristType: [
"Families",
"Couples",
"Groups",
"Luxury travellers",
],
itinerary: {
"@type": "ItemList",
name: "Grand Europe Discovery destinations",
itemListElement: [
{
"@type": "ListItem",
position: 1,
name: "Switzerland",
},
{
"@type": "ListItem",
position: 2,
name: "Germany",
},
{
"@type": "ListItem",
position: 3,
name: "Austria",
},
{
"@type": "ListItem",
position: 4,
name: "Hungary",
},
{
"@type": "ListItem",
position: 5,
name: "Czech Republic",
},
{
"@type": "ListItem",
position: 6,
name: "Slovakia",
},
{
"@type": "ListItem",
position: 7,
name: "Slovenia",
},
],
},
provider: {
"@id": "https://europetourz.com/#organization",
},
offers: {
"@type": "Offer",
url: "https://europetourz.com/package/grand-europe-discovery",
price: "325000",
priceCurrency: "INR",
availability: "https://schema.org/InStock",
seller: {
"@id": "https://europetourz.com/#organization",
},
},
},

"/package/grand-europe-express": {
"@type": "TouristTrip",
"@id":
"https://europetourz.com/package/grand-europe-express#tour",
name: "Grand Europe Express",
url: "https://europetourz.com/package/grand-europe-express",
description:
"A 7-day premium European tour covering Switzerland, Germany, Austria, the Czech Republic and Hungary with organised sightseeing, accommodation and tour assistance.",
image:
"https://europetourz.com/social-share-1200x630.jpg",
touristType: [
"Families",
"Couples",
"Groups",
"Luxury travellers",
],
itinerary: {
"@type": "ItemList",
name: "Grand Europe Express destinations",
itemListElement: [
{
"@type": "ListItem",
position: 1,
name: "Switzerland",
},
{
"@type": "ListItem",
position: 2,
name: "Germany",
},
{
"@type": "ListItem",
position: 3,
name: "Austria",
},
{
"@type": "ListItem",
position: 4,
name: "Czech Republic",
},
{
"@type": "ListItem",
position: 5,
name: "Hungary",
},
],
},
provider: {
"@id": "https://europetourz.com/#organization",
},
offers: {
"@type": "Offer",
url: "https://europetourz.com/package/grand-europe-express",
price: "225000",
priceCurrency: "INR",
availability: "https://schema.org/InStock",
seller: {
"@id": "https://europetourz.com/#organization",
},
},
},
};

function StructuredData() {
const location = useLocation();
const packageData = packageStructuredData[location.pathname];

const structuredData = {
"@context": "https://schema.org",
"@graph": packageData
? [organisationData, packageData]
: [organisationData],
};

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
