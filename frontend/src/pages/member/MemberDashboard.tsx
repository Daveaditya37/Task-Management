import { useQuery } from "@tanstack/react-query";

import { getMyTasks } from "../../service";

import type { ITask } from "../../interfaces";


// ======================================
// MEMBER DASHBOARD
// ======================================

export default function MemberDashboard() {

  // ======================================
  // FETCH TASKS
  // ======================================

  const {
    data,
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["my-tasks"],

    queryFn: async () => {

      const response =
        await getMyTasks();

      return response.data.tasks;
    },
  });


  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          My Recent Tasks
        </h2>

        <p className="text-gray-500">
          Loading tasks...
        </p>
      </div>
    );
  }


  // ======================================
  // ERROR
  // ======================================

  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-red-500">
          Failed to load tasks
        </p>
      </div>
    );
  }


  // ======================================
  // UI
  // ======================================

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        My Recent Tasks
      </h2>


      {/* EMPTY */}
      {!data?.length && (
        <div className="text-center py-10 text-gray-500">
          No tasks assigned
        </div>
      )}


      {/* TASKS */}
      <div className="space-y-4">

        {data?.map((task: ITask) => (

          <div
            key={task.id}
            className="p-4 border border-gray-100 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              {/* PRIORITY DOT */}
              <div
                className={`w-3 h-3 rounded-full ${
                  task.priority === "HIGH"
                    ? "bg-red-500"

                    : task.priority === "MEDIUM"
                    ? "bg-yellow-500"

                    : "bg-green-500"
                }`}
              ></div>


              {/* TASK INFO */}
              <div>

                <h4 className="font-semibold text-gray-800">
                  {task.title}
                </h4>

                <p className="text-sm text-gray-500">
                  Project:
                  {" "}
                  {task.project?.title || "No Project"}
                </p>

              </div>
            </div>


            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* PRIORITY */}
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  task.priority === "HIGH"
                    ? "bg-red-100 text-red-700"

                    : task.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-700"

                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.priority}
              </span>


              {/* STATUS */}
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  task.status === "TODO"
                    ? "bg-gray-100 text-gray-700"

                    : task.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-700"

                    : "bg-green-100 text-green-700"
                }`}
              >
                {task.status}
              </span>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}