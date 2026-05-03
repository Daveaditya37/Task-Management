import { useState, useEffect } from "react";
import { useMyTasks, useCreateTask, useStartTask, useCompleteTask } from "../../hooks/useMyTasks";
import type { ITask } from "../../interfaces";


function TaskCard({ task }: { task: ITask }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isOverdue, setIsOverdue] = useState(false);

  const startMutation = useStartTask();
  const completeMutation = useCompleteTask();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (task.status === "IN_PROGRESS" && task.startedAt && task.estimatedTime) {
      const calculateTimeLeft = () => {
        const start = new Date(task.startedAt!).getTime();
        const durationMs = task.estimatedTime! * 60 * 1000;
        const end = start + durationMs;
        const now = new Date().getTime();
        const diff = end - now;

        if (diff <= 0) {
          setIsOverdue(true);
          setTimeLeft(Math.abs(diff));
        } else {
          setIsOverdue(false);
          setTimeLeft(diff);
        }
      };

      calculateTimeLeft();
      interval = setInterval(calculateTimeLeft, 1000);
    }

    return () => clearInterval(interval);
  }, [task.status, task.startedAt, task.estimatedTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`p-5 border rounded-xl shadow-sm transition-all ${
      task.status === 'COMPLETED' ? 'bg-gray-50 border-gray-200 opacity-75' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{task.project?.title}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          task.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
          task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 font-medium">
          Est. Time: {task.estimatedTime} min
        </div>

        <div>
          {task.status === "TODO" && (
            <button 
              onClick={() => startMutation.mutate(task.id)}
              disabled={startMutation.isPending}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {startMutation.isPending ? "Starting..." : "Start"}
            </button>
          )}

          {task.status === "IN_PROGRESS" && (
            <button 
              onClick={() => completeMutation.mutate(task.id)}
              disabled={completeMutation.isPending}
              className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                isOverdue ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {completeMutation.isPending ? "Completing..." : (
                <>
                  <span>Active</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded">
                    {isOverdue ? "-" : ""}{formatTime(timeLeft)}
                  </span>
                  {isOverdue && <span className="ml-1 uppercase text-[10px] tracking-wider font-bold">Overdue</span>}
                </>
              )}
            </button>
          )}

          {task.status === "COMPLETED" && (
            <span className="px-4 py-2 bg-gray-200 text-gray-600 text-sm font-semibold rounded-lg">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyTasks() {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"HIGH"|"MEDIUM"|"LOW">("MEDIUM");
  const [estimatedTime, setEstimatedTime] = useState(30);

  const { data, isLoading } = useMyTasks();
  const createMutation = useCreateTask();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !user) return;

    createMutation.mutate({
      title,
      description,
      priority,
      estimatedTime,
      assignedTo: user.id,
      isPrivate: true,
      projectId: null, // ✅ FIXED BUG
    });
  };

  const tasks: ITask[] = data?.data?.tasks || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg transition-colors"
        >
          {isCreating ? "Cancel" : "Create Personal Task"}
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-bold mb-4">New Personal Task</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (min)</label>
              <input type="number" min="1" value={estimatedTime} onChange={(e) => setEstimatedTime(parseInt(e.target.value))} required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" disabled={createMutation.isPending}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {createMutation.isPending ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 font-medium">You have no tasks assigned right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}
    </div>
  );
}
