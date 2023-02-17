// service types
export type CreateGameFields = {
  playerName: string;
};

export type JoinGameFields = {
  gameId: string;
  playerName: string;
};

export type RejoinGameFields = object;

// repository types
