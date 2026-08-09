import { useEffect, useMemo, useState } from "react";

import {
  Mic,
  Code2,
  Users,
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Building2,
  BriefcaseBusiness,
  LoaderCircle,
  CheckCircle2,
  X,
  Search,
  Filter,
  Clock3,
} from "lucide-react";

import {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
} from "../api/interviews";

function Interview() {
  const initialForm = {
    title: "",
    type: "Technical",
    company: "",
    role: "",
    status: "PLANNED",
    scheduledAt: "",
    notes: "",
  };

  const [interviews, setInterviews] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  // ==========================
  // LOAD INTERVIEWS
  // ==========================
  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getInterviews();

      setInterviews(response.data || []);
    } catch (err) {
      console.error(
        "Fetch Interviews Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load interview history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  // ==========================
  // FORM CHANGE
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ==========================
  // OPEN CREATE FORM
  // ==========================
  const openCreateForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // ==========================
  // RESET FORM
  // ==========================
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // ==========================
  // OPEN EDIT FORM
  // ==========================
  const openEditForm = (interview) => {
    setEditingId(interview.id);

    setForm({
      title: interview.title || "",
      type: interview.type || "Technical",
      company: interview.company || "",
      role: interview.role || "",
      status: interview.status || "PLANNED",

      scheduledAt: interview.scheduledAt
        ? new Date(interview.scheduledAt)
            .toISOString()
            .slice(0, 16)
        : "",

      notes: interview.notes || "",
    });

    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // CREATE / UPDATE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError(
        "Interview title is required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        title: form.title.trim(),

        type:
          form.type.trim() || null,

        company:
          form.company.trim() || null,

        role:
          form.role.trim() || null,

        status: form.status,

        scheduledAt:
          form.scheduledAt || null,

        notes:
          form.notes.trim() || null,
      };

      let response;

      if (editingId) {
        response = await updateInterview(
          editingId,
          payload
        );

        setSuccess(
          response.message ||
            "Interview updated successfully."
        );
      } else {
        response = await createInterview(
          payload
        );

        setSuccess(
          response.message ||
            "Interview created successfully."
        );
      }

      resetForm();

      await fetchInterviews();
    } catch (err) {
      console.error(
        "Save Interview Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to save interview."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // QUICK STATUS UPDATE
  // ==========================
  const handleStatusChange = async (
    interview,
    status
  ) => {
    try {
      setError("");
      setSuccess("");

      const response = await updateInterview(
        interview.id,
        {
          status,
        }
      );

      setSuccess(
        response.message ||
          "Interview status updated."
      );

      await fetchInterviews();
    } catch (err) {
      console.error(
        "Status Update Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update interview status."
      );
    }
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete = async (
    interviewId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(interviewId);
      setError("");
      setSuccess("");

      const response = await deleteInterview(
        interviewId
      );

      setSuccess(
        response.message ||
          "Interview deleted successfully."
      );

      await fetchInterviews();
    } catch (err) {
      console.error(
        "Delete Interview Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to delete interview."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================
  // FILTER INTERVIEWS
  // ==========================
  const filteredInterviews = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return interviews.filter(
      (interview) => {
        const matchesSearch =
          !query ||
          interview.title
            ?.toLowerCase()
            .includes(query) ||
          interview.company
            ?.toLowerCase()
            .includes(query) ||
          interview.role
            ?.toLowerCase()
            .includes(query) ||
          interview.type
            ?.toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "ALL" ||
          interview.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    interviews,
    search,
    statusFilter,
  ]);

  // ==========================
  // STATUS STYLE
  // ==========================
  const getStatusStyle = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";

      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

      case "CANCELLED":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";

      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  // ==========================
  // DISPLAY DATE
  // ==========================
  const formatDate = (date) => {
    if (!date) {
      return "Not scheduled";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* ==========================
          HEADER
      ========================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Interview Preparation
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Schedule interviews, track your
            progress and maintain your complete
            interview history.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition"
        >
          <Plus size={17} />
          Add Interview
        </button>
      </div>

      {/* ==========================
          MESSAGES
      ========================== */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
          <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-center gap-2">
          <CheckCircle2
            size={16}
            className="text-emerald-600 dark:text-emerald-400"
          />

          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {success}
          </p>
        </div>
      )}

      {/* ==========================
          ADD / EDIT FORM
      ========================== */}
      {showForm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles
                  size={18}
                  className="text-blue-500"
                />

                {editingId
                  ? "Edit Interview"
                  : "Schedule Interview"}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Save your interview details so
                you can track them later.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* TITLE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Interview Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Backend Developer Mock Interview"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* TYPE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Interview Type
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Technical">
                  Technical
                </option>

                <option value="Coding">
                  Coding
                </option>

                <option value="Behavioral">
                  Behavioral / HR
                </option>

                <option value="Managerial">
                  Managerial
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* COMPANY */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Infosys"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Role
              </label>

              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Backend Developer"
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="PLANNED">
                  Planned
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Scheduled Date & Time
              </label>

              <input
                type="datetime-local"
                name="scheduledAt"
                value={form.scheduledAt}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* NOTES */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Important topics, preparation notes, interviewer details..."
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving && (
                  <LoaderCircle
                    size={15}
                    className="animate-spin"
                  />
                )}

                {editingId
                  ? "Save Changes"
                  : "Add Interview"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================
          INTERVIEW TYPES
      ========================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-blue-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Mic size={24} />
          </div>

          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Technical Round
          </h3>

          <p className="text-[10px] text-slate-400">
            Track technical interview sessions.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-indigo-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
            <Code2 size={24} />
          </div>

          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Coding Assessment
          </h3>

          <p className="text-[10px] text-slate-400">
            Save coding round details and notes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <Users size={24} />
          </div>

          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Behavioral / HR
          </h3>

          <p className="text-[10px] text-slate-400">
            Maintain HR and behavioral rounds.
          </p>
        </div>
      </div>

      {/* ==========================
          SEARCH + FILTER
      ========================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search title, role, company or type..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <Filter
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="pl-9 pr-8 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-200 outline-none"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="PLANNED">
                Planned
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="CANCELLED">
                Cancelled
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ==========================
          HISTORY
      ========================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Interview History
            </h2>

            <p className="text-[11px] text-slate-400 mt-1">
              {filteredInterviews.length} of{" "}
              {interviews.length} interviews
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
            {interviews.length}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-slate-400">
            <LoaderCircle
              size={18}
              className="animate-spin"
            />

            <span className="text-xs font-semibold">
              Loading interviews...
            </span>
          </div>
        )}

        {!loading &&
          filteredInterviews.length === 0 && (
            <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 text-center">
              <Mic
                size={34}
                className="mx-auto text-slate-300 dark:text-slate-600"
              />

              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3">
                No interviews found
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Add your first interview or
                change your current filters.
              </p>
            </div>
          )}

        {!loading &&
          filteredInterviews.length > 0 && (
            <div className="space-y-4">
              {filteredInterviews.map(
                (interview) => (
                  <div
                    key={interview.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 p-4"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Mic size={21} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white">
                              {interview.title}
                            </h3>

                            <span
                              className={`text-[9px] uppercase tracking-wide font-black px-2 py-0.5 rounded-full border ${getStatusStyle(
                                interview.status
                              )}`}
                            >
                              {interview.status.replace(
                                "_",
                                " "
                              )}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                            {interview.company && (
                              <span className="inline-flex items-center gap-1.5">
                                <Building2 size={12} />

                                {interview.company}
                              </span>
                            )}

                            {interview.role && (
                              <span className="inline-flex items-center gap-1.5">
                                <BriefcaseBusiness
                                  size={12}
                                />

                                {interview.role}
                              </span>
                            )}

                            {interview.type && (
                              <span className="inline-flex items-center gap-1.5">
                                <Mic size={12} />

                                {interview.type}
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays
                                size={12}
                              />

                              {formatDate(
                                interview.scheduledAt
                              )}
                            </span>
                          </div>

                          {interview.notes && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 whitespace-pre-wrap">
                              {interview.notes}
                            </p>
                          )}

                          <p className="text-[9px] text-slate-400 mt-3 inline-flex items-center gap-1">
                            <Clock3 size={10} />

                            Added{" "}
                            {new Date(
                              interview.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={interview.status}
                          onChange={(e) =>
                            handleStatusChange(
                              interview,
                              e.target.value
                            )
                          }
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none"
                        >
                          <option value="PLANNED">
                            Planned
                          </option>

                          <option value="IN_PROGRESS">
                            In Progress
                          </option>

                          <option value="COMPLETED">
                            Completed
                          </option>

                          <option value="CANCELLED">
                            Cancelled
                          </option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(
                              interview
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              interview.id
                            )
                          }
                          disabled={
                            deletingId ===
                            interview.id
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition disabled:opacity-50"
                        >
                          {deletingId ===
                          interview.id ? (
                            <LoaderCircle
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={14} />
                          )}

                          {deletingId ===
                          interview.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}

export default Interview;