import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "@/@types/create-question-request";
import type { CreateQuestionResponse } from "@/@types/create-question-response";
import type { GetRoomQuestionResponse } from "@/@types/get-room-questions-response";
import { api } from "@/lib/axios";

export const useCreateQuestion = (roomId: string) => {
  const queryClient = useQueryClient();

  const createQuestion = async (data: CreateQuestionRequest) => {
    await api.post<CreateQuestionResponse>(`rooms/${roomId}/questions`, data);

    return { data };
  };

  return useMutation({
    mutationFn: createQuestion,

    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionResponse>([
        "get-questions",
        roomId,
      ]);

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomQuestionResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions) {
            return questions;
          }

          if (!context.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId, //  !FIX corrigir erro Property 'questionId' does not exist on type '{ data: CreateQuestionRequest; }'
                answer: data.answer, //  !FIX corrigir erro Property 'answer' does not exist on type '{ data: CreateQuestionRequest; }'
                isGeneratingAnswer: false,
              };
            }
            return question;
          });
        }
      );
    },
    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionResponse>(
          ["get-questions", roomId],
          context.questions
        );
      }
    },
  });
};
