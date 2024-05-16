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
} from "@todoshki/schemas";

// App
// -----------------------------------------------------------------------------
import { axiosClient } from "./axiosClient";

// Consts
// -----------------------------------------------------------------------------
const SECTIONS_QUERY_KEY_BASE = "sections";

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
    },
  });
};