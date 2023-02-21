import React, { useCallback, useState } from "react";
import { useGame } from "../providers/GameProvider";

export const JoinGame: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const { joinGame } = useGame();

  const handleJoinGame = useCallback(() => {
    joinGame(playerName, gameId);
  }, [playerName, gameId, joinGame]);

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
};
