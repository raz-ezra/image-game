import React, { useCallback, useState } from "react";
import { useGame } from "../../providers/GameProvider";
import { TextInput } from "../../components/Input";
import { WelcomeScreenWrapper } from "./WelcomeScreenWrapper";

interface CreateGameProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  navigateToGame: () => void;
}
export const CreateGame: React.FC<CreateGameProps> = ({
  isActive,
  setIsActive,
  navigateToGame,
}) => {
  const [playerName, setPlayerName] = useState<string>("");
  const { createGame } = useGame();

  const handleCreateGame = useCallback(async () => {
    await createGame(playerName);
    navigateToGame();
  }, [playerName]);

  return (
    <WelcomeScreenWrapper
      isActive={isActive}
      setIsActive={setIsActive}
      cta={{ text: "Create Game", onClick: handleCreateGame }}
    >
      <TextInput
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
    </WelcomeScreenWrapper>
  );
};
