function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildCustomerConfirmationEmail(enquiry) {
  const safeName = escapeHtml(enquiry.name);
  const safePackage = escapeHtml(enquiry.packageName);
  const safeTravelers = escapeHtml(enquiry.travelers);
  const safeTravelMonth = escapeHtml(
    enquiry.travelMonth || "Not specified"
  );

  return {
    subject: `We received your Europe Tourz enquiry`,
    text: [
      `Dear ${enquiry.name},`,
      "",
      `Thank you for contacting Europe Tourz.`,
      `We received your enquiry for ${enquiry.packageName}.`,
      `Travelers: ${enquiry.travelers}`,
      `Preferred travel month: ${enquiry.travelMonth || "Not specified"}`,
      "",
      "Our travel consultant will contact you shortly.",
      "",
      "Regards,",
      "Europe Tourz",
      "info@europetourz.com",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#1f2937;">
        <div style="background:#070b14;padding:28px;text-align:center;">
          <h1 style="margin:0;color:#facc15;">Europe Tourz</h1>
          <p style="margin:8px 0 0;color:#ffffff;">Premium Europe Tours</p>
        </div>

        <div style="padding:32px;border:1px solid #e5e7eb;">
          <h2 style="margin-top:0;">Thank you, ${safeName}</h2>

          <p>We have received your tour enquiry successfully.</p>

          <div style="background:#f9fafb;padding:18px;border-radius:10px;margin:24px 0;">
            <p><strong>Package:</strong> ${safePackage}</p>
            <p><strong>Travelers:</strong> ${safeTravelers}</p>
            <p><strong>Preferred travel month:</strong> ${safeTravelMonth}</p>
          </div>

          <p>
            Our travel consultant will review your request and contact you
            shortly with availability and the next steps.
          </p>

          <p style="margin-top:28px;">
            Regards,<br />
            <strong>Europe Tourz</strong><br />
            <a href="mailto:info@europetourz.com">info@europetourz.com</a>
          </p>
        </div>
      </div>
    `,
  };
}

function buildAdminNotificationEmail(enquiry) {
  const fields = {
    Name: enquiry.name,
    Phone: enquiry.phone,
    Email: enquiry.email,
    Package: enquiry.packageName,
    Travelers: enquiry.travelers,
    "Travel month": enquiry.travelMonth || "Not specified",
    Message: enquiry.message || "No message",
  };

  const tableRows = Object.entries(fields)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px;border:1px solid #e5e7eb;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `
    )
    .join("");

  return {
    subject: `New enquiry: ${enquiry.packageName} — ${enquiry.name}`,
    text: [
      "A new enquiry was submitted.",
      "",
      ...Object.entries(fields).map(([label, value]) => `${label}: ${value}`),
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#1f2937;">
        <h2>New Europe Tourz enquiry</h2>

        <table style="width:100%;border-collapse:collapse;">
          ${tableRows}
        </table>

        <p style="margin-top:24px;">
          Sign in to the admin dashboard to manage this enquiry.
        </p>

        <p>
          <a href="https://europetourz.com/admin/login">
            Open Admin Dashboard
          </a>
        </p>
      </div>
    `,
  };
}

module.exports = {
  buildCustomerConfirmationEmail,
  buildAdminNotificationEmail,
};