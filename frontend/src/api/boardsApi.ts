// Lib
// -----------------------------------------------------------------------------
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ListOfBoards,
  Board,
  BoardFull,
  BoardToCreate,
  BoardToUpdate,
  ParamsWithId,
  StringResponse,
} from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { axiosClient } from "./axiosClient";

// Consts
// -----------------------------------------------------------------------------
export const BOARDS_QUERY_KEY_BASE = "boards";

export const useGetBoardsListQuery = () => {
  return useQuery({
    queryKey: [BOARDS_QUERY_KEY_BASE],
    queryFn: async () => {
      const res = await axiosClient.get<ListOfBoards>("/boards");
      return res.data;
    },
  });
};

export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BoardToCreate) => {
      const res = await axiosClient.post<Board>("/boards", data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useCreateBoardWithDefaultSectionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BoardToCreate) => {
      const res = await axiosClient.post<Board>(
        "/boards/createWithDefaultSections",
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useGetBoardQuery = ({ id }: ParamsWithId) => {
  return useQuery({
    queryKey: [BOARDS_QUERY_KEY_BASE, id],
    queryFn: async () => {
      const res = await axiosClient.get<Board>(`/boards/${id}`);
      return res.data;
    },
  });
};

export const useGetBoardFullQuery = ({ id }: ParamsWithId) => {
  return useQuery({
    queryKey: [BOARDS_QUERY_KEY_BASE, id, "FULL"],
    queryFn: async () => {
      const res = await axiosClient.get<BoardFull>(`/boards/${id}/full`);
      return res.data;
    },
  });
};

export const useUpdateBoardMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BoardToUpdate) => {
      const res = await axiosClient.patch<Board>(`/boards/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useDeleteBoardMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<StringResponse>(`/boards/${id}`);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};
