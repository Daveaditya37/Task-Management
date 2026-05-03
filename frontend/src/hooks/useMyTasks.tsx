import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyTasks, startTask, completeTask, createTask } from "../service";


export const useMyTasks = () => {
  return useQuery({
    queryKey: ["myTasks"],
    queryFn: getMyTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });
};

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });
};
