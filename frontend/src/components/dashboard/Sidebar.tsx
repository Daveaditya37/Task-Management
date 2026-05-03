import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-[260px] h-screen sticky top-0 bg-white border-r border-gray-200 p-5 flex flex-col justify-between overflow-y-auto">
      <div className="flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#e8566c]">Ethara AI</h1>
          <p className="text-sm text-gray-500 mt-1">Task Management System</p>
        </div>
        <div className="flex flex-col gap-2">
          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/admin/dashboard")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              <Link
                to="/projects"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/projects")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FolderKanban size={20} />
                Projects
              </Link>

              <Link
                to="/tasks"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/tasks")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ClipboardList size={20} />
                Tasks
              </Link>

              <Link
                to="/members"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/members")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users size={20} />
                Members
              </Link>
            </>
          )}
          {user?.role === "MEMBER" && (
            <>
              <Link
                to="/member/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/member/dashboard")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              <Link
                to="/my-tasks"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive("/my-tasks")
                    ? "bg-[#e8566c] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ClipboardList size={20} />
                My Tasks
              </Link>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-sm">{user?.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
          <span className="inline-block mt-2 text-xs bg-[#e8566c] text-white px-2 py-1 rounded-full">
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
