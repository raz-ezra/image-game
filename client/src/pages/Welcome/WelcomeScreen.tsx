import React from "react";
import { Flex } from "../../components/Layout";
import { Button } from "../../components/Button";
import { Variant } from "../../components/Colors";
import { WelcomeScreenProps } from "./Welcome";

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  goToCreateGame,
  goToJoinGame,
}) => {
  return (
    <Flex column gap={20}>
      <Button onClick={goToCreateGame}>Create Game</Button>
      <Button variant={Variant.secondary} onClick={goToJoinGame}>
        Join Game
      </Button>
    </Flex>
  );
};
