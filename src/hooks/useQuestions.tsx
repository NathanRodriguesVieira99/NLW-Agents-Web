import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import type { GetRoomQuestionResponse } from "@/@types/get-room-questions-response";
import { api } from "@/lib/axios";

export const useRoomQuestions = (roomId: string) => {
  const fetchQuestions = useCallback(async () => {
    try {
      const res = await api.get<GetRoomQuestionResponse>(`rooms/${roomId}/questions`);
      return res.data;
    } catch {
      throw new Error("Erro a buscar perguntas");
    }
  }, [roomId]);

  const { data } = useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: fetchQuestions,
  });

  return { data };
};
