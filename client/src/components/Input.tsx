import styled from "styled-components";
import { Colors } from "./Colors";

export const TextInput = styled.input.attrs({ type: "text" })`
  width: 200px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${Colors.black};
`;
