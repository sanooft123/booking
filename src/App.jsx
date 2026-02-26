import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-services" element={<MyServices />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services/:category" element={<CategoryPage />} />
          <Route path="/services/:category/:service" element={<ProvidersPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 min-h-screen mt-10">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;