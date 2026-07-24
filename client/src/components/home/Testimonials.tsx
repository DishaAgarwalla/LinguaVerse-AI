import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "International Student",
    review:
      "LinguaVerse AI helped me translate study materials instantly. The speech and document translation features are amazing.",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The AI translation is incredibly accurate, and the Sign Language module makes this platform stand out from every other translator.",
    avatar: "RS",
    rating: 5,
  },
  {
    name: "Maria Lopez",
    role: "Content Creator",
    review:
      "I use LinguaVerse AI every day for multilingual content. It saves me hours of work.",
    avatar: "ML",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            ⭐ Testimonials
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Loved by <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Users Worldwide</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Thousands of people trust LinguaVerse AI every day.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((user, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg shadow-gray-100/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-100/50 hover:border-blue-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-blue-100 group-hover:text-blue-200 transition-colors duration-300" />

              {/* Rating */}
              <div className="flex gap-1 text-yellow-400 text-lg">
                {[...Array(user.rating)].map((_, i) => (
                  <FaStar key={i} className="group-hover:scale-110 transition-transform" />
                ))}
              </div>

              <p className="mt-6 text-gray-600 italic leading-relaxed">
                "{user.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                  {user.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {user.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* Decorative dot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;