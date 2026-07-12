const testimonials = [
  {
    name: "Sarah Johnson",
    role: "International Student",
    review:
      "LinguaVerse AI helped me translate study materials instantly. The speech and document translation features are amazing.",
  },
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The AI translation is incredibly accurate, and the Sign Language module makes this platform stand out from every other translator.",
  },
  {
    name: "Maria Lopez",
    role: "Content Creator",
    review:
      "I use LinguaVerse AI every day for multilingual content. It saves me hours of work.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-600 font-semibold">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Loved by Users Worldwide
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Thousands of people trust LinguaVerse AI every day.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((user, index) => (

            <div
              key={index}
              className="rounded-3xl bg-slate-50 p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-6 text-slate-600 italic">
                "{user.review}"
              </p>

              <div className="mt-8">

                <h4 className="font-bold text-lg">
                  {user.name}
                </h4>

                <p className="text-slate-500">
                  {user.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;