import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

const providersData = {
  electrician: [
    {
      id: 1,
      name: "PowerFix Solutions",
      rating: 4.8,
      location: "2 km away",
      price: "₹299 onwards",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df2b"
    },
    {
      id: 2,
      name: "Quick Electric Works",
      rating: 4.6,
      location: "3.5 km away",
      price: "₹249 onwards",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
    }
  ],

  plumber: [
    {
      id: 3,
      name: "AquaFix Plumbing",
      rating: 4.7,
      location: "1.8 km away",
      price: "₹199 onwards",
      image: "https://images.unsplash.com/photo-1607478900766-efe13248b125"
    }
  ]
};

const ProvidersPage = () => {
  const { service } = useParams();
  const navigate = useNavigate();

  const providers = providersData[service] || [];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold capitalize">
          {service.replace("-", " ")} Providers
        </h1>
        <p className="mt-3">
          Choose from top-rated professionals near you.
        </p>
      </section>

      {/* Providers List */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {providers.length === 0 ? (
          <div className="text-center text-gray-500">
            No providers available for this service.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover hover:scale-110 transition"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">
                    {provider.name}
                  </h3>

                  <div className="flex justify-center items-center gap-1 mt-2 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm text-gray-700">
                      {provider.rating}
                    </span>
                  </div>

                  <div className="flex justify-center items-center gap-1 mt-2 text-gray-500 text-sm">
                    <MapPin size={14} />
                    {provider.location}
                  </div>

                  <p className="mt-2 font-semibold text-indigo-600">
                    {provider.price}
                  </p>

                  <button
                    onClick={() => navigate(`/book/${provider.id}`)}
                    className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Provider
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProvidersPage;