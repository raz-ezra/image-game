export interface Players {
  [playerId: string]: string;
}

export interface Game {
  id: string;
  players: Players;
  adminId: string;
}
