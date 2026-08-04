import { User, Mail, GraduationCap, Briefcase } from "lucide-react";

function Profile() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={50} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Krushna Kadam
            </h2>

            <p className="text-gray-500">
              Aspiring Software Engineer & AI/ML Engineer
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-10">

          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <span>krushna@example.com</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" />
            <span>B.Tech Computer Engineering</span>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            <span>Software Engineer</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="text-blue-600" />
            <span>AI/ML Enthusiast</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;