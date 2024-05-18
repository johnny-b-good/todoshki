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
  TaskMovement,
} from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { axiosClient } from "./axiosClient";
import { BOARDS_QUERY_KEY_BASE } from "./boardsApi";

// Consts
// -----------------------------------------------------------------------------
export const TASKS_QUERY_KEY_BASE = "tasks";

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
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
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
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
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
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useMoveTaskMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskMovement) => {
      const res = await axiosClient.post<StringResponse>(
        `/tasks/${id}/move`,
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [TASKS_QUERY_KEY_BASE],
      });
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};
