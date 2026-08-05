import {
  FileText,
  Target,
  BookOpen,
  Mic,
} from "lucide-react";

const features = [
  {
    title: "Resume Analyzer",
    desc: "Analyze and improve your ATS score.",
    icon: <FileText size={36} />,
  },
  {
    title: "Skill Gap Detection",
    desc: "Find missing skills from job descriptions.",
    icon: <Target size={36} />,
  },
  {
    title: "AI Learning",
    desc: "Study from PDFs, PPTs and Notes.",
    icon: <BookOpen size={36} />,
  },
  {
    title: "Interview Prep",
    desc: "Practice AI-generated interview questions.",
    icon: <Mic size={36} />,
  },
];

function Features() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
          Powerful AI Features
        </h2>

        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Everything you need to plan your career, improve your skills,
          and prepare for your dream job using AI.
        </p>

        {/* Cards */}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7 flex-grow">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;