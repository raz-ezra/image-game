import React from "react";
import { Pages } from "./Pages";
import { ApiProvider } from "./providers/ApiProvider";
import { GameProvider } from "./providers/GameProvider";

function App() {
  return (
    <ApiProvider>
      <GameProvider>
        <Pages />
      </GameProvider>
    </ApiProvider>
  );
}

export default App;
