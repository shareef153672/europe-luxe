import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem("europeTourzAdminToken");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const fetchEnquiries = useCallback(
    async (isRefresh = false) => {
      const token = localStorage.getItem("europeTourzAdminToken");

      if (!token) {
        logoutAdmin();
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/enquiries`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let data = {};

        try {
          data = await response.json();
        } catch {
          data = {};
        }

        if (response.status === 401 || response.status === 403) {
          logoutAdmin();
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch customer enquiries."
          );
        }

        setEnquiries(Array.isArray(data.enquiries) ? data.enquiries : []);
      } catch (fetchError) {
        console.error("Fetch enquiries error:", fetchError);

        setError(
          fetchError.message ||
            "Backend is not reachable. Please try again later."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [logoutAdmin]
  );

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const summary = useMemo(() => {
    const normalizedEnquiries = enquiries.map((enquiry) => ({
      ...enquiry,
      packageName: String(enquiry.packageName || "").toLowerCase(),
      status: String(enquiry.status || "").toLowerCase(),
    }));

    return {
      total: normalizedEnquiries.length,
      newCount: normalizedEnquiries.filter(
        (enquiry) => enquiry.status === "new"
      ).length,
      discovery: normalizedEnquiries.filter((enquiry) =>
        enquiry.packageName.includes("discovery")
      ).length,
      express: normalizedEnquiries.filter((enquiry) =>
        enquiry.packageName.includes("express")
      ).length,
    };
  }, [enquiries]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return String(dateValue);
    }

    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsedDate);
  };

  const handleLogout = () => {
    logoutAdmin();
  };

  return (
    <section className="min-h-screen bg-[#070b14] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Europe Tourz Admin
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Customer Enquiries
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Review customer enquiries submitted through the website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Enquiries" value={summary.total} />
          <SummaryCard label="New Enquiries" value={summary.newCount} />
          <SummaryCard
            label="Grand Europe Discovery"
            value={summary.discovery}
          />
          <SummaryCard label="Grand Europe Express" value={summary.express} />
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-400/30 bg-red-400/10 p-5 text-red-300">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-gray-400">
              Loading enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-12 text-center">
              <h2 className="text-xl font-semibold text-white">
                No enquiries found
              </h2>

              <p className="mt-2 text-gray-400">
                New customer enquiries will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-black/20">
                    <tr>
                      <TableHeading>Customer</TableHeading>
                      <TableHeading>Contact</TableHeading>
                      <TableHeading>Package</TableHeading>
                      <TableHeading>Travel details</TableHeading>
                      <TableHeading>Message</TableHeading>
                      <TableHeading>Status</TableHeading>
                      <TableHeading>Submitted</TableHeading>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    {enquiries.map((enquiry) => (
                      <tr
                        key={enquiry.id}
                        className="align-top transition hover:bg-white/[0.03]"
                      >
                        <TableCell>
                          <p className="font-semibold text-white">
                            {enquiry.name || "Not provided"}
                          </p>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1">
                            <a
                              href={
                                enquiry.email
                                  ? `mailto:${enquiry.email}`
                                  : undefined
                              }
                              className="block text-yellow-300 hover:underline"
                            >
                              {enquiry.email || "No email"}
                            </a>

                            <a
                              href={
                                enquiry.phone
                                  ? `tel:${enquiry.phone}`
                                  : undefined
                              }
                              className="block text-gray-300 hover:text-white"
                            >
                              {enquiry.phone || "No phone"}
                            </a>
                          </div>
                        </TableCell>

                        <TableCell>
                          <p className="max-w-48 text-gray-200">
                            {enquiry.packageName || "Not selected"}
                          </p>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-1 text-gray-300">
                            <p>
                              Travelers: {enquiry.travelers || "Not provided"}
                            </p>
                            <p>
                              Month: {enquiry.travelMonth || "Not provided"}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <p className="max-w-64 whitespace-pre-wrap text-gray-300">
                            {enquiry.message || "No message"}
                          </p>
                        </TableCell>

                        <TableCell>
                          <StatusBadge status={enquiry.status} />
                        </TableCell>

                        <TableCell>
                          <p className="min-w-36 text-gray-400">
                            {formatDate(enquiry.createdAt)}
                          </p>
                        </TableCell>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 lg:hidden">
                {enquiries.map((enquiry) => (
                  <article
                    key={enquiry.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          {enquiry.name || "Unnamed customer"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                          {formatDate(enquiry.createdAt)}
                        </p>
                      </div>

                      <StatusBadge status={enquiry.status} />
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                      <DetailRow
                        label="Email"
                        value={enquiry.email || "Not provided"}
                      />

                      <DetailRow
                        label="Phone"
                        value={enquiry.phone || "Not provided"}
                      />

                      <DetailRow
                        label="Package"
                        value={enquiry.packageName || "Not selected"}
                      />

                      <DetailRow
                        label="Travelers"
                        value={enquiry.travelers || "Not provided"}
                      />

                      <DetailRow
                        label="Travel month"
                        value={enquiry.travelMonth || "Not provided"}
                      />

                      <DetailRow
                        label="Message"
                        value={enquiry.message || "No message"}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-green-400/20 bg-green-400/10 p-5 text-sm text-green-200">
          Admin access is protected through backend JWT authentication. Tokens
          expire automatically after the configured session period.
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function TableHeading({ children }) {
  return (
    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
      {children}
    </th>
  );
}

function TableCell({ children }) {
  return <td className="px-5 py-5 text-sm">{children}</td>;
}

function StatusBadge({ status }) {
  const normalizedStatus = String(status || "new").toLowerCase();

  const styles =
    normalizedStatus === "new"
      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
      : "border-green-400/30 bg-green-400/10 text-green-300";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles}`}
    >
      {normalizedStatus}
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-wrap break-words text-gray-200">
        {value}
      </p>
    </div>
  );
}

export default AdminEnquiries;