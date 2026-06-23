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

function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const message =
    "Hello Europe Tourz, I am interested in your Europe tour packages. Please share more details.";

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
            <p className="font-bold">Chat with Europe Tourz</p>
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
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-xl font-bold text-white">
                  W
                </span>

                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="block font-semibold">
                      {contact.label}
                    </span>

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
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white shadow-2xl transition hover:scale-105 hover:bg-green-400"
      >
        {isOpen ? "×" : "W"}
      </button>
    </div>
  );
}

export default WhatsAppButton;