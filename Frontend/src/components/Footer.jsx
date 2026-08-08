import { HashLink } from "react-router-hash-link";
import { BrainCircuit, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-linear-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                <BrainCircuit size={26} className="text-white" />
              </div>

              <h2 className="text-2xl font-bold bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CareerPilot AI
              </h2>
            </div>

            <p className="text-slate-400 leading-relaxed text-center md:text-left text-sm sm:text-base">
              Your Intelligent Career Mentor & Learning Companion powered by
              Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Quick Links
            </h3>

            <div className="space-y-3 text-sm text-slate-400 font-medium">
              <HashLink
                smooth
                to="/#home"
                className="block hover:text-blue-400 transition-colors"
              >
                Home
              </HashLink>

              <HashLink
                smooth
                to="/#features"
                className="block hover:text-blue-400 transition-colors"
              >
                Powerful AI Features
              </HashLink>

              <HashLink
                smooth
                to="/login"
                className="block hover:text-blue-400 transition-colors"
              >
                Login
              </HashLink>

              <HashLink
                smooth
                to="/register"
                className="block hover:text-blue-400 transition-colors"
              >
                Register
              </HashLink>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="text-center md:text-right space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Connect
            </h3>

            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-center justify-center md:justify-end gap-2 hover:text-slate-200 transition">
                <Mail size={16} className="text-blue-400" />
                <span>support@careerpilot.ai</span>
              </div>

              <div className="flex justify-center md:justify-end gap-4 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all duration-300 hover:scale-110"
                >
                  <FaGithub size={18} />
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-700/60 transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 text-center text-slate-500 text-xs sm:text-sm font-medium">
          © 2026 CareerPilot AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;