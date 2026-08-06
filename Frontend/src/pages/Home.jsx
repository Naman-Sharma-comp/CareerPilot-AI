import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                CareerPilot AI
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-7 sm:leading-8 max-w-2xl mx-auto lg:mx-0">
                Your Intelligent Career Mentor & Learning Companion.
                Analyze your resume, identify skill gaps, prepare for
                interviews, and master in-demand skills with AI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">

                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition duration-300 hover:scale-105">
                    Upload Resume
                  </button>
                </Link>

                <Link to="/login" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition duration-300 hover:scale-105">
                    Start Learning
                  </button>
                </Link>

              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex-1 flex justify-center">
              <img
                src="/ai-hero.png"
                alt="CareerPilot AI Illustration"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl h-auto drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <Features />
      </section>

      {/* Other Sections */}
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;