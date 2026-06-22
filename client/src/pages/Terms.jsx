import LegalPage, {
  LegalList,
  LegalSection,
} from "../components/LegalPage";

function Terms() {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="These terms govern access to the Europe Tourz website, tour enquiries, bookings and related services."
      lastUpdated="22 June 2026"
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By using this website or submitting a booking request, you agree to
          these Terms and Conditions. If you do not agree, please do not use
          the website or our services.
        </p>
      </LegalSection>

      <LegalSection title="2. Tour Enquiries and Availability">
        <p>
          Submission of an enquiry does not guarantee availability or create a
          confirmed booking. A booking is confirmed only after Europe Tourz
          provides written confirmation and receives the required payment.
        </p>
      </LegalSection>

      <LegalSection title="3. Pricing">
        <LegalList>
          <li>Prices are displayed per person unless stated otherwise.</li>
          <li>Prices may change due to currency movements, taxes, supplier changes or availability.</li>
          <li>Final pricing will be confirmed before payment.</li>
          <li>Optional services and personal expenses are not included unless specifically stated.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="4. Traveller Responsibilities">
        <p>Travellers are responsible for:</p>

        <LegalList>
          <li>Providing accurate personal and booking information.</li>
          <li>Holding valid passports, visas and travel documents.</li>
          <li>Meeting health, immigration and entry requirements.</li>
          <li>Arriving on time for flights, transfers and scheduled activities.</li>
          <li>Complying with local laws and supplier instructions.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="5. Itinerary Changes">
        <p>
          Europe Tourz may make reasonable itinerary changes due to weather,
          operational requirements, supplier availability, safety concerns,
          government restrictions or events outside our control.
        </p>
      </LegalSection>

      <LegalSection title="6. Third-Party Services">
        <p>
          Hotels, airlines, transport operators, attractions and other services
          may be supplied by independent third parties. Their own terms and
          conditions may also apply.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <p>
          To the extent permitted by law, Europe Tourz is not responsible for
          losses caused by events beyond reasonable control, including severe
          weather, strikes, government action, border restrictions, supplier
          failure, public-health events or transportation disruption.
        </p>
      </LegalSection>

      <LegalSection title="8. Website Content">
        <p>
          We aim to keep website information accurate, but photographs,
          descriptions, durations and itineraries may be illustrative and
          subject to change.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These terms will be governed by the applicable law stated in the
          final client-approved legal version of this policy.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
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

export default Terms;