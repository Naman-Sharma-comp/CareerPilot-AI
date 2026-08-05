import {
  FileText,
  Bot,
  Rocket,
} from "lucide-react";

const steps = [
  {
    title: "Upload Resume",
    icon: <FileText size={40} />,
    desc: "Upload your resume securely for AI-powered analysis.",
  },
  {
    title: "AI Analysis",
    icon: <Bot size={40} />,
    desc: "Get ATS score, career recommendations, and identify skill gaps.",
  },
  {
    title: "Start Learning",
    icon: <Rocket size={40} />,
    desc: "Follow a personalized AI roadmap and prepare for your dream career.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-gray-100 py-14 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
          How It Works
        </h2>

        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Three simple steps to unlock personalized career guidance powered by AI.
        </p>

        {/* Steps */}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                {step.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7 flex-grow">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;