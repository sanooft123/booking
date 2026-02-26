import { Shield, Clock, Award } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Bookify?
          </h2>
          <p className="text-lg text-gray-600">
            We make it easy to find and book quality services
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          {/* Feature 1 */}
          <div>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-indigo-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Verified Professionals
            </h3>

            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              All service providers are background-checked and verified for
              your safety and peace of mind.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-indigo-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Fast Booking
            </h3>

            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              Book services in minutes and get same-day or scheduled
              appointments with real-time availability.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-indigo-600" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Quality Guaranteed
            </h3>

            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              100% satisfaction guarantee or your money back. We ensure
              quality service every time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;