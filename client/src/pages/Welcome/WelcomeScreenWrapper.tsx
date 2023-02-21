import React, { ReactNode, useCallback } from "react";
import { Flex } from "../../components/Layout";
import { Button } from "../../components/Button";
import { GrowIn } from "../../components/animations/GrowIn";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Variant } from "../../components/Colors";

const Form = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  transition: all;
`;

const MotionButton = motion(Button);

const transitionDuration = 1;

interface WelcomeScreenWrapperProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  children: ReactNode;
  cta: { text: string; onClick: () => void; variant?: Variant };
}
export const WelcomeScreenWrapper: React.FC<WelcomeScreenWrapperProps> = ({
  isActive,
  cta,
  children,
  setIsActive,
}) => {
  const handleClick = useCallback(() => {
    isActive ? cta.onClick() : setIsActive(true);
  }, [isActive, setIsActive, cta.onClick]);

  return (
    <Flex
      column
      gap={20}
      style={{
        alignItems: "center",
        transform: `scale(${isActive ? 1.1 : 1}`,
        transition: `transform ${transitionDuration}s ease-in-out`,
      }}
    >
      <GrowIn isActive={isActive} id={cta.text} duration={transitionDuration}>
        <Form>{children}</Form>
      </GrowIn>
      <MotionButton
        onClick={handleClick}
        variant={cta.variant}
        transition={{ duration: transitionDuration }}
      >
        {cta.text}
      </MotionButton>
    </Flex>
  );
};
