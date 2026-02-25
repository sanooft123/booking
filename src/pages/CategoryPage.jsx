import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Search } from "lucide-react";

const servicesData = {
  home: {
    title: "Home Services",
    services: [
      {
        id: 1,
        name: "Electrician",
        description: "Wiring, switch repair & installation",
        price: "₹299 onwards",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
      },
      {
        id: 2,
        name: "Plumber",
        description: "Leak fixing & bathroom fittings",
        price: "₹249 onwards",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125"
      },
      {
        id: 3,
        name: "AC Repair",
        description: "AC service & gas refill",
        price: "₹499 onwards",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a"
      }
    ]
  },

  beauty: {
    title: "Beauty & Salon",
    services: [
      {
        id: 1,
        name: "Salon at Home",
        description: "Facial, cleanup & hair care",
        price: "₹799 onwards",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"
      },
      {
        id: 2,
        name: "Bridal Makeup",
        description: "Professional bridal packages",
        price: "₹4999 onwards",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
      }
    ]
  }
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const categoryData = servicesData[category];

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  const filteredServices = categoryData.services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          {categoryData.title}
        </h1>
        <p className="mt-3 text-lg">
          Book trusted professionals near you.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <p className="text-gray-500 mb-6 text-sm">
          Home / Services / <span className="capitalize">{category}</span>
        </p>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">
                  {service.name}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {service.description}
                </p>

                {/* Rating */}
                <div className="flex justify-center items-center gap-1 mt-3 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-gray-700">
                    {service.rating}
                  </span>
                </div>

                <p className="mt-2 font-semibold text-indigo-600">
                  {service.price}
                </p>

                <button
                  onClick={() =>
                    navigate(`/services/${category}/${service.name.toLowerCase().replace(/\s+/g, "-")}`)
                    }
                  className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-700 text-white text-center py-16 mt-16">
        <h2 className="text-3xl font-bold">
          Need Assistance?
        </h2>
        <p className="mt-3">
          Our support team is available 24/7.
        </p>

        <button className="mt-6 bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default CategoryPage;