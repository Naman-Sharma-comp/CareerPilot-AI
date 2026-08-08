import { FileText, Target, BookOpen, Mic } from "lucide-react";

const features = [
  {
    title: "Resume Analyzer",
    desc: "Analyze and improve your ATS score instantly with real-time feedback.",
    icon: FileText,
  },
  {
    title: "Skill Gap Detection",
    desc: "Identify critical missing skills directly from target job descriptions.",
    icon: Target,
  },
  {
    title: "AI Learning Assistant",
    desc: "Study directly from uploaded PDFs, PPTs, and structured notes.",
    icon: BookOpen,
  },
  {
    title: "Interview Prep",
    desc: "Practice realistic AI-generated interview questions and get scored.",
    icon: Mic,
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 dark:bg-slate-950 py-16 sm:py-20 lg:py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Powerful{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              AI Features
            </span>
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Everything you need to plan your career, improve your skills, and
            prepare for your dream job using cutting-edge AI.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-900/80 rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;