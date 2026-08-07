import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  Edit,
} from "lucide-react";
import { useUser } from "../context/UserContext";

function Profile() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
        {/* Cover */}
        <div className="h-28 sm:h-36 lg:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

        {/* Profile Section */}
        <div className="px-5 sm:px-8 lg:px-10 pb-8 sm:pb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* User Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
              <div className="
                w-24 h-24
                sm:w-32 sm:h-32
                -mt-12 sm:-mt-16
                rounded-full 
                bg-white 
                shadow-lg 
                flex 
                items-center 
                justify-center 
                border-4 
                border-white
              ">
                <User 
                  size={50} 
                  className="text-blue-600 sm:w-[70px] sm:h-[70px]" 
                />
              </div>

              <div className="mt-2 sm:mt-8 lg:mt-12">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {user?.fullName || user?.name || "User"}
                </h2>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  {user?.careerGoal || "CareerPilot AI User"}
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <button 
              className="
              mt-6 lg:mt-0
              flex 
              items-center 
              justify-center
              gap-2 
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              px-5 
              py-3 
              rounded-xl 
              transition
              w-full
              sm:w-auto
              "
            >
              <Edit size={18}/>
              Edit Profile
            </button>
          </div>

          {/* Information Cards */}
          <div className="
            grid 
            grid-cols-1 
            lg:grid-cols-2 
            gap-5 sm:gap-8 
            mt-10 sm:mt-12
          ">
            {/* Personal */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 shadow">
              <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
                Personal Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <Mail className="text-blue-600"/>
                  <span>{user?.email}</span>
                </div>

                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <Phone className="text-blue-600"/>
                  <span>{user?.phone || "+91 XXXXX XXXXX"}</span>
                </div>

                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <MapPin className="text-blue-600"/>
                  <span>{user?.location || "Not Added"}</span>
                </div>

                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <Calendar className="text-blue-600"/>
                  <span>Joined {user?.createdAt?.slice(0, 10) || "Recently"}</span>
                </div>
              </div>
            </div>

            {/* Career */}
            <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 shadow">
              <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
                Career Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <GraduationCap className="text-blue-600"/>
                  <span>{user?.education || "Not Added"}</span>
                </div>

                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <Briefcase className="text-blue-600"/>
                  <span>{user?.jobTitle || "Not Added"}</span>
                </div>

                <div className="flex items-center gap-4 text-sm sm:text-base">
                  <User className="text-blue-600"/>
                  <span>{user?.careerGoal || "Not Added"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-5 sm:gap-6 
            mt-10 sm:mt-12
          ">
            <div className="bg-blue-50 rounded-2xl p-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                82%
              </h2>
              <p className="text-gray-600 mt-2">
                Resume Score
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
                78%
              </h2>
              <p className="text-gray-600 mt-2">
                ATS Score
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">
                65%
              </h2>
              <p className="text-gray-600 mt-2">
                Learning
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-5 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">
                12
              </h2>
              <p className="text-gray-600 mt-2">
                Skill Gaps
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;