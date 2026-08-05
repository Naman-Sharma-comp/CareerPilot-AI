import { useState } from "react";
import { Mic } from "lucide-react";

function Interview() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Interview Preparation
      </h1>

      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Practice AI-powered mock interviews for your dream job.
      </p>


      {/* Interview Setup Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 mt-6 sm:mt-10">

        <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
          Interview Setup
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

          {/* Role */}
          <div>

            <label className="font-semibold text-sm sm:text-base">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3 text-sm sm:text-base"
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


          {/* Difficulty */}
          <div>

            <label className="font-semibold text-sm sm:text-base">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3 text-sm sm:text-base"
            >
              <option value="">Choose Level</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

        </div>


        <button
          className="
          mt-6 sm:mt-8 
          bg-blue-600 
          text-white 
          px-6 sm:px-8 
          py-3 
          rounded-xl 
          hover:bg-blue-700 
          transition
          w-full sm:w-auto
          "
        >
          Start Interview
        </button>

      </div>



      {/* Interview Types */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-5 sm:gap-6 
        mt-6 sm:mt-10
      ">


        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 text-center">

          <Mic className="mx-auto w-10 h-10 sm:w-12 sm:h-12" />

          <h3 className="text-lg sm:text-xl font-semibold mt-4">
            Technical Round
          </h3>

        </div>



        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 text-center">

          <div className="text-4xl sm:text-5xl">
            💻
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mt-4">
            Coding Round
          </h3>

        </div>



        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 text-center">

          <div className="text-4xl sm:text-5xl">
            🤝
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mt-4">
            HR Round
          </h3>

        </div>


      </div>

    </div>
  );
}

export default Interview;