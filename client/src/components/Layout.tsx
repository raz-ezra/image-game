import styled from "styled-components";

export const Flex = styled.div<{ column?: boolean; gap?: number }>`
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  gap: ${({ gap = 0 }) => gap}px;
`;
