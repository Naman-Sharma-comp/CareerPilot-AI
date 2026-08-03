import { useState } from "react";

function Resume() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        Resume Analyzer
      </h1>

      <p className="text-gray-500 mt-2">
        Upload your resume to begin AI-powered analysis.
      </p>

      {/* Upload Box */}

      <div className="mt-10 bg-white rounded-3xl shadow-lg p-10">

        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-16 text-center hover:border-blue-600 transition">

          <div className="text-7xl">
            📄
          </div>

          <h2 className="text-3xl font-bold mt-5">
            Drag & Drop Resume
          </h2>

          <p className="text-gray-500 mt-3">
            PDF or DOCX (Max 5 MB)
          </p>

          <label
            htmlFor="resume"
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition"
          >
            Choose File
          </label>

          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

        </div>

      </div>

      {/* Selected File */}

      {selectedFile && (

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-5">
            Selected File
          </h2>

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                {selectedFile.name}
              </h3>

              <p className="text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

            <button
              onClick={removeFile}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>

          </div>

        </div>

      )}

      {/* Analyze Button */}

      <div className="mt-8">

        <button
          disabled={!selectedFile}
          className={`px-10 py-4 rounded-xl text-white font-semibold transition ${
            selectedFile
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Analyze Resume
        </button>

      </div>

    </div>
  );
}

export default Resume;