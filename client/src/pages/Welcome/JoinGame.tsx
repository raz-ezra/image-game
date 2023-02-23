import React, { useCallback, useState } from "react";
import { useGame } from "../../providers/GameProvider";
import { TextInput } from "../../components/Input";
import { WelcomeScreenWrapper } from "./WelcomeScreenWrapper";
import { Variant } from "../../components/Colors";

interface CreateGameProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  navigateToGame: () => void;
}
export const JoinGame: React.FC<CreateGameProps> = ({
  isActive,
  setIsActive,
  navigateToGame,
}) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const { joinGame } = useGame();

  const handleCreateGame = useCallback(async () => {
    await joinGame(playerName, gameId);
    navigateToGame();
  }, [playerName, gameId]);

  return (
    <WelcomeScreenWrapper
      isActive={isActive}
      setIsActive={setIsActive}
      cta={{
        text: "Join Game",
        onClick: handleCreateGame,
        variant: Variant.secondary,
      }}
    >
      <TextInput
        value={playerName}
        placeholder="Player Name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <TextInput
        value={gameId}
        placeholder="Game ID"
        onChange={(e) => setGameId(e.target.value)}
      />
    </WelcomeScreenWrapper>
  );
};
