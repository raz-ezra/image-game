import React, { useState } from "react";
import { JoinGame } from "./JoinGame";
import { CreateGame } from "./CreateGame";
import { WelcomeScreen } from "./WelcomeScreen";
import { Button } from "../../components/Button";
import { Variant } from "../../components/Colors";
import { Flex } from "../../components/Layout";
import styled, { css, keyframes } from "styled-components";
import { TextInput } from "../../components/Input";

const entrance = keyframes`
  from {
    max-width: 0;
    max-height: 0;
    opacit: 0;
    scale: 0;
  }
  to {
    max-width: 500px;
    max-height: 500px;
    opacit: 1;
    scale: 1;
  }
`;

const Form = styled(Flex)<{ active: boolean }>`
  flex-direction: column;
  gap: 20px;
  transition: all 1s ease-in-out;
  animation: ${entrance} 1s ease-in-out;
  overflow: hidden;
  width: fit-content;
  height: fit-content;
  max-width: 0;
  max-height: 0;
  opacit: 0;
  scale: 0;

  ${({ active }) =>
    active &&
    css`
      max-width: 500px;
      max-height: 500px;
      opacit: 1;
      scale: 1;
    `}
`;

enum View {
  Welcome = "Welcome",
  CreateGame = "CreateGame",
  JoinGame = "JoinGame",
}

export interface WelcomeScreenProps {
  goBack: () => void;
  goToCreateGame: () => void;
  goToJoinGame: () => void;
}

const components: Record<View, React.FC<WelcomeScreenProps>> = {
  [View.Welcome]: WelcomeScreen, // This is never rendered, but it's required to satisfy the type checker
  [View.CreateGame]: CreateGame,
  [View.JoinGame]: JoinGame,
};

export const Welcome: React.FC = () => {
  const [view, setView] = useState<View>(View.Welcome);

  const createClickHandler = (view: View) => () => setView(view);

  return (
    <Flex column gap={20} style={{ alignItems: "center" }}>
      {view === View.CreateGame && (
        <Form active={view === View.CreateGame}>
          <TextInput />
        </Form>
      )}
      <Button
        onClick={createClickHandler(View.CreateGame)}
        fullWidth={view === View.CreateGame}
      >
        Create Game
      </Button>
      <Form active={view === View.JoinGame}>
        <TextInput />
        <TextInput />
      </Form>
      <Button
        variant={Variant.secondary}
        onClick={createClickHandler(View.JoinGame)}
        fullWidth={view === View.JoinGame}
      >
        Join Game
      </Button>
    </Flex>
  );
};
