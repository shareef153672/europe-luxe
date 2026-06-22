import LegalPage, {
  LegalList,
  LegalSection,
} from "../components/LegalPage";

function CancellationPolicy() {
  return (
    <LegalPage
      title="Cancellation and Refund Policy"
      description="This policy describes the general cancellation and refund framework for Europe Tourz bookings."
      lastUpdated="22 June 2026"
    >
      <LegalSection title="1. Cancellation Requests">
        <p>
          All cancellation requests must be submitted in writing to
          info@europetourz.com. The cancellation date will be the date on which
          Europe Tourz receives the written request.
        </p>
      </LegalSection>

      <LegalSection title="2. General Cancellation Charges">
        <p>
          Unless different terms are stated in the confirmed quotation or
          booking document, cancellation charges may apply as follows:
        </p>

        <LegalList>
          <li>More than 60 days before departure: administrative and non-refundable supplier charges.</li>
          <li>31–60 days before departure: up to 40% of the total booking value.</li>
          <li>15–30 days before departure: up to 70% of the total booking value.</li>
          <li>Within 14 days of departure or no-show: up to 100% of the total booking value.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Non-Refundable Components">
        <p>
          Visa fees, insurance, airline tickets, rail tickets, attraction
          tickets, special-rate hotels, payment-processing charges and other
          supplier-confirmed services may be partially or completely
          non-refundable.
        </p>
      </LegalSection>

      <LegalSection title="4. Refund Processing">
        <p>
          Approved refunds will be returned to the original payment method
          where possible. Processing time may depend on banks, payment
          providers and suppliers.
        </p>
      </LegalSection>

      <LegalSection title="5. Changes by the Traveller">
        <p>
          Date changes, traveller substitutions and itinerary amendments are
          subject to availability, supplier approval and additional charges.
        </p>
      </LegalSection>

      <LegalSection title="6. Cancellation by Europe Tourz">
        <p>
          If Europe Tourz must cancel a tour, customers may be offered an
          alternative arrangement, travel credit or refund, depending on
          supplier terms and the circumstances of cancellation.
        </p>
      </LegalSection>

      <LegalSection title="7. Force Majeure">
        <p>
          Refunds may be limited where cancellation is caused by events beyond
          reasonable control, such as natural disasters, war, strikes,
          government restrictions, epidemics, border closures or major
          transportation disruption.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <a
          href="mailto:info@europetourz.com"
          className="text-yellow-300 hover:underline"
        >
          info@europetourz.com
        </a>
      </LegalSection>
    </LegalPage>
  );
}

export default CancellationPolicy;