function FAQ() {
  return (
    <section className="py-24 px-16">

      <h2 className="text-4xl font-bold text-center mb-16">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">

        <div className="border rounded-xl p-6">
          <h3 className="font-bold">
            Is CareerPilot AI free?
          </h3>
          <p className="mt-3">
            Yes. Core features are free for students.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold">
            Does AI analyze resumes?
          </h3>
          <p className="mt-3">
            Yes, it provides ATS score and improvement suggestions.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h3 className="font-bold">
            Can I learn from PDFs?
          </h3>
          <p className="mt-3">
            Yes. Upload PDFs, notes, PPTs and images to learn with AI.
          </p>
        </div>

      </div>

    </section>
  );
}

export default FAQ;