import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest } from "@/@types/create-room-request";
import type { CreateRoomResponse } from "@/@types/create-room-response";
import { api } from "@/lib/axios";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  const createRoom = async (
    data: CreateRoomRequest
  ): Promise<CreateRoomResponse> => {
    const res = await api.post("rooms", data);

    return res.data;
  };

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-rooms"] });
    },
  });
};
