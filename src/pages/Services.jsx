import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Sparkles,
  HeartPulse,
  Car,
  Shirt,
  PartyPopper,
  Wrench
} from "lucide-react";

const categories = [
  { key: "home", title: "Home Services", icon: <Home size={40} /> },
  { key: "cleaning", title: "Cleaning Services", icon: <Sparkles size={40} /> },
  { key: "beauty", title: "Beauty & Salon", icon: <Sparkles size={40} /> },
  { key: "healthcare", title: "Healthcare", icon: <HeartPulse size={40} /> },
  { key: "automobile", title: "Automobile Services", icon: <Car size={40} /> },
  { key: "laundry", title: "Laundry Services", icon: <Shirt size={40} /> },
  { key: "entertainment", title: "Entertainment", icon: <PartyPopper size={40} /> },
  { key: "repairs", title: "Repairs & Maintenance", icon: <Wrench size={40} /> }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          All Services in One Place
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Book trusted professionals for Home Services, Beauty, Healthcare,
          Automobile, Laundry and more — all from one app.
        </p>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.key}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
              onClick={() => navigate(`/services/${category.key}`)}
            >
              <div className="flex justify-center text-indigo-600 mb-4">
                {category.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {category.title}
              </h3>

              <button className="mt-3 text-indigo-600 hover:underline">
                View Services →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white text-center py-16">
        <h2 className="text-3xl font-bold">
          Need a Service Today?
        </h2>
        <p className="mt-3">
          Find verified professionals near you and book instantly.
        </p>

        <button className="mt-6 bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
          Book Now
        </button>
      </section>
    </div>
  );
};

export default Services;