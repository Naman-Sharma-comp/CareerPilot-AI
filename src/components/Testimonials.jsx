import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul",
    review:
      "CareerPilot AI helped me improve my resume and crack my internship.",
  },
  {
    name: "Priya",
    review:
      "The AI Learning Assistant saved me hours while studying and preparing for exams.",
  },
  {
    name: "Aman",
    review:
      "Interview preparation became much easier with AI feedback and personalized guidance.",
  },
];

function Testimonials() {
  return (
    <section className="bg-gray-100 py-14 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
          What Students Say
        </h2>

        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Thousands of students trust CareerPilot AI to accelerate their career journey.
        </p>

        {/* Cards */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >

              {/* Rating */}

              <div className="flex gap-1 text-yellow-500 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Review */}

              <p className="text-gray-600 leading-7 flex-grow">
                "{item.review}"
              </p>

              {/* User */}

              <div className="mt-6 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    CareerPilot AI User
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