import { z } from "zod/v4";

export const createRoomFormSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
  description: z.string(),
});

export type createRoomFormProps = z.infer<typeof createRoomFormSchema>;
