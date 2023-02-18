import { Request } from 'express';
import { Socket } from 'socket.io';

export type CreateGameFields = {
  playerName: string;
};

export type JoinGameFields = {
  gameId: string;
  playerName: string;

  playerId?: string;
};

export type AddPlayerFields = {
  gameId: string;
  playerId: string;
  playerName: string;
};

export type RemovePlayerFields = {
  gameId: string;
  playerId: string;
};

export type RejoinGameFields = object;

export type AuthPayload = {
  gameId: string;
  playerId: string;
  playerName: string;
};

export type RequestWithAuth = Request & AuthPayload;

export type SocketWithAuth = Socket & AuthPayload;
