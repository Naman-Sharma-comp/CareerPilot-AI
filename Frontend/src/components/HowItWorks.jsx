import { FileText, Bot, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Upload Resume",
    icon: FileText,
    desc: "Upload your resume securely for deep AI-powered section-by-section analysis.",
  },
  {
    step: "02",
    title: "AI Analysis",
    icon: Bot,
    desc: "Receive instant ATS scores, career recommendations, and gap detection.",
  },
  {
    step: "03",
    title: "Start Learning",
    icon: Rocket,
    desc: "Follow a tailored AI roadmap to master missing skills and land interviews.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-slate-100/70 dark:bg-slate-900/40 py-16 sm:py-20 lg:py-24 transition-colors duration-300 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Three simple steps to unlock personalized career guidance powered by
            AI.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="absolute top-4 right-6 text-4xl font-extrabold text-slate-100 dark:text-slate-800/80 select-none group-hover:text-blue-500/10 transition-colors">
                  {item.step}
                </div>

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
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

export default HowItWorks;