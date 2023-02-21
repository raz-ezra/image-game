import React from "react";
import { CreateGame } from "./components/CreateGame";
import { JoinGame } from "./components/JoinGame";
import { GameContext } from "./providers/GameProvider";

export const Pages: React.FC = () => {
  const { game } = React.useContext(GameContext);
  return (
    <div style={{ maxWidth: 200 }}>
      <CreateGame />
      <JoinGame />
      <div>{game?.id}</div>
      <div>{JSON.stringify(game?.playerIds)}</div>
    </div>
  );
};
