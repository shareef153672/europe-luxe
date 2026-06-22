import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminEnquiries from "./pages/AdminEnquiries";
import Success from "./pages/Success";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("europeTourzAdminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function AdminLoginRoute() {
  const token = localStorage.getItem("europeTourzAdminToken");

  if (token) {
    return <Navigate to="/admin/enquiries" replace />;
  }

  return (
    <PageTransition>
      <AdminLogin />
    </PageTransition>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#070b14] pt-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/packages"
              element={
                <PageTransition>
                  <Packages />
                </PageTransition>
              }
            />

            <Route
              path="/package/:id"
              element={
                <PageTransition>
                  <PackageDetails />
                </PageTransition>
              }
            />

            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />

            <Route path="/admin/login" element={<AdminLoginRoute />} />

            <Route
              path="/admin/enquiries"
              element={
                <ProtectedAdminRoute>
                  <PageTransition>
                    <AdminEnquiries />
                  </PageTransition>
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/success"
              element={
                <PageTransition>
                  <Success />
                </PageTransition>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export default App;