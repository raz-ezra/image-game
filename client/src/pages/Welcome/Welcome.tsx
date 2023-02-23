import React, { useCallback, useState } from "react";
import { CreateGame } from "./CreateGame";
import { Flex } from "../../components/Layout";
import { JoinGame } from "./JoinGame";
import { useNavigate } from "react-router-dom";

enum View {
  Welcome = "Welcome",
  CreateGame = "CreateGame",
  JoinGame = "JoinGame",
}

export const Welcome: React.FC = () => {
  const [view, setView] = useState<View | null>(View.Welcome);
  const navigate = useNavigate();

  const createClickHandler = useCallback(
    (view: View) => (isActive: boolean) => {
      isActive ? setView(view) : setView(View.Welcome);
    },
    []
  );

  const navigateToGame = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  return (
    <Flex
      column
      gap={20}
      style={{ alignItems: "center", position: "relative" }}
    >
      <CreateGame
        isActive={view === View.CreateGame}
        setIsActive={createClickHandler(View.CreateGame)}
        navigateToGame={navigateToGame}
      />
      <JoinGame
        isActive={view === View.JoinGame}
        setIsActive={createClickHandler(View.JoinGame)}
        navigateToGame={navigateToGame}
      />
    </Flex>
  );
};
