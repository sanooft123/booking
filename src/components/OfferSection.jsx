import React from "react";

const offers = [
  {
    title: "Sofa deep cleaning",
    subtitle: "starting at ₹569",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200",
    overlay: "bg-black/40",
    textColor: "text-white",
  },
  {
    title: "Home painting & waterproofing",
    subtitle: "Pay after 100% satisfaction",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200",
    overlay: "",
    textColor: "text-black",
  },
  {
    title: "Relax & rejuvenate at home",
    subtitle: "Massage for men",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200",
    overlay: "bg-lime-700/80",
    textColor: "text-white",
  },
];

const Offers = () => {
  return (
    <div className="py-6 sm:py-10">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
        Offers & discounts
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] rounded-2xl overflow-hidden shadow-md flex items-center"
          >
            {/* Image */}
            <img
              src={offer.image}
              alt="offer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            {offer.overlay && (
              <div className={`absolute inset-0 ${offer.overlay}`} />
            )}

            {/* Content */}
            <div
              className={`relative z-10 p-4 sm:p-6 max-w-[75%] sm:max-w-[65%] ${offer.textColor}`}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold leading-snug">
                {offer.title}
              </h3>

              <p className="mt-1 text-xs sm:text-sm opacity-90">
                {offer.subtitle}
              </p>

              <button className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-white text-black rounded-lg font-medium hover:scale-105 transition">
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;