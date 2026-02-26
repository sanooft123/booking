import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ServiceHub
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Your trusted platform for booking professional services nearby.
              Quality service providers at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="hover:text-white transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-white transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/provider-register" className="hover:text-white transition">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services?category=cleaning" className="hover:text-white transition">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services?category=plumbing" className="hover:text-white transition">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services?category=electrical" className="hover:text-white transition">
                  Electrical
                </Link>
              </li>
              <li>
                <Link to="/services?category=gardening" className="hover:text-white transition">
                  Gardening
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Connect With Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>

              <a
                href="#"
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>

              <a
                href="#"
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>

              <a
                href="#"
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ServiceHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
