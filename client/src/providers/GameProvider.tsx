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
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);
export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [game, setGame] = useState<Game | null>(null);
  const { makeRequest, createSocket, resetToken } = useApi();

  useEffect(() => {
    createSocket(setGame);
  }, [createSocket]);

  const createGame = useCallback((playerName: string) => {
    resetToken();
    makeRequest("/api/games/create", { playerName });
  }, []);

  const joinGame = useCallback((playerName: string, gameId: string) => {
    resetToken();
    makeRequest("/api/games/join", { playerName, gameId });
  }, []);

  const contextValue = {
    game,
    createGame,
    joinGame,
    setGame,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
