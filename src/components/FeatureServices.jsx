import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin } from "lucide-react";

const featuredServices = [
  {
    id: 1,
    title: "Deep House Cleaning",
    provider: "CleanPro Services",
    description:
      "Professional deep cleaning service for your entire home. Includes all rooms, kitchen, and bathrooms.",
    price: 120,
    rating: 4.8,
    reviews: 156,
    distance: "1.2 km",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200",
  },
  {
    id: 2,
    title: "Emergency Plumbing",
    provider: "QuickFix Plumbers",
    description:
      "24/7 emergency plumbing services. Fixing leaks, unclogging drains, and pipe repairs.",
    price: 90,
    rating: 4.9,
    reviews: 203,
    distance: "0.8 km",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
  },
  {
    id: 3,
    title: "Electrical Installation",
    provider: "BrightSpark Electric",
    description:
      "Licensed electricians for all your electrical needs. Installation, repairs, and maintenance.",
    price: 85,
    rating: 4.7,
    reviews: 128,
    distance: "2.1 km",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200",
  },
];

export function FeaturedSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Services
          </h2>
          <p className="text-gray-600">
            Top-rated services in your area
          </p>
        </div>

        <Link
          to="/services"
          className="hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View All
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover"
              />

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full shadow text-sm font-semibold">
                ${service.price}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {service.title}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {service.provider}
              </p>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Rating + Distance */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>
                    {service.rating} ({service.reviews})
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{service.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="text-center mt-10 md:hidden">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View All Services
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

export default FeaturedSection;