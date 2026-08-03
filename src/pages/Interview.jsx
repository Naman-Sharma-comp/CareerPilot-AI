import { useState } from "react";

function Interview() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        Interview Preparation
      </h1>

      <p className="text-gray-500 mt-2">
        Practice AI-powered mock interviews for your dream job.
      </p>

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-semibold mb-6">
          Interview Setup
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option value="">Choose Role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Software Engineer</option>
              <option>AI/ML Engineer</option>
              <option>Data Scientist</option>
            </select>

          </div>

          <div>

            <label className="font-semibold">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option value="">Choose Level</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>

        <button
          className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Start Interview
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-5xl">🎤</div>
          <h3 className="text-xl font-semibold mt-4">
            Technical Round
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-5xl">💻</div>
          <h3 className="text-xl font-semibold mt-4">
            Coding Round
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-5xl">🤝</div>
          <h3 className="text-xl font-semibold mt-4">
            HR Round
          </h3>
        </div>

      </div>

    </div>
  );
}

export default Interview;