import React, { useCallback, useState } from "react";
import { useGame } from "../../providers/GameProvider";
import { Flex } from "../../components/Layout";
import { Button } from "../../components/Button";

export const CreateGame: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const { createGame } = useGame();

  const handleCreateGame = useCallback(() => {
    createGame(playerName);
  }, [playerName]);

  return (
    <Flex column gap={20}>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button onClick={handleCreateGame}>Create Game</Button>
    </Flex>
  );
};
