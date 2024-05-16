// Lib
// -----------------------------------------------------------------------------
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ListOfTasks,
  Task,
  TaskToCreate,
  TaskToUpdate,
  ParamsWithId,
  StringResponse,
} from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { axiosClient } from "./axiosClient";

// Consts
// -----------------------------------------------------------------------------
const TASKS_QUERY_KEY_BASE = "tasks";

export const useGetTasksListQuery = () => {
  return useQuery({
    queryKey: [TASKS_QUERY_KEY_BASE],
    queryFn: async () => {
      const res = await axiosClient.get<ListOfTasks>("/tasks");
      return res.data;
    },
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskToCreate) => {
      const res = await axiosClient.post<Task>("/tasks", data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY_BASE] });
    },
  });
};

export const useGetTaskQuery = ({ id }: ParamsWithId) => {
  return useQuery({
    queryKey: [TASKS_QUERY_KEY_BASE, id],
    queryFn: async () => {
      const res = await axiosClient.get<Task>(`/tasks/${id}`);
      return res.data;
    },
  });
};

export const useUpdateTaskMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskToUpdate) => {
      const res = await axiosClient.patch<Task>(`/tasks/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY_BASE] });
    },
  });
};

export const useDeleteTaskMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<StringResponse>(`/tasks/${id}`);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY_BASE] });
    },
  });
};
