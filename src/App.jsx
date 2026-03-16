import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Services from "./pages/Services";
import ProviderRegister from "./pages/ProviderRegister";
import ProviderLogin from "./pages/ProviderLogin";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerRegister from "./pages/CustomerRegister";
import CreateService from "./pages/CreateService";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import MyServices from "./pages/MyServices.jsx";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import Profile from "./pages/Profile.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProvidersPage from "./pages/ProvidersPage.jsx";
import HomePage from "./pages/Home.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import ConfirmBookingPage from "./pages/ConfirmBookingPage.jsx";
import ProviderManageBookings from "./pages/ProviderManageBookings.jsx";
import ProviderStaffManagement from "./pages/ProviderStaffManagement.jsx";
import ProviderShopSettings from "./pages/ProviderShopSettings.jsx";
import ProviderProfile from "./pages/ProviderProfile.jsx";
import Shops from "./pages/Shops.jsx";
import ShopServices from "./pages/ShopServices.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/provider-register" element={<ProviderRegister />} />
          <Route path="/provider-login" element={<ProviderLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/create-service/:id" element={<CreateService />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/manage-bookings" element={<ProviderManageBookings />} />
          <Route path="/manage-staff" element={<ProviderStaffManagement />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services/:category" element={<CategoryPage />} />
          <Route path="/services/:category/:service" element={<ProvidersPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/confirm-booking/:id" element={<ConfirmBookingPage />} />
          <Route path="/provider/manage-availability" element={<ProviderShopSettings />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/shops/:category" element={<Shops />} />
          <Route path="/shop-services/:shopId" element={<ShopServices />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff"
          }
        }}
      />

      <div className="flex">
        <ScrollToTop />
        <Sidebar />

        <main className="flex-1 bg-gray-100 min-h-screen mt-10">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;