interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
}

export interface QuestionItemProps {
  question: Question;
}

export interface QuestionFormProps {
  roomId: string;
}
