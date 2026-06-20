import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch("http://localhost:5000/api/enquiries", {
        headers: {
          "x-admin-api-key": "dev-admin-secret-123",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Unable to fetch enquiries.");
        return;
      }

      setEnquiries(data.enquiries || []);
    } catch (error) {
      console.error("Fetch enquiries error:", error);
      setErrorMessage(
        "Backend is not reachable. Please make sure server is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("europeLuxeAdminAuth");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white px-6 md:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
              Admin Dashboard
            </p>

            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Customer Enquiries
            </h1>

            <p className="text-gray-400 max-w-2xl">
              View all Europe tour enquiries submitted from the website contact
              form.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchEnquiries}
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/20 transition"
            >
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 font-semibold hover:bg-red-500/20 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <SummaryCard label="Total Enquiries" value={enquiries.length} />

          <SummaryCard
            label="New Enquiries"
            value={enquiries.filter((item) => item.status === "new").length}
          />

          <SummaryCard
            label="Discovery"
            value={
              enquiries.filter(
                (item) => item.packageName === "Grand Europe Discovery"
              ).length
            }
          />

          <SummaryCard
            label="Express"
            value={
              enquiries.filter(
                (item) => item.packageName === "Grand Europe Express"
              ).length
            }
          />
        </div>

        {/* STATUS */}
        {loading && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-gray-300">
            Loading enquiries...
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-400/10 border border-red-400/30 rounded-3xl p-8 text-red-300">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && enquiries.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-serif font-bold mb-3">
              No enquiries yet
            </h2>

            <p className="text-gray-400">
              Once users submit the enquiry form, their details will appear
              here.
            </p>
          </div>
        )}

        {/* DESKTOP TABLE */}
        {!loading && !errorMessage && enquiries.length > 0 && (
          <div className="hidden lg:block bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/10 text-gray-300">
                  <tr>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Package</th>
                    <th className="px-5 py-4">Travelers</th>
                    <th className="px-5 py-4">Month</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-5 py-4 font-semibold">{item.name}</td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.phone}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.email}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.packageName}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.travelers}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {item.travelMonth || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm">
                          {item.status || "new"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MOBILE CARDS */}
        {!loading && !errorMessage && enquiries.length > 0 && (
          <div className="lg:hidden space-y-5">
            {enquiries.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-gray-500 text-sm">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm">
                    {item.status || "new"}
                  </span>
                </div>

                <div className="space-y-3 text-gray-300">
                  <InfoRow label="Phone" value={item.phone} />
                  <InfoRow label="Email" value={item.email} />
                  <InfoRow label="Package" value={item.packageName} />
                  <InfoRow label="Travelers" value={item.travelers} />
                  <InfoRow
                    label="Travel Month"
                    value={item.travelMonth || "-"}
                  />
                  <InfoRow label="Message" value={item.message || "-"} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NOTE */}
        <div className="mt-8 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-5 text-yellow-200 text-sm">
          Note: This admin page is protected with simple local login and a
          development API key. Before production, replace this with secure
          backend authentication using JWT, hashed passwords, environment-based
          secrets, and protected API routes.
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-gray-500 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-yellow-400">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-white break-words">{value}</p>
    </div>
  );
}

function formatDate(dateValue) {
  if (!dateValue) return "-";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}