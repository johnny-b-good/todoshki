// Lib
// -----------------------------------------------------------------------------
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ListOfSections,
  Section,
  SectionToCreate,
  SectionToUpdate,
  ParamsWithId,
  StringResponse,
  SectionMovement,
} from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { axiosClient } from "./axiosClient";
import { BOARDS_QUERY_KEY_BASE } from "./boardsApi";

// Consts
// -----------------------------------------------------------------------------
export const SECTIONS_QUERY_KEY_BASE = "sections";

export const useGetSectionsListQuery = () => {
  return useQuery({
    queryKey: [SECTIONS_QUERY_KEY_BASE],
    queryFn: async () => {
      const res = await axiosClient.get<ListOfSections>("/sections");
      return res.data;
    },
  });
};

export const useCreateSectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SectionToCreate) => {
      const res = await axiosClient.post<Section>("/sections", data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [SECTIONS_QUERY_KEY_BASE],
      });
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useGetSectionQuery = ({ id }: ParamsWithId) => {
  return useQuery({
    queryKey: [SECTIONS_QUERY_KEY_BASE, id],
    queryFn: async () => {
      const res = await axiosClient.get<Section>(`/sections/${id}`);
      return res.data;
    },
  });
};

export const useUpdateSectionMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SectionToUpdate) => {
      const res = await axiosClient.patch<Section>(`/sections/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [SECTIONS_QUERY_KEY_BASE],
      });
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useDeleteSectionMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<StringResponse>(`/sections/${id}`);
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [SECTIONS_QUERY_KEY_BASE],
      });
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};

export const useMoveSectionMutation = ({ id }: ParamsWithId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SectionMovement) => {
      const res = await axiosClient.post<StringResponse>(
        `/sections/${id}/move`,
        data,
      );
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [SECTIONS_QUERY_KEY_BASE],
      });
      void queryClient.invalidateQueries({ queryKey: [BOARDS_QUERY_KEY_BASE] });
    },
  });
};
