import LegalPage, {
  LegalList,
  LegalSection,
} from "../components/LegalPage";

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how Europe Tourz collects, uses, stores and protects personal information submitted through our website."
      lastUpdated="22 June 2026"
    >
      <LegalSection title="1. Information We Collect">
        <p>We may collect information that you voluntarily provide, including:</p>

        <LegalList>
          <li>Name, email address and phone number.</li>
          <li>Preferred travel month and number of travellers.</li>
          <li>Tour-package preferences and enquiry messages.</li>
          <li>Booking, communication and payment-related information.</li>
          <li>Technical information such as browser type, IP address and device information.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>We use personal information to:</p>

        <LegalList>
          <li>Respond to tour enquiries and booking requests.</li>
          <li>Provide availability, quotations and travel information.</li>
          <li>Process bookings and payments.</li>
          <li>Send enquiry confirmations and service-related communication.</li>
          <li>Maintain security, prevent misuse and improve our website.</li>
          <li>Meet legal, accounting and regulatory obligations.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="3. Payments">
        <p>
          Payments may be processed by third-party payment providers such as
          Stripe. Europe Tourz does not directly store full card numbers or
          card-security codes on its servers.
        </p>
      </LegalSection>

      <LegalSection title="4. Sharing of Information">
        <p>
          We do not sell personal information. Information may be shared only
          when necessary with trusted service providers, payment processors,
          hotels, transport operators, tour partners, technology providers or
          authorities where legally required.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Storage and Security">
        <p>
          We use reasonable technical and organisational safeguards to protect
          personal information. However, no internet-based system can guarantee
          complete security.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          Personal information is retained only for as long as reasonably
          necessary to manage enquiries, bookings, customer service, legal
          obligations and legitimate business requirements.
        </p>
      </LegalSection>

      <LegalSection title="7. Your Rights">
        <p>
          Subject to applicable law, you may request access, correction,
          deletion or restriction of your personal information by contacting
          us at info@europetourz.com.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies and Analytics">
        <p>
          The website may use essential cookies and, when enabled, analytics
          technologies. Additional consent mechanisms may be introduced where
          required by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          For privacy-related questions, contact:
          <br />
          <a
            href="mailto:info@europetourz.com"
            className="text-yellow-300 hover:underline"
          >
            info@europetourz.com
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}

export default PrivacyPolicy;