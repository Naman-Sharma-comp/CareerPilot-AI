import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Settings from "./pages/Setting";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Learning from "./pages/Learning";
import Interview from "./pages/Interview";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

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

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;