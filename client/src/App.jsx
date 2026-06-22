import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CancellationPolicy from "./pages/CancellationPolicy";
import PaymentPolicy from "./pages/PaymentPolicy";

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
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            <Route
              path="/faq"
              element={
                <PageTransition>
                  <FAQ />
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

            <Route
              path="/privacy-policy"
              element={
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              }
            />

            <Route
              path="/terms"
              element={
                <PageTransition>
                  <Terms />
                </PageTransition>
              }
            />

            <Route
              path="/cancellation-policy"
              element={
                <PageTransition>
                  <CancellationPolicy />
                </PageTransition>
              }
            />

            <Route
              path="/payment-policy"
              element={
                <PageTransition>
                  <PaymentPolicy />
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