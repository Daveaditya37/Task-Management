import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject } from "../../service";
import type { IProject } from "../../interfaces";

export default function Projects() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const showLoader = isLoading || isFetching;

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    mutation.mutate({ title, description });
  };

  const projects: IProject[] = data?.data?.projects || [];

  return (
    <div className="space-y-8">
      {/* Create Project Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none"
              placeholder="e.g. Website Redesign"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e8566c] focus:outline-none"
              placeholder="Project details..."
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-2 bg-[#e8566c] text-white font-medium rounded-lg hover:bg-[#e8566c]/80 disabled:opacity-50"
          >
            {mutation.isPending ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">All Projects</h2>
        {showLoader ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {project.description || "No description"}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <span>Tasks: {project.tasks?.length || 0}</span>
                  <span>Created by: {project.creator?.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}