import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createSocketWithHandlers, socketIOUrl } from "../socket-io";
import { Socket } from "socket.io-client";
import { Game } from "shared/gamesTypes";

interface ApiContextType {
  makeRequest: (endpoint: string, body: object) => Promise<any>;
  socket: Socket | null;
  createSocket: (setGame: (game: Game) => void) => Socket;
  resetToken: () => void;
}

export const ApiContext = React.createContext<ApiContextType>(
  {} as ApiContextType
);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    {
      socket.current = null;
    }
    console.log("token", localStorage.getItem("accessToken"));
  }, [token]);

  const resetToken = () => {
    setToken(null);
  };

  const makeRequest = useCallback((endpoint: string, body: object) => {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.accessToken) {
          setToken(data.accessToken);
        }
        return data;
      });
  }, []);

  const createSocket = useCallback(
    (setGame: (game: Game) => void) => {
      if (!socket.current && token) {
        socket.current = createSocketWithHandlers({
          socketIOUrl,
          token,
          setGame,
        });
      }
      return socket.current as Socket;
    },
    [socket.current, token]
  );

  const contextValue = {
    makeRequest,
    socket: socket.current,
    createSocket,
    resetToken,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  return React.useContext(ApiContext);
};
