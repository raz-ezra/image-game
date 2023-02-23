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
  createSocket: (setGame: (game: Game) => void) => void;
  closeSocketConnection: () => void;
  resetToken: () => void;
  isLoading: boolean;
}

export const ApiContext = React.createContext<ApiContextType>(
  {} as ApiContextType
);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      socket.current = null;
    }
    console.log("token", localStorage.getItem("accessToken"));
  }, [token]);

  const resetToken = useCallback(() => {
    setToken(null);
  }, []);

  const makeRequest = useCallback((endpoint: string, body: object) => {
    setIsLoading(true);
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
        setIsLoading(false);
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
    },
    [socket.current, token]
  );

  const closeSocketConnection = useCallback(() => {
    resetToken();
    socket.current?.close();
    socket.current = null;
  }, [resetToken, socket.current]);

  const contextValue = {
    makeRequest,
    socket: socket.current,
    createSocket,
    resetToken,
    isLoading,
    closeSocketConnection,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  return React.useContext(ApiContext);
};
