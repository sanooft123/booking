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
import heroImg from "../assets/hero.svg";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-gray-50 px-6 py-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Book Professional <br />
              Services Near You
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Find trusted local professionals for all your home service needs.
              Fast, reliable, and affordable.
            </p>

            {/* SEARCH BAR */}
            <div className="bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-xl mt-8 max-w-xl">

              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="flex-1 py-2 outline-none text-gray-900"
                />
              </div>

              <Link
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition text-center"
              >
                Search
              </Link>
            </div>

          </div>

          {/* RIGHT SIDE CARTOON IMAGE */}
          <div className="relative flex justify-center">

            <img
              src={heroImg}
              alt="service illustration"
              className="w-[90%] max-w-md animate-float"
            />

            {/* FLOATING BADGES */}
            <div className="absolute top-10 left-0 bg-white px-4 py-2 rounded-xl shadow-md text-sm">
              ⭐ Trusted Services
            </div>

            <div className="absolute bottom-10 right-0 bg-white px-4 py-2 rounded-xl shadow-md text-sm">
              ⚡ Fast Booking
            </div>

          </div>
        </div>

        {/* DECORATIVE BLUR */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

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
              onClick={() => navigate(`/shops/${category.key}`)}
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

      {/* <div>
        <FeaturedSection/>
      </div> */}

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