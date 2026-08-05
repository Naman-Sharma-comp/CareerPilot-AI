function Stats() {
  const stats = [
    {
      number: "10K+",
      label: "Students",
    },
    {
      number: "95%",
      label: "ATS Accuracy",
    },
    {
      number: "500+",
      label: "Learning Resources",
    },
    {
      number: "24/7",
      label: "AI Support",
    },
  ];

  return (
    <section className="bg-blue-600 py-14 sm:py-16 md:py-20 lg:py-24 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                {item.number}
              </h2>

              <p className="mt-3 text-sm sm:text-base lg:text-lg text-blue-100">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;