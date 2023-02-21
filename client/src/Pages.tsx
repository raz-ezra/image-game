import React from "react";
import { useGame } from "./providers/GameProvider";
import { Welcome } from "./pages/Welcome/Welcome";

export const Pages: React.FC = () => {
  const { game, setGame } = useGame();

  if (!game) {
    return <Welcome />;
  }

  return (
    <div style={{ maxWidth: 200 }}>
      <div>{game?.id}</div>
      <div>{JSON.stringify(game?.playerIds)}</div>
      <button onClick={() => setGame(null)}>Leave Game</button>
    </div>
  );
};
