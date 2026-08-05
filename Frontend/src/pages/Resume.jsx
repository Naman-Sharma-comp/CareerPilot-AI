import { useState } from "react";
import {
  FileText,
  UploadCloud,
  Trash2,
} from "lucide-react";

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
    <div className="min-h-screen">

      {/* Heading */}

      <div>

        <h1 className="text-3xl sm:text-4xl font-bold">
          Resume Analyzer
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Upload your resume and receive an AI-powered ATS analysis.
        </p>

      </div>

      {/* Upload Box */}

      <div className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 p-5 sm:p-8">

        <div className="border-2 border-dashed border-blue-300 hover:border-blue-600 rounded-3xl transition-all duration-300 text-center py-12 sm:py-16 px-5">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

              <UploadCloud
                size={45}
                className="text-blue-600"
              />

            </div>

          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-6">
            Drag & Drop Resume
          </h2>

          <p className="text-gray-500 mt-3">
            PDF or DOCX (Maximum 5 MB)
          </p>

          <label
            htmlFor="resume"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
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

        <div className="mt-8 bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

          <h2 className="text-xl sm:text-2xl font-bold mb-5">
            Selected File
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="bg-blue-100 rounded-xl p-3">

                <FileText
                  className="text-blue-600"
                  size={30}
                />

              </div>

              <div>

                <h3 className="font-semibold break-all">
                  {selectedFile.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

            <button
              onClick={removeFile}
              className="flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-5 py-3 rounded-xl transition"
            >
              <Trash2 size={18} />
              Remove
            </button>

          </div>

        </div>

      )}

      {/* Analyze Button */}

      <div className="mt-8">

        <button
          disabled={!selectedFile}
          className={`w-full sm:w-auto px-10 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
            selectedFile
              ? "bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg"
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



