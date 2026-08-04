import { Star } from "lucide-react";
function Testimonials() {
  return (
    <section className="py-24 px-16 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-16">
        What Students Say
      </h2>

      <div className="grid grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <Star/><Star/><Star/><Star/><Star/>
          <p className="mt-4">
            CareerPilot AI helped me improve my resume and crack my internship.
          </p>
          <h4 className="mt-6 font-bold">Rahul</h4>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <Star/><Star/><Star/><Star/><Star/>
          <p className="mt-4">
            The AI learning assistant saved hours while studying.
          </p>
          <h4 className="mt-6 font-bold">Priya</h4>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-2 transition duration-300">
          <Star/><Star/><Star/><Star/><Star/>
          <p className="mt-4">
            Interview preparation became much easier with AI feedback.
          </p>
          <h4 className="mt-6 font-bold">Aman</h4>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;