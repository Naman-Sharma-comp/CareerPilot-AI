function HowItWorks() {
  return (
    <section className="py-24 px-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-16">
        How It Works
      </h2>

      <div className="grid grid-cols-3 gap-10">

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-5">📄</div>
          <h3 className="text-2xl font-semibold mb-3">
            Upload Resume
          </h3>
          <p>
            Upload your resume securely for AI analysis.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-5">🤖</div>
          <h3 className="text-2xl font-semibold mb-3">
            AI Analysis
          </h3>
          <p>
            AI finds skill gaps, ATS score and career suggestions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <div className="text-5xl mb-5">🚀</div>
          <h3 className="text-2xl font-semibold mb-3">
            Start Learning
          </h3>
          <p>
            Follow personalized roadmaps and improve your skills.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;