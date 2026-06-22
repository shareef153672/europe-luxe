import LegalPage, {
  LegalList,
  LegalSection,
} from "../components/LegalPage";

function PaymentPolicy() {
  return (
    <LegalPage
      title="Payment Policy"
      description="This policy explains how payments, deposits and booking confirmations are handled by Europe Tourz."
      lastUpdated="22 June 2026"
    >
      <LegalSection title="1. Booking Confirmation">
        <p>
          A booking is confirmed only after Europe Tourz issues written
          confirmation and receives the required deposit or full payment.
        </p>
      </LegalSection>

      <LegalSection title="2. Payment Options">
        <p>Depending on the booking, customers may be offered:</p>

        <LegalList>
          <li>Full payment at the time of confirmation.</li>
          <li>An advance or booking deposit.</li>
          <li>A scheduled instalment plan.</li>
          <li>A secure payment link issued after availability confirmation.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Payment Processing">
        <p>
          Card payments may be processed by Stripe or another authorised
          payment provider. Payment providers may apply their own terms,
          identity checks and security controls.
        </p>
      </LegalSection>

      <LegalSection title="4. Currency and Conversion">
        <p>
          The final payment currency will be shown before payment. Banks or card
          issuers may apply exchange rates, international transaction charges
          or other fees.
        </p>
      </LegalSection>

      <LegalSection title="5. Payment Deadlines">
        <p>
          Payment must be completed by the deadline stated in the quotation or
          booking confirmation. Failure to pay by the deadline may result in
          release of reserved services.
        </p>
      </LegalSection>

      <LegalSection title="6. Failed or Duplicate Payments">
        <p>
          Customers should contact Europe Tourz immediately if a payment fails,
          appears duplicated or is charged incorrectly. We may require the
          transaction reference and supporting bank information.
        </p>
      </LegalSection>

      <LegalSection title="7. Fraud Prevention">
        <p>
          Europe Tourz and its payment providers may perform verification or
          fraud-prevention checks. Suspicious transactions may be delayed,
          declined or refunded.
        </p>
      </LegalSection>

      <LegalSection title="8. Refunds">
        <p>
          Refund eligibility is governed by the Cancellation and Refund Policy,
          confirmed supplier terms and the booking agreement.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
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

export default PaymentPolicy;