import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Sparkles,
  HeartPulse,
  Car,
  Shirt,
  PartyPopper,
  Wrench,
  Dumbbell
} from "lucide-react";

import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Offers from "../components/OfferSection";

const categories = [
  { key: "home", title: "Home Services", icon: <Home size={32} /> },
  { key: "fitness", title: "Fitness & Gym", icon: <Dumbbell size={32} /> },
  { key: "beauty", title: "Beauty & Salon", icon: <Sparkles size={32} /> },
  { key: "healthcare", title: "Healthcare", icon: <HeartPulse size={32} /> },
  { key: "automobile", title: "Automobile", icon: <Car size={32} /> },
  { key: "electrical", title: "Electrical Work", icon: <Wrench size={32} /> },
  { key: "plumbing", title: "Plumbing Work", icon: <Wrench size={32} /> },
  { key: "laundry", title: "Laundry", icon: <Shirt size={32} /> },
  { key: "entertainment", title: "Entertainment", icon: <PartyPopper size={32} /> },
  { key: "repairs", title: "Repairs", icon: <Wrench size={32} /> }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO WITH CATEGORIES */}
      <section className="px-6 py-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start mt-10">

          {/* LEFT */}
          <div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Home services at your doorstep
            </h1>

            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 mb-6">
              <input
                type="text"
                placeholder="Search for services..."
                className="bg-transparent outline-none w-full text-gray-700"
              />
            </div>

            {/* ✅ CATEGORIES GRID */}
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.key}
                  onClick={() => navigate(`/shops/${category.key}`)}
                  className="flex flex-col items-center justify-center bg-gray-50 border rounded-xl p-5 hover:shadow-md hover:bg-gray-100 hover:scale-105 cursor-pointer transition"
                >
                  <div className="text-indigo-600 mb-2">
                    {category.icon}
                  </div>

                  <p className="text-sm text-center font-medium text-gray-800">
                    {category.title}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="grid grid-cols-2 gap-4 mt-10">

            {/* Image 1 */}
            <img
              src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1"
              className="rounded-xl h-full object-cover"
              alt=""
            />

            {/* Image 2 */}
            <div >
              <img
              src="https://static.vecteezy.com/system/resources/thumbnails/071/837/068/small/technician-repairing-white-wall-mounted-air-conditioner-in-modern-indoor-setting-free-photo.jpg"
              className="rounded-xl mb-6  object-cover"
              alt=""
              />
              <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
              className="rounded-xl object-cover col-start-2 h-48 w-full"
              alt=""
            />
            </div>

          </div>

        </div>
      </section>




      {/* OFFERS */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Offers />
        </div>
      </div>


      {/* WHY CHOOSE US */}
      <WhyChooseUs />


      {/* CTA */}
      <section className="bg-indigo-700 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold">
          Need a Service Today?
        </h2>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Book Now
          </button>

          <button
            onClick={() => navigate("/provider-login")}
            className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Provider Login
          </button>
        </div>
      </section>


      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default HomePage;