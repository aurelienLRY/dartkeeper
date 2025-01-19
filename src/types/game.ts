export type GameType = "301" | "501" | "701" | "Around the Clock";

export interface PlayerStats {
  gamesPlayed: number;
  gamesWon: number;
  averageScore: number;
  bestScore: number;
  lastPlayed: string;
}

export interface RegisteredPlayer {
  id: string;
  name: string;
  avatar: string;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    averageScore: number;
    bestScore: number;
    lastPlayed: string;
  };
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Game {
  id: string;
  type: GameType;
  players: Player[];
  currentPlayerIndex: number;
  startedAt: string;
  lastUpdatedAt: string;
  isFinished: boolean;
  winner?: string;
}

export interface GameState {
  currentGame?: Game;
  savedGames: Game[];
  registeredPlayers: RegisteredPlayer[];
}
