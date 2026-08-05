const faqs = [
  {
    question: "Is CareerPilot AI free?",
    answer: "Yes. Core features are completely free for students.",
  },
  {
    question: "Does AI analyze resumes?",
    answer:
      "Yes. CareerPilot AI provides ATS scores, resume feedback, and personalized improvement suggestions.",
  },
  {
    question: "Can I learn from PDFs and Notes?",
    answer:
      "Yes. Upload PDFs, Notes, PPTs, and Images to learn with AI-powered summaries, quizzes, and explanations.",
  },
];

function FAQ() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-20 lg:py-24">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Find answers to the most commonly asked questions about CareerPilot AI.
        </p>

        {/* FAQ Cards */}

        <div className="mt-12 space-y-6">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {faq.question}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
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