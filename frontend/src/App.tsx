import { QueryClientProvider } from "@tanstack/react-query";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { queryClient } from "./lib/react-query";

import { HomeRoute, ProtectedRoute } from "./layout/index";

// ======================================
// AUTH PAGES
// ======================================

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ======================================
// ADMIN PAGES
// ======================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import Projects from "./pages/admin/Projects";
import Tasks from "./pages/admin/Tasks";
import Members from "./pages/admin/Members";
import MemberDashboard from "./pages/member/MemberDashboard";
import MyTasks from "./pages/member/MyTasks";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" />

      <Router>
        <div className="w-full min-h-screen">
          <Routes>
            {/* ======================================
                PUBLIC ROUTES
            ====================================== */}

           <Route element={<HomeRoute />}>
  <Route path="/"        element={<Navigate to="/login" replace />} />
  <Route path="/login"   element={<Login />} />
  <Route path="/signup"  element={<Signup />} />
</Route>

            {/* ======================================
                PROTECTED ROUTES
            ====================================== */}

            <Route element={<ProtectedRoute />}>
              {/* ADMIN DASHBOARD */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* MEMBER DASHBOARD */}
              <Route path="/member/dashboard" element={<MemberDashboard />} />

              {/* PROJECTS */}
              <Route path="/projects" element={<Projects />} />

              {/* TASKS */}
              <Route path="/tasks" element={<Tasks />} />

              {/* MY TASKS */}
              <Route path="/my-tasks" element={<MyTasks />} />

              {/* MEMBERS */}
              <Route path="/members" element={<Members />} />
            </Route> 

            {/* ======================================
                UNAUTHORIZED
            ====================================== */}

            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
