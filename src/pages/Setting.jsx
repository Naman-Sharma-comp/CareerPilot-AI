import { useState } from "react";

function Setting() {

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">


      <div className="mb-8">

        <h1 className="text-4xl font-bold text-blue-700">
          Settings
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your account preferences and CareerPilot AI experience.
        </p>

      </div>



      <div className="space-y-6 max-w-4xl">



        {/* Profile */}

        <div className="bg-white rounded-2xl shadow-md border-l-4 border-blue-600 p-6">

          <h2 className="text-2xl font-semibold text-blue-700 mb-5">
            Profile Settings
          </h2>


          <div className="space-y-4">


            <div>

              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Krushna Kadam"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>



            <div>

              <label className="block font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>


          </div>

        </div>





        {/* Preferences */}

        <div className="bg-white rounded-2xl shadow-md border-l-4 border-purple-600 p-6">


          <h2 className="text-2xl font-semibold text-purple-700 mb-5">
            Preferences
          </h2>



          <div className="space-y-5">


            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold">
                  Dark Mode
                </h3>

                <p className="text-gray-500 text-sm">
                  Enable dark theme
                </p>

              </div>


              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5 accent-purple-600"
              />

            </div>





            <div className="flex justify-between items-center">


              <div>

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <p className="text-gray-500 text-sm">
                  Receive AI updates and reminders
                </p>

              </div>


              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-purple-600"
              />


            </div>


          </div>


        </div>






        {/* Security */}

        <div className="bg-white rounded-2xl shadow-md border-l-4 border-red-500 p-6">


          <h2 className="text-2xl font-semibold text-red-600 mb-5">
            Security
          </h2>


          <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition">
            Change Password
          </button>


        </div>







        {/* Save */}

        <button
          className="bg-blue-600 text-white px-10 py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
        >
          Save Changes
        </button>




      </div>


    </div>
  );
}


export default Setting;