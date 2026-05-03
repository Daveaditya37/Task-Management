import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  const user = getUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function HomeRoute() {
  return <Outlet />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const user = getUser();

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto bg-gray-50 p-6">
        <div className="flex items-center justify-between mb-5 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h1 className="text-2xl font-bold">Task Management System</h1>
            <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              {user?.role}
            </span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export { HomeRoute, ProtectedRoute };
