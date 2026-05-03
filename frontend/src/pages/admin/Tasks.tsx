import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, getProjects, getMembers } from "../../service";
import type { ITask, IProject, IBeUser, Priority } from "../../interfaces";

export default function Tasks() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [estimatedTime, setEstimatedTime] = useState(60); // minutes
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const { data: tasksData, isLoading: loadingTasks } = useQuery({ queryKey: ["tasks"], queryFn: getTasks });
  const { data: projectsData } = useQuery({ queryKey: ["projects"], queryFn: getProjects });
  const { data: membersData } = useQuery({ queryKey: ["members"], queryFn: getMembers });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
      setEstimatedTime(60);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !projectId || !assignedTo) return;
    mutation.mutate({ title, description, priority, estimatedTime, projectId, assignedTo, isPrivate: false });
  };

  const tasks: ITask[] = tasksData?.data?.tasks || [];
  const projects: IProject[] = projectsData?.data?.projects || [];
  const members: IBeUser[] = membersData?.data?.members || [];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Assign New Task</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none">
              <option value="">Select a project...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none">
              <option value="">Select a member...</option>
              {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none">
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (minutes)</label>
            <input type="number" min="1" value={estimatedTime} onChange={(e) => setEstimatedTime(parseInt(e.target.value))} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none" />
          </div>
          
          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={mutation.isPending}
              className="px-6 py-2 bg-[#e8566c] text-white font-medium rounded-lg hover:bg-[#e8566c]/80 disabled:opacity-50">
              {mutation.isPending ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">All Assigned Tasks</h2>
        {loadingTasks ? <p>Loading...</p> : tasks.length === 0 ? <p className="text-gray-500">No tasks found.</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.project?.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{task.assignee?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'HIGH' ? 'bg-red-100 text-red-800' : task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{task.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
