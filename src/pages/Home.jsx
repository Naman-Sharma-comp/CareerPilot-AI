import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Features from "../components/Features";

function Home() {
  return (
    <>
      <Navbar />

      <section className="text-center py-28 bg-gradient-to-r from-blue-50 to-indigo-100">
        <h1 className="text-6xl font-bold text-gray-900">
          CareerPilot AI
        </h1>

        <p className="text-xl text-gray-600 mt-6">
          Your Intelligent Career Mentor & Learning Companion
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 transition duration-300">
            Upload Resume
          </button>

          <button className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black hover:scale-105 transition duration-300">
            Start Learning
          </button>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;