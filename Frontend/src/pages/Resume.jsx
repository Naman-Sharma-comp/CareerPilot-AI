import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FileText,
  UploadCloud,
  Trash2,
  CheckCircle,
  Upload,
  Eye,
  Download,
  LoaderCircle,
  History,
  ChevronDown,
  ChevronUp,
  Clock3,
  Star,
} from "lucide-react";

import {
  uploadResume,
  getResumes,
  replaceResume,
  deleteResume,
  downloadResume,
  getResumeHistory,
  viewResume,
  viewResumeVersion,
  setPrimaryResume,
} from "../api/resume";

function Resume() {
  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [
    resumes,
    setResumes,
  ] = useState([]);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    loadingResumes,
    setLoadingResumes,
  ] = useState(true);

  const [
    deletingId,
    setDeletingId,
  ] = useState(null);

  const [
    replacingId,
    setReplacingId,
  ] = useState(null);

  const [
    settingPrimaryId,
    setSettingPrimaryId,
  ] = useState(null);

  const [
    resumeToReplace,
    setResumeToReplace,
  ] = useState(null);

  const [
    openHistoryId,
    setOpenHistoryId,
  ] = useState(null);

  const [
    historyLoadingId,
    setHistoryLoadingId,
  ] = useState(null);

  const [
    historyByResume,
    setHistoryByResume,
  ] = useState({});

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const fileInputRef =
    useRef(null);

  const replaceInputRef =
    useRef(null);

  // ==========================
  // LOAD USER RESUMES
  // ==========================
  const fetchResumes = async () => {
    try {
      setLoadingResumes(true);
      setError("");

      const response =
        await getResumes();

      setResumes(
        response.data || []
      );
    } catch (err) {
      console.error(
        "Fetch Resumes Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load your resumes."
      );
    } finally {
      setLoadingResumes(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ==========================
  // SELECT NEW RESUME
  // ==========================
  const handleFileChange = (e) => {
    const file =
      e.target.files?.[0];

    setError("");
    setSuccess("");

    if (!file) {
      return;
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      setSelectedFile(null);

      setError(
        "Only PDF resumes are currently supported."
      );

      e.target.value = "";

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setSelectedFile(null);

      setError(
        "Resume must be smaller than 5 MB."
      );

      e.target.value = "";

      return;
    }

    setSelectedFile(file);
  };

  // ==========================
  // REMOVE SELECTED FILE
  // ==========================
  const removeFile = () => {
    setSelectedFile(null);

    setError("");
    setSuccess("");

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  // ==========================
  // UPLOAD NEW RESUME
  // ==========================
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const response =
        await uploadResume(
          selectedFile
        );

      setSuccess(
        response.message ||
          "Resume uploaded successfully."
      );

      setSelectedFile(null);

      if (
        fileInputRef.current
      ) {
        fileInputRef.current.value =
          "";
      }

      await fetchResumes();
    } catch (err) {
      console.error(
        "Resume Upload Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Resume upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================
  // SET PRIMARY RESUME
  // ==========================
  const handleSetPrimary =
    async (resumeId) => {
      try {
        setSettingPrimaryId(
          resumeId
        );

        setError("");
        setSuccess("");

        const response =
          await setPrimaryResume(
            resumeId
          );

        setSuccess(
          response.message ||
            "Primary resume updated successfully."
        );

        await fetchResumes();
      } catch (err) {
        console.error(
          "Set Primary Resume Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to set primary resume."
        );
      } finally {
        setSettingPrimaryId(null);
      }
    };

  // ==========================
  // START REPLACE RESUME
  // ==========================
  const startReplaceResume = (
    resume
  ) => {
    setError("");
    setSuccess("");

    setResumeToReplace(
      resume
    );

    if (
      replaceInputRef.current
    ) {
      replaceInputRef.current.value =
        "";

      replaceInputRef.current.click();
    }
  };

  // ==========================
  // REPLACE RESUME
  // ==========================
  const handleReplaceFile =
    async (e) => {
      const file =
        e.target.files?.[0];

      if (
        !file ||
        !resumeToReplace
      ) {
        return;
      }

      setError("");
      setSuccess("");

      if (
        file.type !==
        "application/pdf"
      ) {
        setError(
          "Only PDF resumes are currently supported."
        );

        e.target.value = "";
        setResumeToReplace(null);

        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        setError(
          "Resume must be smaller than 5 MB."
        );

        e.target.value = "";
        setResumeToReplace(null);

        return;
      }

      const resumeId =
        resumeToReplace.id;

      try {
        setReplacingId(
          resumeId
        );

        const response =
          await replaceResume(
            resumeId,
            file
          );

        setSuccess(
          response.message ||
            "Resume replaced successfully."
        );

        setHistoryByResume(
          (currentHistory) => {
            const updatedHistory = {
              ...currentHistory,
            };

            delete updatedHistory[
              resumeId
            ];

            return updatedHistory;
          }
        );

        setOpenHistoryId(null);

        await fetchResumes();
      } catch (err) {
        console.error(
          "Replace Resume Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to replace resume."
        );
      } finally {
        setReplacingId(null);
        setResumeToReplace(null);

        if (
          replaceInputRef.current
        ) {
          replaceInputRef.current.value =
            "";
        }
      }
    };

  // ==========================
  // DELETE RESUME
  // ==========================
  const handleDeleteResume =
    async (resumeId) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this resume and its complete history?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingId(
          resumeId
        );

        setError("");
        setSuccess("");

        const response =
          await deleteResume(
            resumeId
          );

        setHistoryByResume(
          (currentHistory) => {
            const updatedHistory = {
              ...currentHistory,
            };

            delete updatedHistory[
              resumeId
            ];

            return updatedHistory;
          }
        );

        if (
          openHistoryId ===
          resumeId
        ) {
          setOpenHistoryId(null);
        }

        setSuccess(
          response.message ||
            "Resume deleted successfully."
        );

        // Refresh because if the deleted
        // resume was primary, backend may
        // automatically choose a new one.
        await fetchResumes();
      } catch (err) {
        console.error(
          "Delete Resume Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to delete resume."
        );
      } finally {
        setDeletingId(null);
      }
    };

  // ==========================
  // OPEN PDF BLOB
  // ==========================
  const openPdfBlob = (
    response
  ) => {
    const blob = new Blob(
      [response.data],
      {
        type:
          response.headers[
            "content-type"
          ] ||
          "application/pdf",
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    setTimeout(() => {
      window.URL.revokeObjectURL(
        url
      );
    }, 60000);
  };

  // ==========================
  // VIEW CURRENT RESUME
  // ==========================
  const handleViewResume =
    async (resumeId) => {
      try {
        setError("");

        const response =
          await viewResume(
            resumeId
          );

        openPdfBlob(
          response
        );
      } catch (err) {
        console.error(
          "View Resume Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to view resume."
        );
      }
    };

  // ==========================
  // VIEW HISTORY VERSION
  // ==========================
  const handleViewResumeVersion =
    async (
      resumeId,
      versionId
    ) => {
      try {
        setError("");

        const response =
          await viewResumeVersion(
            resumeId,
            versionId
          );

        openPdfBlob(
          response
        );
      } catch (err) {
        console.error(
          "View Resume Version Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to view resume version."
        );
      }
    };

  // ==========================
  // DOWNLOAD CURRENT RESUME
  // ==========================
  const handleDownloadResume =
    async (
      resumeId,
      fileName
    ) => {
      try {
        setError("");

        const response =
          await downloadResume(
            resumeId
          );

        const url =
          window.URL.createObjectURL(
            new Blob([
              response.data,
            ])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;
        link.download =
          fileName;

        document.body.appendChild(
          link
        );

        link.click();
        link.remove();

        window.URL.revokeObjectURL(
          url
        );
      } catch (err) {
        console.error(
          "Download Resume Error:",
          err
        );

        setError(
          "Unable to download resume."
        );
      }
    };

  // ==========================
  // LOAD / TOGGLE HISTORY
  // ==========================
  const handleToggleHistory =
    async (resumeId) => {
      if (
        openHistoryId ===
        resumeId
      ) {
        setOpenHistoryId(null);
        return;
      }

      setOpenHistoryId(
        resumeId
      );

      if (
        historyByResume[
          resumeId
        ]
      ) {
        return;
      }

      try {
        setHistoryLoadingId(
          resumeId
        );

        setError("");

        const response =
          await getResumeHistory(
            resumeId
          );

        setHistoryByResume(
          (currentHistory) => ({
            ...currentHistory,

            [resumeId]:
              response.data || [],
          })
        );
      } catch (err) {
        console.error(
          "Resume History Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load resume history."
        );

        setOpenHistoryId(null);
      } finally {
        setHistoryLoadingId(null);
      }
    };

  return (
    <div className="space-y-6">

      {/* Hidden Replace Input */}
      <input
        ref={replaceInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={
          handleReplaceFile
        }
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Resume Analyzer
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload, manage and track
          previous versions of your resume.
          Your primary resume will be used
          as the default resume across
          CareerPilot AI.
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
          <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-center gap-2">

          <CheckCircle
            size={16}
            className="text-emerald-600 dark:text-emerald-400"
          />

          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {success}
          </p>

        </div>
      )}

      {/* Upload Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">

        <div className="border-2 border-dashed border-blue-300 dark:border-blue-900/60 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center transition-all bg-blue-50/30 dark:bg-slate-950/40">

          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-sm">

            <UploadCloud
              size={32}
            />

          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Upload Your Resume
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            PDF only • Maximum 5 MB
          </p>

          <label
            htmlFor="resume-input"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-blue-500/20 transition hover:scale-105 active:scale-95"
          >
            <Upload
              size={16}
            />

            Choose Resume
          </label>

          <input
            ref={fileInputRef}
            id="resume-input"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={
              handleFileChange
            }
          />

        </div>
      </div>

      {/* Selected File */}
      {selectedFile && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3.5 min-w-0">

              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">

                <FileText
                  size={24}
                />

              </div>

              <div className="min-w-0">

                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {selectedFile.name}
                </p>

                <p className="text-[11px] text-slate-400 mt-0.5">
                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={
                  removeFile
                }
                disabled={
                  uploading
                }
                className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition disabled:opacity-50"
              >
                <Trash2
                  size={18}
                />
              </button>

              <button
                type="button"
                onClick={
                  handleUpload
                }
                disabled={
                  uploading
                }
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
              >

                {uploading ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />

                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload
                      size={16}
                    />

                    Upload Resume
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

      {/* Uploaded Resumes */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Uploaded Resumes
            </h2>

            <p className="text-[11px] text-slate-400 mt-1">
              Choose which resume should
              be your default primary
              resume.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
            {resumes.length}
          </div>

        </div>

        {loadingResumes && (
          <div className="flex items-center justify-center gap-2 py-10 text-slate-400">

            <LoaderCircle
              size={18}
              className="animate-spin"
            />

            <span className="text-xs font-semibold">
              Loading resumes...
            </span>

          </div>
        )}

        {!loadingResumes &&
          resumes.length ===
            0 && (
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">

              <FileText
                size={30}
                className="mx-auto text-slate-300 dark:text-slate-600"
              />

              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3">
                No resumes uploaded yet
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Upload your first PDF
                resume above.
              </p>

            </div>
          )}

        {!loadingResumes &&
          resumes.length >
            0 && (
            <div className="space-y-4">

              {resumes.map(
                (resume) => (
                  <div
                    key={
                      resume.id
                    }
                    className={`rounded-2xl overflow-hidden border transition ${
                      resume.isPrimary
                        ? "bg-amber-50/50 dark:bg-amber-500/5 border-amber-300 dark:border-amber-500/30"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80"
                    }`}
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">

                      <div className="flex items-center gap-3 min-w-0">

                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            resume.isPrimary
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          }`}
                        >

                          {resume.isPrimary ? (
                            <Star
                              size={21}
                              fill="currentColor"
                            />
                          ) : (
                            <FileText
                              size={21}
                            />
                          )}

                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {
                                resume.fileName
                              }
                            </p>

                            {resume.isPrimary && (
                              <span className="shrink-0 inline-flex items-center gap-1 text-[9px] uppercase tracking-wide font-black px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20">

                                <Star
                                  size={9}
                                  fill="currentColor"
                                />

                                Primary

                              </span>
                            )}

                            <span className="shrink-0 text-[9px] uppercase tracking-wide font-black px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                              Current
                            </span>

                          </div>

                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Uploaded{" "}
                            {new Date(
                              resume.createdAt
                            ).toLocaleDateString()}
                          </p>

                          {resume.updatedAt !==
                            resume.createdAt && (
                            <p className="text-[10px] text-amber-500 mt-0.5">
                              Last replaced{" "}
                              {new Date(
                                resume.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          )}

                          {resume.isPrimary && (
                            <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold">
                              Default resume for
                              CareerPilot AI
                            </p>
                          )}

                        </div>

                      </div>

                      <div className="flex flex-wrap items-center gap-2">

                        {!resume.isPrimary && (
                          <button
                            type="button"
                            onClick={() =>
                              handleSetPrimary(
                                resume.id
                              )
                            }
                            disabled={
                              settingPrimaryId !==
                                null ||
                              deletingId ===
                                resume.id ||
                              replacingId ===
                                resume.id
                            }
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >

                            {settingPrimaryId ===
                            resume.id ? (
                              <LoaderCircle
                                size={15}
                                className="animate-spin"
                              />
                            ) : (
                              <Star
                                size={15}
                              />
                            )}

                            {settingPrimaryId ===
                            resume.id
                              ? "Setting..."
                              : "Set as Primary"}

                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleViewResume(
                              resume.id
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition"
                        >
                          <Eye
                            size={15}
                          />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadResume(
                              resume.id,
                              resume.fileName
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition"
                        >
                          <Download
                            size={15}
                          />
                          Download
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleHistory(
                              resume.id
                            )
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 transition"
                        >

                          {historyLoadingId ===
                          resume.id ? (
                            <LoaderCircle
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <History
                              size={15}
                            />
                          )}

                          History

                          {openHistoryId ===
                          resume.id ? (
                            <ChevronUp
                              size={14}
                            />
                          ) : (
                            <ChevronDown
                              size={14}
                            />
                          )}

                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            startReplaceResume(
                              resume
                            )
                          }
                          disabled={
                            replacingId ===
                              resume.id ||
                            deletingId ===
                              resume.id ||
                            settingPrimaryId !==
                              null
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition disabled:opacity-50"
                        >

                          {replacingId ===
                          resume.id ? (
                            <LoaderCircle
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Upload
                              size={15}
                            />
                          )}

                          {replacingId ===
                          resume.id
                            ? "Replacing..."
                            : "Replace"}

                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteResume(
                              resume.id
                            )
                          }
                          disabled={
                            deletingId ===
                              resume.id ||
                            replacingId ===
                              resume.id ||
                            settingPrimaryId !==
                              null
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition disabled:opacity-50"
                        >

                          {deletingId ===
                          resume.id ? (
                            <LoaderCircle
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={15}
                            />
                          )}

                          {deletingId ===
                          resume.id
                            ? "Deleting..."
                            : "Delete"}

                        </button>

                      </div>

                    </div>

                    {openHistoryId ===
                      resume.id && (
                      <div className="border-t border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-4">

                        <div className="flex items-center gap-2 mb-3">

                          <History
                            size={16}
                            className="text-violet-500"
                          />

                          <h3 className="text-xs font-black text-slate-700 dark:text-slate-200">
                            Previous Versions
                          </h3>

                          <span className="text-[10px] font-bold text-slate-400">
                            (
                            {
                              historyByResume[
                                resume.id
                              ]?.length ||
                              0
                            }
                            )
                          </span>

                        </div>

                        {historyLoadingId ===
                        resume.id ? (
                          <div className="flex items-center gap-2 py-4 text-slate-400">

                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />

                            <span className="text-xs">
                              Loading history...
                            </span>

                          </div>
                        ) : historyByResume[
                            resume.id
                          ]?.length >
                          0 ? (
                          <div className="space-y-2">

                            {historyByResume[
                              resume.id
                            ].map(
                              (
                                version,
                                index
                              ) => (
                                <div
                                  key={
                                    version.id
                                  }
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3"
                                >

                                  <div className="flex items-center gap-3 min-w-0">

                                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">

                                      <Clock3
                                        size={17}
                                      />

                                    </div>

                                    <div className="min-w-0">

                                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                                        {
                                          version.fileName
                                        }
                                      </p>

                                      <p className="text-[10px] text-slate-400 mt-0.5">
                                        Version{" "}
                                        {historyByResume[
                                          resume.id
                                        ].length -
                                          index}
                                        {" • "}
                                        {new Date(
                                          version.createdAt
                                        ).toLocaleString()}
                                      </p>

                                    </div>

                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleViewResumeVersion(
                                        resume.id,
                                        version.id
                                      )
                                    }
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 transition"
                                  >
                                    <Eye
                                      size={14}
                                    />
                                    View
                                  </button>

                                </div>
                              )
                            )}

                          </div>
                        ) : (
                          <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">

                            <History
                              size={24}
                              className="mx-auto text-slate-300 dark:text-slate-600"
                            />

                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
                              No previous versions
                            </p>

                            <p className="text-[10px] text-slate-400 mt-1">
                              Previous versions
                              will appear after you
                              replace this resume.
                            </p>

                          </div>
                        )}

                      </div>
                    )}

                  </div>
                )
              )}

            </div>
          )}

      </div>

    </div>
  );
}

export default Resume;