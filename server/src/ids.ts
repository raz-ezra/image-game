import { customAlphabet, nanoid } from 'nanoid';

export const createGameId = customAlphabet(
  '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  6,
);

export const createPlayerId = () => nanoid();

export const createImageId = () => nanoid(8);
