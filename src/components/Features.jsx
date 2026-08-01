import "../styles/Features.css";
function Features() {
  return (
    <section className="features">
      <h2>Powerful AI Features</h2>

      <div className="feature-grid">
        <div className="card">
          <h3>📄 Resume Analyzer</h3>
          <p>Analyze your resume and improve ATS score.</p>
        </div>

        <div className="card">
          <h3>🎯 Skill Gap Detection</h3>
          <p>Discover missing skills based on job descriptions.</p>
        </div>

        <div className="card">
          <h3>📚 AI Learning Assistant</h3>
          <p>Learn from notes, PDFs, PPTs and images using AI.</p>
        </div>

        <div className="card">
          <h3>🎤 Interview Preparation</h3>
          <p>Practice AI-generated interview questions.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;