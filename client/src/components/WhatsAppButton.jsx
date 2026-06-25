import { useState } from "react";

const whatsappContacts = [
  {
    label: "Primary Contact",
    displayNumber: "+421 951 819 086",
    whatsappNumber: "421951819086",
    primary: true,
  },
  {
    label: "Alternate Contact",
    displayNumber: "+91 70224 40601",
    whatsappNumber: "917022440601",
    primary: false,
  },
];

function WhatsAppIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.01 3C8.84 3 3 8.75 3 15.82c0 2.27.61 4.49 1.77 6.43L3 29l6.94-1.8a13.14 13.14 0 0 0 6.07 1.48C23.18 28.68 29 22.93 29 15.86 29 8.77 23.18 3 16.01 3Zm0 23.45c-1.93 0-3.82-.5-5.49-1.45l-.39-.22-4.12 1.07 1.1-4-.26-.41a10.36 10.36 0 0 1-1.6-5.58c0-5.83 4.83-10.58 10.76-10.58s10.76 4.75 10.76 10.58c0 5.84-4.83 10.59-10.76 10.59Zm5.9-7.93c-.32-.16-1.91-.93-2.2-1.04-.3-.11-.52-.16-.74.16-.21.31-.84 1.03-1.03 1.24-.19.21-.38.24-.7.08-.32-.16-1.36-.49-2.59-1.55-.96-.84-1.61-1.88-1.8-2.2-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.39-.03-.55-.08-.16-.74-1.76-1.01-2.41-.27-.63-.54-.55-.74-.56h-.63c-.21 0-.55.08-.84.39-.29.32-1.1 1.07-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.22 3.35 5.38 4.7.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.91-.77 2.18-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const message =
    "Hello Europetourz, I am interested in your Europe tour packages. Please share more details.";

  const openWhatsApp = (number) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] text-white shadow-2xl">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="font-bold">Chat with Europetourz</p>
            <p className="mt-1 text-sm text-gray-400">
              Select a WhatsApp contact
            </p>
          </div>

          <div className="p-2">
            {whatsappContacts.map((contact) => (
              <button
                key={contact.whatsappNumber}
                type="button"
                onClick={() => openWhatsApp(contact.whatsappNumber)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/10 ${
                  contact.primary ? "bg-green-500/10" : ""
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>

                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="block font-semibold">{contact.label}</span>

                    {contact.primary && (
                      <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-black">
                        Recommended
                      </span>
                    )}
                  </span>

                  <span className="mt-1 block text-sm text-gray-400">
                    {contact.displayNumber}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label="Open WhatsApp contacts"
        aria-expanded={isOpen}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105 hover:bg-green-400"
      >
        {isOpen ? <span className="text-3xl">×</span> : <WhatsAppIcon />}
      </button>
    </div>
  );
}

export default WhatsAppButton;