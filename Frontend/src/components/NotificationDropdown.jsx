import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Sparkles, FileText, Award } from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Resume Analysis Complete",
    desc: "Your ATS score improved by 18 points after your recent upload.",
    time: "5m ago",
    read: false,
    icon: FileText,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    id: 2,
    title: "New AI Interview Feedback",
    desc: "Detailed evaluation for 'System Design' mock is ready.",
    time: "1h ago",
    read: false,
    icon: Sparkles,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    id: 3,
    title: "Weekly Learning Milestone",
    desc: "You completed 5 Modules in React Architecture!",
    time: "1d ago",
    read: true,
    icon: Award,
    color: "text-emerald-500 bg-emerald-500/10",
  },
];

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition active:scale-95"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        )}
      </button>

      {/* Popover Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden fade">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50 custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`p-4 flex gap-3 transition-colors ${
                      n.read
                        ? "opacity-75 bg-transparent"
                        : "bg-blue-50/40 dark:bg-slate-800/30"
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 h-fit ${n.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {n.desc}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-6 text-center text-xs text-slate-400">
                No notifications right now.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;