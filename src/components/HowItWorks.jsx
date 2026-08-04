import { FileText, Bot, Rocket } from "lucide-react";

function HowItWorks() {
  return (
    <section className="py-24 px-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-16">
        How It Works
      </h2>

      <div className="grid grid-cols-3 gap-10">

        {/* Step 1 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <div className="flex justify-center mb-5">
            <FileText size={50} className="text-blue-600" />
          </div>

          <h3 className="text-2xl font-semibold mb-3">
            Upload Resume
          </h3>

          <p className="text-gray-600">
            Upload your resume securely for AI analysis.
          </p>

        </div>

        {/* Step 2 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <div className="flex justify-center mb-5">
            <Bot size={50} className="text-green-600" />
          </div>

          <h3 className="text-2xl font-semibold mb-3">
            AI Analysis
          </h3>

          <p className="text-gray-600">
            AI finds skill gaps, ATS score, and career suggestions.
          </p>

        </div>

        {/* Step 3 */}
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <div className="flex justify-center mb-5">
            <Rocket size={50} className="text-orange-500" />
          </div>

          <h3 className="text-2xl font-semibold mb-3">
            Start Learning
          </h3>

          <p className="text-gray-600">
            Follow personalized roadmaps and improve your skills.
          </p>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;