import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyTasks, startTask, completeTask, createTask } from "../service";

// 🔹 Get tasks
export const useMyTasks = () => {
  return useQuery({
    queryKey: ["myTasks"],
    queryFn: getMyTasks,
  });
};

// 🔹 Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },

  });
};

// 🔹 Start task
export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });
};

// 🔹 Complete task
export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });
};