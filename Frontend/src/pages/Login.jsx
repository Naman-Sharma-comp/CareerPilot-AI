import robot from "../assets/robot.svg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { login, googleLogin } from "../api/auth";
import { useUser } from "../context/UserContext";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { fetchUser } = useUser();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      // Handles both axios direct data return and wrapped response data
      const { data } = response;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Fetch latest user from backend
      await fetchUser();

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);
    setError("");

    const response = await googleLogin(
      credentialResponse.credential
    );

    const data = response.data || response;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");

    await fetchUser();

    navigate("/dashboard");
  } catch (error) {
    console.error("Google Login Error:", error);

    setError(
      error.response?.data?.message ||
      "Google login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left AI Section */}
      <div
        className="
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
      "
      >
        <h1
          className="
          text-3xl 
          sm:text-4xl 
          lg:text-5xl 
          font-bold 
          text-center
        "
        >
          CareerPilot AI
        </h1>

        <p
          className="
          text-lg 
          sm:text-xl 
          mt-4 
          sm:mt-6 
          text-center
        "
        >
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
      <div
        className="
        flex 
        justify-center 
        items-center 
        bg-gray-50 
        p-4 
        sm:p-6
      "
      >
        <div
          className="
          w-full 
          max-w-md 
          bg-white 
          p-6 
          sm:p-8 
          lg:p-10
          rounded-2xl 
          shadow-2xl
        "
        >
          <Link to="/">
            <h1
              className="
              text-3xl 
              sm:text-4xl 
              font-bold 
              text-center 
              text-blue-600
            "
            >
              CareerPilot AI
            </h1>
          </Link>

          <p className="text-center text-gray-500 mt-2">
            Welcome Back 👋
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="mt-6 space-y-5"
          >
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Remember Me / Forgot Password */}
            <div
              className="
              flex 
              flex-col 
              sm:flex-row 
              justify-between 
              gap-3
              text-sm
            "
            >
              <label>
                <input type="checkbox" /> Remember Me
              </label>

              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full 
                bg-blue-600 
                text-white 
                p-3 
                rounded-lg 
                font-semibold
                hover:bg-blue-700 
                transition
                disabled:bg-gray-400
              "
            >
              {loading ? "Signing In..." : "Login"}
            </button>

            {/* Google Login */}
<div className="w-full flex justify-center">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => {
      setError("Google login failed. Please try again.");
    }}
    useOneTap={false}
    width="400"
  />
</div>
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