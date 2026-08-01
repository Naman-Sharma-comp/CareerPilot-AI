function Features() {
  return (
    <section className="py-24 px-16 bg-white">

      <h2 className="text-4xl font-bold text-center mb-16">
        Powerful AI Features
      </h2>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">
            📄 Resume Analyzer
          </h3>
          <p>Analyze your resume and improve ATS score.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">
            🎯 Skill Gap Detection
          </h3>
          <p>Find missing skills from job descriptions.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">
            📚 AI Learning Assistant
          </h3>
          <p>Learn from PDFs, Notes, PPTs and Images.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">
            🎤 Interview Preparation
          </h3>
          <p>Practice AI-generated interview questions.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;