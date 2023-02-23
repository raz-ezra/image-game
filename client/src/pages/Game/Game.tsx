import React from "react";
import { useGame } from "../../providers/GameProvider";
import { Navigate } from "react-router-dom";

export const Game: React.FC = () => {
  const { game, leaveGame } = useGame();

  if (!game) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ maxWidth: 200 }}>
      <div>{game?.id}</div>
      <div>{JSON.stringify(game?.playerIds)}</div>
      <button onClick={leaveGame}>Leave Game</button>
    </div>
  );
};
