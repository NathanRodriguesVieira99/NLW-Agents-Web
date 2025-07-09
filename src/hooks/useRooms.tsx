import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import type { GetRoomsResponse } from "@/@types/get-rooms-response";
import { api } from "@/lib/axios";

export const useRooms = () => {
  const fetchRooms = useCallback(async () => {
    try {
      const res = await api.get<GetRoomsResponse>("rooms");
      return res.data;
    } catch {
      throw new Error("Erro a buscar salas");
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: fetchRooms,
  });

  return { data, isLoading };
};
