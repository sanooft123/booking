import { useState } from "react";
import { Search, SlidersHorizontal, Star, MapPin } from "lucide-react";
import Footer from "../components/Footer";

const servicesData = [
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
    category: "cleaning",
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
    category: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
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
    category: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
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
    category: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
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
    category: "plumbing",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
  },
];

export default function Services() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "cleaning", name: "Cleaning", count: 45 },
    { id: "plumbing", name: "Plumbing", count: 32 },
    { id: "electrical", name: "Electrical", count: 28 },
    { id: "gardening", name: "Gardening", count: 19 },
    { id: "carpentry", name: "Carpentry", count: 24 },
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Browse Services
          </h1>
          <p className="text-gray-600 mt-2">
            Showing {filteredServices.length} services
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center flex-1 bg-gray-50 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-100 transition">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Categories</h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer transition ${
                    selectedCategory === category.id
                      ? "bg-indigo-100 text-indigo-600 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span>{category.name}</span>
                  {category.count && (
                    <span className="text-sm text-gray-500">
                      {category.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* Services Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full shadow text-sm font-semibold">
                    ${service.price}
                  </div>
                </div>

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

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {service.rating} ({service.reviews})
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {service.distance}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  );
}