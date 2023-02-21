import { io, Socket } from "socket.io-client";
import { Game } from "shared/gamesTypes";

export const socketIOUrl = "http://localhost:8080/games";

type CreateSocketOptions = {
  socketIOUrl: string;
  token: string;
  setGame: (game: Game) => void;
};

export const createSocketWithHandlers = ({
  socketIOUrl,
  token,
  setGame,
}: CreateSocketOptions): Socket => {
  const socket = io(socketIOUrl, {
    auth: {
      token,
    },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log(`Connected to ${socketIOUrl} with accessToken`);
  });

  socket.on("game_updated", (game) => {
    setGame(game);
  });

  return socket;
};
