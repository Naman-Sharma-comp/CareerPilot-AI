import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Computer Science Student",
    review:
      "CareerPilot AI helped me overhaul my resume completely and land my dream summer internship.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer Aspirant",
    review:
      "The AI Learning Assistant saved me dozens of hours while summarizing heavy PDF documentation.",
  },
  {
    name: "Aman Verma",
    role: "Data Analyst Trainee",
    review:
      "Mock interview prep with real-time AI feedback built my confidence before actual interviews.",
  },
];

function Testimonials() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-16 sm:py-20 lg:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Students Say
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Thousands of students trust CareerPilot AI to accelerate their career
            journey.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic text-sm sm:text-base">
                  "{item.review}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/20">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;