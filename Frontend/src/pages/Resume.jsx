import { useState } from "react";
import { FileText, UploadCloud, Trash2, CheckCircle, Sparkles } from "lucide-react";

function Resume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const startAnalysis = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-8 fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Resume Analyzer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
          Upload your resume to generate an instant AI-powered ATS evaluation report.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="border-2 border-dashed border-blue-300 dark:border-blue-900/60 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center transition-all bg-blue-50/30 dark:bg-slate-950/40">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UploadCloud size={32} />
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Drag & Drop Resume
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Supports PDF or DOCX (Max 5 MB)
          </p>

          <label
            htmlFor="resume-input"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-blue-500/20 transition hover:scale-105 active:scale-95"
          >
            Choose Document
          </label>
          <input
            id="resume-input"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Selected File Card */}
      {selectedFile && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 fade">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <FileText size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {selectedFile.name}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={removeFile}
            className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition"
            aria-label="Remove File"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      {/* Action Button */}
      <div>
        <button
          onClick={startAnalysis}
          disabled={!selectedFile || isAnalyzing}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 ${
            selectedFile
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 hover:scale-105 active:scale-95"
              : "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
          }`}
        >
          {isAnalyzing ? (
            <>Evaluating Resume...</>
          ) : (
            <>
              <Sparkles size={16} /> Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Resume;