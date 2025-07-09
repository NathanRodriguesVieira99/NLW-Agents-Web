import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/axios";

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
}>;

export const CreateRoom = () => {
  const fetchRooms = useCallback(async () => {
    try {
      const res = await api.get<GetRoomsAPIResponse>("rooms");
      return res.data;
    } catch {
      throw new Error("Erro a buscar salas");
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: fetchRooms,
  });

  return (
    <div>
      <div> Create Room</div>

      {isLoading && <p>Carregando...</p>}
      <div className="flex flex-col gap-1">
        {data?.map((room) => {
          return (
            <Link key={room.id} to={`/room/${room.id}`}>
              {room.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
