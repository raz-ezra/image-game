export interface Players {
  [playerId: string]: string;
}

export type Image = {
  playerId: string;
  prompt: string;
  url: string;
};

export interface Game {
  id: string;
  players: Players;
  adminId: string;
  images: Image[];
}
