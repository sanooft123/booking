import React from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Home,
  Sparkles,
  HeartPulse,
  Car,
  Shirt,
  PartyPopper,
  Wrench,
  Dumbbell,
  Search
} from "lucide-react";
import FeaturedSection from "../components/FeatureServices";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const categories = [
  { key: "home", title: "Home Services", icon: <Home size={40} /> },
  { key: "fitness", title: "Fitness & Gym", icon: <Dumbbell size={40} /> },
  { key: "beauty", title: "Beauty & Salon", icon: <Sparkles size={40} /> },
  { key: "healthcare", title: "Healthcare", icon: <HeartPulse size={40} /> },
  { key: "automobile", title: "Automobile Services", icon: <Car size={40} /> },
  { key: "laundry", title: "Laundry Services", icon: <Shirt size={40} /> },
  { key: "entertainment", title: "Entertainment", icon: <PartyPopper size={40} /> },
  { key: "repairs", title: "Repairs & Maintenance", icon: <Wrench size={40} /> }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">



      {/* Hero Section */}
      <section className="text-center px-6 py-24 relative overflow-hidden">

        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Book Professional Services <br /> Near You
        </h1>

        <p className="mt-20 text-lg text-gray-600 max-w-2xl mx-auto">
          Find trusted local professionals for all your home service needs. Fast, reliable, and affordable.
        </p>
        {/* Search Bar */}
            <div className="bg-white rounded-xl p-2 flex flex-col border-1 sm:flex-row gap-2 shadow-xl mt-10 md:mx-40">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-2 outline-none text-gray-900"
                />
              </div>

              <Link
                // to={`/services${searchQuery ? `?q=${searchQuery}` : ""}`}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition text-center"
              >
                Search
              </Link>
            </div>

        {/* Floating Cards Effect */}
        <div className="mt-20 relative flex justify-center">

          <div className="absolute -left-20 rotate-[-10deg] bg-white shadow-xl rounded-2xl w-64 h-40 hidden md:block"></div>

          <div className="absolute left-10 rotate-[8deg] bg-white shadow-xl rounded-2xl w-64 h-40 hidden md:block"></div>

          <div className="bg-white shadow-2xl rounded-2xl w-72 h-44 z-10 flex items-center justify-center font-semibold text-gray-600">
            Service Providers Dashboard
          </div>

          <div className="absolute right-10 rotate-[-8deg] bg-white shadow-xl rounded-2xl w-64 h-40 hidden md:block"></div>

          <div className="absolute -right-20 rotate-[10deg] bg-white shadow-xl rounded-2xl w-64 h-40 hidden md:block"></div>

        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
         <h2 className="text-center justify-center text-3xl font-bold my-6">Popular Categories</h2>
         <p className="text-center justify-center text-md font-light my-6">Browse services by category</p>
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

      <div>
        <FeaturedSection/>
      </div>

      <div>
        <WhyChooseUs/>
      </div>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold">
          Need a Service Today?
        </h2>
        <p className="mt-3">
          Find verified professionals near you and book instantly.
        </p>

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
            Are You a Service Provider? Login Here
          </button>
        </div>
      </section>

      <div>
        <Footer/>
      </div>

    </div>
  );
};

export default HomePage;