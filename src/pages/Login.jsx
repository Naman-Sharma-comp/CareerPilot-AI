import robot from "../assets/robot.svg";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="bg-blue-600 text-white flex flex-col justify-center items-center p-16 rounded-r-3xl">

        <h1 className="text-5xl font-bold">
          CareerPilot AI
        </h1>

        <p className="text-xl mt-6 text-center">
          Your Intelligent Career Mentor
        </p>

        <img
          src={robot}
          alt="AI Robot"
          className="w-72 mt-14"
        />
      </div>

      <div className="flex justify-center items-center bg-gray-50">

        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">

          <Link to="/">
            <h1 className="text-4xl font-bold text-center text-blue-600">
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
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>
            <div className="flex justify-between text-sm">

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
  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
>
  Login
</button>

            <button className="w-full border py-3 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-100 transition">

              <FcGoogle size={24} />

              Continue with Google

            </button>
          </form>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold"
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