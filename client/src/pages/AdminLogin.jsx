import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (
      formData.username === adminUsername &&
      formData.password === adminPassword
    ) {
      localStorage.setItem("europeLuxeAdminAuth", "true");
      navigate("/admin/enquiries");
      return;
    }

    setErrorMessage("Invalid admin username or password.");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-4">
            Admin Access
          </p>

          <h1 className="text-5xl font-serif font-bold mb-4">
            Europe Luxe
          </h1>

          <p className="text-gray-400">
            Login to view customer enquiries and manage tour leads.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 text-red-300 px-5 py-4">
              {errorMessage}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Username
            </label>

            <input
              name="username"
              type="text"
              placeholder="Enter admin username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-[#0b1220] text-white border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#0b1220] text-white border border-white/10 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg hover:scale-105 transition duration-300"
          >
            Login
          </button>

          <div className="mt-6 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 p-4 text-yellow-200 text-sm">
            Local testing credentials:
            <br />
            Username: <span className="font-semibold">admin</span>
            <br />
            Password: <span className="font-semibold">admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
}