import React from "react";
import { CreateGame } from "./pages/Welcome/CreateGame";
import { JoinGame } from "./pages/Welcome/JoinGame";
import { GameContext } from "./providers/GameProvider";
import { Welcome } from "./pages/Welcome/Welcome";

export const Pages: React.FC = () => {
  const { game } = React.useContext(GameContext);

  if (!game) {
    return <Welcome />;
  }

  return (
    <div style={{ maxWidth: 200 }}>
      <CreateGame />
      <JoinGame />
      <div>{game?.id}</div>
      <div>{JSON.stringify(game?.playerIds)}</div>
    </div>
  );
};
