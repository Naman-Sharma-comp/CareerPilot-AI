const faqs = [
  {
    question: "Is CareerPilot AI free to use?",
    answer:
      "Yes! Core features including resume analysis and AI study tools are completely free for students.",
  },
  {
    question: "How accurate is the AI Resume Analysis?",
    answer:
      "Our AI measures your resume against real-world ATS screening rules, giving you action-oriented advice to boost your match score.",
  },
  {
    question: "Can I upload custom study documents?",
    answer:
      "Yes. You can upload PDFs, PPTs, notes, and text files to generate instant summaries, interactive quizzes, and clear key-point breakdowns.",
  },
];

function FAQ() {
  return (
    <section className="bg-white dark:bg-slate-900/50 py-16 sm:py-20 lg:py-24 transition-colors duration-300 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Find quick answers to common questions about CareerPilot AI.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                {faq.question}
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;