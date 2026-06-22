import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "closed"];

function AdminEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem("europeTourzAdminToken");
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("europeTourzAdminToken");

    if (!token) {
      logoutAdmin();
      return null;
    }

    return token;
  }, [logoutAdmin]);

  const fetchEnquiries = useCallback(
    async (isRefresh = false) => {
      const token = getToken();

      if (!token) {
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");
      setSuccessMessage("");

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

        const data = await readJsonResponse(response);

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
            "Unable to reach the backend. Please try again."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [getToken, logoutAdmin]
  );

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateEnquiry = async (enquiryId, updates) => {
    const token = getToken();

    if (!token) {
      return;
    }

    setUpdatingId(enquiryId);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      const data = await readJsonResponse(response);

      if (response.status === 401 || response.status === 403) {
        logoutAdmin();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to update enquiry.");
      }

      setEnquiries((currentEnquiries) =>
        currentEnquiries.map((enquiry) =>
          enquiry.id === enquiryId ? data.enquiry : enquiry
        )
      );

      setSuccessMessage("Enquiry updated successfully.");
    } catch (updateError) {
      console.error("Update enquiry error:", updateError);
      setError(updateError.message || "Unable to update enquiry.");
    } finally {
      setUpdatingId("");
    }
  };

  const handleStatusChange = async (enquiryId, status) => {
    await updateEnquiry(enquiryId, { status });
  };

  const handleNotesSave = async (enquiryId, adminNotes) => {
    await updateEnquiry(enquiryId, { adminNotes });
  };

  const handleDelete = async (enquiry) => {
    const shouldDelete = window.confirm(
      `Delete enquiry from ${enquiry.name || "this customer"}? This cannot be undone.`
    );

    if (!shouldDelete) {
      return;
    }

    const token = getToken();

    if (!token) {
      return;
    }

    setDeletingId(enquiry.id);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enquiries/${enquiry.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await readJsonResponse(response);

      if (response.status === 401 || response.status === 403) {
        logoutAdmin();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete enquiry.");
      }

      setEnquiries((currentEnquiries) =>
        currentEnquiries.filter(
          (currentEnquiry) => currentEnquiry.id !== enquiry.id
        )
      );

      setSuccessMessage("Enquiry deleted successfully.");
    } catch (deleteError) {
      console.error("Delete enquiry error:", deleteError);
      setError(deleteError.message || "Unable to delete enquiry.");
    } finally {
      setDeletingId("");
    }
  };

  const packageOptions = useMemo(() => {
    return [
      ...new Set(
        enquiries
          .map((enquiry) => enquiry.packageName)
          .filter(Boolean)
          .sort()
      ),
    ];
  }, [enquiries]);

  const filteredEnquiries = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const status = String(enquiry.status || "new").toLowerCase();
      const packageName = String(enquiry.packageName || "");

      const matchesSearch =
        !normalizedSearch ||
        [
          enquiry.name,
          enquiry.email,
          enquiry.phone,
          enquiry.packageName,
          enquiry.message,
          enquiry.travelMonth,
          enquiry.adminNotes,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(normalizedSearch)
        );

      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      const matchesPackage =
        packageFilter === "all" || packageName === packageFilter;

      return matchesSearch && matchesStatus && matchesPackage;
    });
  }, [enquiries, searchText, statusFilter, packageFilter]);

  const summary = useMemo(() => {
    const countByStatus = (status) =>
      enquiries.filter(
        (enquiry) =>
          String(enquiry.status || "new").toLowerCase() === status
      ).length;

    return {
      total: enquiries.length,
      newCount: countByStatus("new"),
      contacted: countByStatus("contacted"),
      confirmed: countByStatus("confirmed"),
      closed: countByStatus("closed"),
    };
  }, [enquiries]);

  const exportToCsv = () => {
    if (filteredEnquiries.length === 0) {
      setError("There are no enquiries to export.");
      return;
    }

    const headers = [
      "Name",
      "Phone",
      "Email",
      "Package",
      "Travelers",
      "Travel Month",
      "Message",
      "Status",
      "Admin Notes",
      "Created At",
      "Updated At",
    ];

    const rows = filteredEnquiries.map((enquiry) => [
      enquiry.name,
      enquiry.phone,
      enquiry.email,
      enquiry.packageName,
      enquiry.travelers,
      enquiry.travelMonth,
      enquiry.message,
      enquiry.status,
      enquiry.adminNotes,
      enquiry.createdAt,
      enquiry.updatedAt,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");

    const csvBlob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");

    downloadLink.href = downloadUrl;
    downloadLink.download = `europe-tourz-enquiries-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(downloadUrl);
  };

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setPackageFilter("all");
  };

  return (
    <section className="min-h-screen bg-[#070b14] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Europe Tourz Admin
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Enquiry Management
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Search, manage, update and export customer enquiries.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-60"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={exportToCsv}
              className="rounded-xl border border-green-400/30 bg-green-400/10 px-5 py-3 text-sm font-semibold text-green-300 transition hover:bg-green-400/20"
            >
              Export CSV
            </button>

            <button
              type="button"
              onClick={logoutAdmin}
              className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard label="Total" value={summary.total} />
          <SummaryCard label="New" value={summary.newCount} />
          <SummaryCard label="Contacted" value={summary.contacted} />
          <SummaryCard label="Confirmed" value={summary.confirmed} />
          <SummaryCard label="Closed" value={summary.closed} />
        </div>

        <div className="mb-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Search enquiries
            </label>

            <input
              id="search"
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search name, email, phone, package or notes"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-yellow-400"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {capitalize(status)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="package-filter"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Package
            </label>

            <select
              id="package-filter"
              value={packageFilter}
              onChange={(event) => setPackageFilter(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-yellow-400"
            >
              <option value="all">All packages</option>

              {packageOptions.map((packageName) => (
                <option key={packageName} value={packageName}>
                  {packageName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 xl:col-span-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              Showing {filteredEnquiries.length} of {enquiries.length} enquiries
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-yellow-300 hover:text-yellow-200"
            >
              Clear filters
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-green-300">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-gray-400">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-xl font-semibold">No enquiries found</h2>
            <p className="mt-2 text-gray-400">
              Change your filters or wait for new customer enquiries.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredEnquiries.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                updating={updatingId === enquiry.id}
                deleting={deletingId === enquiry.id}
                onStatusChange={handleStatusChange}
                onNotesSave={handleNotesSave}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EnquiryCard({
  enquiry,
  updating,
  deleting,
  onStatusChange,
  onNotesSave,
  onDelete,
}) {
  const [notes, setNotes] = useState(enquiry.adminNotes || "");

  useEffect(() => {
    setNotes(enquiry.adminNotes || "");
  }, [enquiry.adminNotes]);

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">
              {enquiry.name || "Unnamed customer"}
            </h2>

            <StatusBadge status={enquiry.status} />
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Submitted {formatDate(enquiry.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={String(enquiry.status || "new").toLowerCase()}
            onChange={(event) =>
              onStatusChange(enquiry.id, event.target.value)
            }
            disabled={updating}
            className="rounded-xl border border-white/10 bg-[#111827] px-4 py-2 text-sm text-white outline-none focus:border-yellow-400 disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {capitalize(status)}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onDelete(enquiry)}
            disabled={deleting}
            className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/20 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DetailItem label="Email">
          {enquiry.email ? (
            <a
              href={`mailto:${enquiry.email}`}
              className="text-yellow-300 hover:underline"
            >
              {enquiry.email}
            </a>
          ) : (
            "Not provided"
          )}
        </DetailItem>

        <DetailItem label="Phone">
          {enquiry.phone ? (
            <a
              href={`tel:${enquiry.phone}`}
              className="text-yellow-300 hover:underline"
            >
              {enquiry.phone}
            </a>
          ) : (
            "Not provided"
          )}
        </DetailItem>

        <DetailItem label="Package">
          {enquiry.packageName || "Not selected"}
        </DetailItem>

        <DetailItem label="Travel details">
          {enquiry.travelers || "Not provided"} traveler(s)
          <br />
          {enquiry.travelMonth || "Month not provided"}
        </DetailItem>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Customer message
        </p>

        <p className="mt-3 whitespace-pre-wrap text-gray-200">
          {enquiry.message || "No message provided."}
        </p>
      </div>

      <div className="mt-6">
        <label
          htmlFor={`notes-${enquiry.id}`}
          className="mb-2 block text-sm font-semibold text-gray-300"
        >
          Internal admin notes
        </label>

        <textarea
          id={`notes-${enquiry.id}`}
          rows="3"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add follow-up details, call notes or internal comments"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => onNotesSave(enquiry.id, notes)}
            disabled={updating}
            className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:opacity-60"
          >
            {updating ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </article>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function DetailItem({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <div className="mt-2 break-words text-gray-200">{children}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalizedStatus = String(status || "new").toLowerCase();

  const styles = {
    new: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    contacted: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    confirmed: "border-green-400/30 bg-green-400/10 text-green-300",
    closed: "border-gray-400/30 bg-gray-400/10 text-gray-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[normalizedStatus] || styles.new
      }`}
    >
      {capitalize(normalizedStatus)}
    </span>
  );
}

async function readJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "date unavailable";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(dateValue);
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function capitalize(value) {
  const text = String(value || "");

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeCsvValue(value) {
  const normalizedValue = String(value ?? "").replace(/"/g, '""');
  return `"${normalizedValue}"`;
}

export default AdminEnquiries;