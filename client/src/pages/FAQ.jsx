import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Does submitting an enquiry confirm my booking?",
    answer:
      "No. An enquiry helps us understand your travel requirements. Your booking is confirmed only after availability is verified, written confirmation is issued and the required payment is received.",
  },
  {
    question: "Are the package prices charged per person?",
    answer:
      "Yes, displayed package prices are generally per person unless the package page or final quotation clearly states otherwise.",
  },
  {
    question: "Can the itinerary be customised?",
    answer:
      "Customisation may be available depending on group size, travel dates, supplier availability and the type of package selected.",
  },
  {
    question: "Are flights included in the package?",
    answer:
      "Flights are included only when specifically mentioned in the package inclusions. Please review the selected package or contact our team for confirmation.",
  },
  {
    question: "Do you assist with visa applications?",
    answer:
      "We may provide supporting travel documents and general guidance. Visa approval is decided solely by the relevant embassy or immigration authority.",
  },
  {
    question: "What payment options are available?",
    answer:
      "Depending on the booking, payment may be collected in full, through an advance deposit, instalments or a secure payment link issued after availability confirmation.",
  },
  {
    question: "What happens if I cancel my tour?",
    answer:
      "Cancellation charges depend on how close the cancellation is to the departure date and on supplier terms. Please review our Cancellation and Refund Policy.",
  },
  {
    question: "Can travel dates or traveller names be changed?",
    answer:
      "Changes are subject to availability and supplier approval. Additional airline, hotel, rail, visa or administrative charges may apply.",
  },
  {
    question: "How will I receive confirmation after submitting an enquiry?",
    answer:
      "A confirmation email is sent automatically. Our travel team will then review your request and contact you with availability and next steps.",
  },
  {
    question: "How can I contact Europe Tourz?",
    answer:
      "You can use the website contact form or email us directly at info@europetourz.com.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="min-h-screen bg-[#070b14] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Help Centre
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400">
            Find answers to common questions about enquiries, bookings,
            payments, visas, itinerary changes and cancellations.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-yellow-400/30 text-xl text-yellow-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 py-5 leading-8 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-8 text-center">
          <h2 className="text-2xl font-bold">
            Still have questions?
          </h2>

          <p className="mt-3 text-gray-300">
            Contact our travel team and we will help you with your requirements.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Contact Europe Tourz
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQ;