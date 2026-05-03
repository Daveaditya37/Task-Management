import { useAdminDashboard } from "../../hooks/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string | null;
  assignee?: { id: string; name: string; email: string } | null;
  project?: { id: string; title: string } | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  creator: { id: string; name: string; email: string };
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-yellow-100 text-yellow-600",
    LOW: "bg-green-100 text-green-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[priority] ?? "bg-gray-100 text-gray-500"}`}>
      {priority}
    </span>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "COMPLETED") return <CheckCircle2 size={16} className="text-green-500" />;
  if (status === "IN_PROGRESS") return <Clock size={16} className="text-blue-500" />;
  return <Circle size={16} className="text-gray-400" />;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number | undefined; color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value ?? 0}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    TODO:        "bg-gray-100 text-gray-600",
    IN_PROGRESS: "bg-blue-100 text-blue-600",
    COMPLETED:   "bg-green-100 text-green-600",
  };
  const label: Record<string, string> = {
    TODO: "To Do", IN_PROGRESS: "In Progress", COMPLETED: "Completed",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] ?? "bg-gray-100 text-gray-500"}`}>
      {label[status] ?? status}
    </span>
  );
}

export default function AdminDashboard() {
  const { data: dashData, isLoading: dashLoading } = useAdminDashboard();

  // ✅ staleTime: 0 + refetchOnMount: true on all 3 queries
  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => { const { data } = await api.get("/projects"); return data; },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: tasksData, isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => { const { data } = await api.get("/tasks"); return data; },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ["members"],
    queryFn: async () => { const { data } = await api.get("/users/members"); return data; },
    staleTime: 0,
    refetchOnMount: true,
  });

  const isLoading = dashLoading || projectsLoading || tasksLoading || membersLoading;

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const stats                   = dashData?.data.data;
  const projects: Project[]     = projectsData?.projects ?? [];
  const tasks: Task[]           = tasksData?.tasks       ?? [];
  const members: Member[]       = membersData?.members   ?? [];

  const todoTasks       = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const completedTasks  = tasks.filter((t) => t.status === "COMPLETED");
  const recentTasks     = [...tasks].sort((a, b) => (b.dueDate ?? "").localeCompare(a.dueDate ?? "")).slice(0, 6);
  const recentMembers   = [...members].slice(0, 5);
  const totalTaskCount  = tasks.length || 1;

  const taskStatusData = [
    { label: "To Do",       count: todoTasks.length,       color: "bg-gray-400",  text: "text-gray-600"  },
    { label: "In Progress", count: inProgressTasks.length, color: "bg-blue-500",  text: "text-blue-600"  },
    { label: "Completed",   count: completedTasks.length,  color: "bg-green-500", text: "text-green-600" },
  ];

  return (
    <div className="space-y-6">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FolderKanban size={22} className="text-blue-500" />}    label="Total Projects"  value={stats?.totalProjects}  color="bg-blue-50"   />
        <StatCard icon={<ClipboardList size={22} className="text-yellow-500" />} label="Active Tasks"    value={stats?.activeTasks}    color="bg-yellow-50" />
        <StatCard icon={<CheckCircle2 size={22} className="text-green-500" />}   label="Completed Tasks" value={stats?.completedTasks} color="bg-green-50"  />
        <StatCard icon={<Users size={22} className="text-purple-500" />}         label="Team Members"    value={stats?.teamMembers}    color="bg-purple-50" />
      </div>

      {/* TASK STATUS + MEMBERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <LayoutDashboard size={18} className="text-blue-500" />
            Task Status Breakdown
          </h2>
          <div className="space-y-4">
            {taskStatusData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.text}`}>{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${(item.count / totalTaskCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {taskStatusData.map((item) => (
              <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className={`text-xl font-bold ${item.text}`}>{item.count}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Users size={18} className="text-purple-500" />
            Team Members
          </h2>
          <div className="space-y-3">
            {recentMembers.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No members yet</p>
            )}
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar name={member.name} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{member.name}</p>
                  <p className="text-xs text-gray-400 truncate">{member.email}</p>
                </div>
                <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS PROGRESS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <FolderKanban size={18} className="text-blue-500" />
          Projects Progress
        </h2>
        {projects.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No projects yet</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project) => {
            const total     = project.tasks.length;
            const completed = project.tasks.filter((t) => t.status === "COMPLETED").length;
            const inProg    = project.tasks.filter((t) => t.status === "IN_PROGRESS").length;
            const percent   = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <div key={project.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800 truncate pr-2">{project.title}</h3>
                  <span className="text-xs font-bold text-blue-600 flex-shrink-0">{percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{completed}/{total} tasks done</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-blue-400" />
                    <span>{inProg} in progress</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT TASKS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <ClipboardList size={18} className="text-yellow-500" />
          Recent Tasks
        </h2>
        {recentTasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No tasks yet</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Task", "Project", "Assignee", "Priority", "Status", "Due Date"].map((h) => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={task.status} />
                      <span className="text-gray-800 font-medium truncate max-w-[180px]">{task.title}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-gray-500 truncate max-w-[120px] block">
                      {task.project?.title ?? "—"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={task.assignee.name} />
                        <span className="text-gray-600 truncate max-w-[100px]">{task.assignee.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 pr-4"><PriorityBadge priority={task.priority} /></td>
                  <td className="py-3 pr-4"><StatusBadge status={task.status} /></td>
                  <td className="py-3">
                    {task.dueDate ? (
                      <span className={`text-xs ${new Date(task.dueDate) < new Date() && task.status !== "COMPLETED" ? "text-red-500 font-semibold" : "text-gray-500"}`}>
                        {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">No date</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}