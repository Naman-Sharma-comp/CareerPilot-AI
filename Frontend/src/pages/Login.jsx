import robot from "../assets/robot.svg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (

    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">


      {/* Left AI Section */}

      <div className="
        bg-blue-600 
        text-white 
        flex 
        flex-col 
        justify-center 
        items-center 
        p-6 
        sm:p-10 
        lg:p-16
        rounded-b-3xl
        lg:rounded-r-3xl
        lg:rounded-b-none
      ">


        <h1 className="
          text-3xl 
          sm:text-4xl 
          lg:text-5xl 
          font-bold 
          text-center
        ">
          CareerPilot AI
        </h1>


        <p className="
          text-lg 
          sm:text-xl 
          mt-4 
          sm:mt-6 
          text-center
        ">
          Your Intelligent Career Mentor
        </p>


        <img
          src={robot}
          alt="AI Robot"
          className="
            w-40
            sm:w-56
            lg:w-72
            mt-8
            sm:mt-10
            lg:mt-14
          "
        />


      </div>






      {/* Login Form */}

      <div className="
        flex 
        justify-center 
        items-center 
        bg-gray-50 
        p-4 
        sm:p-6
      ">


        <div className="
          w-full 
          max-w-md 
          bg-white 
          p-6 
          sm:p-8 
          lg:p-10
          rounded-2xl 
          shadow-2xl
        ">


          <Link to="/">

            <h1 className="
              text-3xl 
              sm:text-4xl 
              font-bold 
              text-center 
              text-blue-600
            ">
              CareerPilot AI
            </h1>

          </Link>


          <p className="text-center text-gray-500 mt-2">
            Welcome Back 👋
          </p>





          <form className="mt-6 space-y-5">


            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full 
                border 
                rounded-xl 
                p-3 
                text-sm
                sm:text-base
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
              "
            />





            <div className="relative">


              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="
                  w-full 
                  border 
                  rounded-xl 
                  p-3 
                  pr-12
                  text-sm
                  sm:text-base
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />



              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>


            </div>





            <div className="
              flex 
              flex-col 
              sm:flex-row 
              justify-between 
              gap-3
              text-sm
            ">


              <label>
                <input type="checkbox" /> Remember Me
              </label>


              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>


            </div>







            <button
              type="button"
              onClick={() => {
                localStorage.setItem("isLoggedIn", "true");
                navigate("/dashboard");
              }}

              className="
                w-full 
                bg-blue-600 
                text-white 
                p-3 
                rounded-lg 
                hover:bg-blue-700 
                transition
              "
            >
              Login
            </button>







            <button 
              className="
                w-full 
                border 
                py-3 
                rounded-xl 
                flex 
                justify-center 
                items-center 
                gap-3 
                hover:bg-gray-100 
                transition
              "
            >

              <FcGoogle size={24}/>

              Continue with Google

            </button>


          </form>





          <p className="text-center mt-6 text-sm sm:text-base">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-1"
            >
              Register
            </Link>

          </p>



        </div>


      </div>


    </div>

  );
}

export default Login;