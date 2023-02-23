import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi } from "./ApiProvider";
import { Game } from "shared/gamesTypes";

interface GameContextType {
  game: Game | null;
  createGame: (playerName: string) => void;
  joinGame: (playerName: string, gameId: string) => void;
  setGame: (game: Game | null) => void;
  isLoading: boolean;
  leaveGame: () => void;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [game, setGame] = useState<Game | null>(null);
  const {
    makeRequest,
    createSocket,
    resetToken,
    isLoading,
    socket,
    closeSocketConnection,
  } = useApi();

  useEffect(() => {
    createSocket(setGame);
  }, [createSocket]);

  const createGame = useCallback(async (playerName: string) => {
    resetToken();
    await makeRequest("/api/games/create", { playerName });
  }, []);

  const joinGame = useCallback(async (playerName: string, gameId: string) => {
    resetToken();
    await makeRequest("/api/games/join", { playerName, gameId });
  }, []);

  const leaveGame = useCallback(async () => {
    closeSocketConnection();
    setGame(null);
  }, [closeSocketConnection]);

  const contextValue = {
    game,
    createGame,
    joinGame,
    setGame,
    isLoading,
    leaveGame,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
