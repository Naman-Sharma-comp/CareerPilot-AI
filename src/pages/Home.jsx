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
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Upload Resume
          </button>

          <button className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black">
            Start Learning
          </button>
        </div>
      </section>

      <Features />
    </>
  );
}

export default Home;