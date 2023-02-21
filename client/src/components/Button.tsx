import styled from "styled-components";
import { Colors, Variant } from "./Colors";

interface ButtonVariants {
  backgroundColor: string;
  color: string;
}

const Variants: Record<Variant, ButtonVariants> = {
  [Variant.primary]: {
    backgroundColor: Colors[Variant.primary],
    color: Colors.white,
  },
  [Variant.secondary]: {
    backgroundColor: Colors[Variant.secondary],
    color: Colors[Variant.primary],
  },
};

export const Button = styled.button<{ variant?: Variant; fullWidth?: boolean }>`
  border-radius: 8px;
  border: none;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${({ variant }) =>
    Variants[variant || Variant.primary].backgroundColor};
  color: ${({ variant }) => Variants[variant || Variant.primary].color};
  cursor: pointer;
  transition: all 0.25s;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "fit-content")};

  :hover {
    scale: 1.1;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  }
`;
