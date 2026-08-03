import { useState } from "react";

function Profile() {

  const [user, setUser] = useState({
    name: "Krushna Kadam",
    email: "krushna@example.com",
    role: "Computer Engineering Student",
    skills: "React, JavaScript, Python, AI/ML"
  });


  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        My Profile
      </h1>


      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            K
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.role}
            </p>
          </div>

        </div>


        {/* Profile Details */}

        <div className="space-y-5">


          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              value={user.name}
              onChange={(e)=>
                setUser({...user,name:e.target.value})
              }
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>



          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={user.email}
              onChange={(e)=>
                setUser({...user,email:e.target.value})
              }
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>



          <div>
            <label className="font-semibold">
              Role
            </label>

            <input
              value={user.role}
              onChange={(e)=>
                setUser({...user,role:e.target.value})
              }
              className="w-full mt-2 p-3 border rounded-lg"
            />
          </div>



          <div>
            <label className="font-semibold">
              Skills
            </label>

            <textarea
              value={user.skills}
              onChange={(e)=>
                setUser({...user,skills:e.target.value})
              }
              className="w-full mt-2 p-3 border rounded-lg"
              rows="3"
            />
          </div>


        </div>



        <button
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>


      </div>


    </div>
  );
}


export default Profile;