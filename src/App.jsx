import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Setting";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Learning from "./pages/Learning";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;