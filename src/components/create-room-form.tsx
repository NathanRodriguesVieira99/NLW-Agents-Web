import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateRoom } from "@/hooks/useCreateRoom";
import {
  type createRoomFormProps,
  createRoomFormSchema,
} from "@/schemas/createRoomFormSchema";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const CreateRoomForm = () => {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<createRoomFormProps>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreateRoom = async ({
    name,
    description,
  }: createRoomFormProps) => {
    await createRoom({ name, description });
    createRoomForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para começar a fazer perguntas e receber respostas
          da IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    {createRoomForm.formState.errors.name && <FormMessage />}
                  </FormItem>
                );
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {createRoomForm.formState.errors.description && (
                      <FormMessage />
                    )}
                  </FormItem>
                );
              }}
            />
            <Button className="w-full" type="submit">
              Criar sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
