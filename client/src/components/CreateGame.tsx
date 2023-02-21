import React, { useCallback, useState } from "react";
import { useGame } from "../providers/GameProvider";

export const CreateGame: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const { createGame } = useGame();

  const handleCreateGame = useCallback(() => {
    createGame(playerName);
  }, [playerName]);

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};
