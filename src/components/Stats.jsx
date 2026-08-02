function Stats() {
  return (
    <section className="py-24 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">

        <div>
          <h2 className="text-5xl font-bold">10K+</h2>
          <p className="mt-3">Students</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">95%</h2>
          <p className="mt-3">ATS Accuracy</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">500+</h2>
          <p className="mt-3">Learning Resources</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">24/7</h2>
          <p className="mt-3">AI Support</p>
        </div>

      </div>
    </section>
  );
}

export default Stats;