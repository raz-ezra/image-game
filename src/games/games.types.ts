export type CreateGameFields = {
  playerName: string;
};

export type JoinGameFields = {
  gameId: string;
  playerName: string;
};

export type RejoinGameFields = object;

type AuthPayload = {
  gameId: string;
  playerId: string;
  displayName: string;
};

export type RequestWithAuth = Request & AuthPayload;
