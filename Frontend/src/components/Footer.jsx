import { HashLink } from "react-router-hash-link";
import {
  BrainCircuit,
  Mail,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <BrainCircuit size={28} />
              </div>

              <h2 className="text-2xl font-bold">
                CareerPilot AI
              </h2>
            </div>

            <p
              className="
                mt-5
                text-gray-400
                leading-7
                text-center
                md:text-left
              "
            >
              Your Intelligent Career Mentor & Learning Companion
              powered by Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="space-y-3 text-gray-400">
              <HashLink
                smooth
                to="/#home"
                className="block hover:text-white transition"
              >
                Home
              </HashLink>

              <HashLink
                smooth
                to="/#features"
                className="block hover:text-white transition"
              >
                Powerful AI Features
              </HashLink>

              <HashLink
                smooth
                to="/login"
                className="block hover:text-white transition"
              >
                Login
              </HashLink>

              <HashLink
                smooth
                to="/register"
                className="block hover:text-white transition"
              >
                Register
              </HashLink>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="space-y-4 text-gray-400">
              <div
                className="
                  flex
                  items-center
                  justify-center
                  md:justify-end
                  gap-2
                "
              >
                <Mail size={18} />
                <span>support@careerpilot.ai</span>
              </div>

              <div
                className="
                  flex
                  justify-center
                  md:justify-end
                  gap-5
                  pt-2
                "
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub
                    size={22}
                    className="
      cursor-pointer
      hover:text-white
      transition
    "
                  />
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin
                    size={22}
                    className="
      cursor-pointer
      hover:text-blue-400
      transition
    "
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            border-t
            border-gray-700
            mt-10
            pt-6
            text-center
            text-gray-500
            text-sm
          "
        >
          © 2026 CareerPilot AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;