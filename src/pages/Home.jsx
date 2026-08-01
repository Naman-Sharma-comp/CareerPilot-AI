import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>CareerPilot AI</h1>
        <p>Your Intelligent Career Mentor & Learning Companion</p>

        <div className="hero-buttons">
          <button>Upload Resume</button>
          <button>Start Learning</button>
        </div>
      </section>
    </>
  );
}

export default Home;