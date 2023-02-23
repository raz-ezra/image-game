import React from "react";
import { ApiProvider } from "./providers/ApiProvider";
import { GameProvider } from "./providers/GameProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./pages/Welcome/Welcome";
import { Game } from "./pages/Game/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

function App() {
  return (
    <ApiProvider>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </ApiProvider>
  );
}

export default App;
