import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GameState, Game, Player, RegisteredPlayer } from "@/types/game";
import {
  GameType,
  getInitialScore,
  MAX_SAVED_GAMES,
} from "@/types/constants/game-constants";

type GameStep = "initial" | "type-selection" | "player-selection" | "game";

const STORAGE_KEY = "dartKeeperState";

interface UseGameState {
  gameState: GameState;
  step: GameStep;
  selectedType: GameType | null;
  actions: {
    startNewGame: () => void;
    selectGameType: (type: GameType) => void;
    addNewPlayer: (name: string) => void;
    addPlayerToGame: (playerId: string) => void;
    startGame: () => void;
    exitGame: () => void;
    abandonGame: () => void;
    continueGame: (game: Game) => void;
    updateScore: (playerId: string, points: number) => void;
    finishGame: (winnerId: string) => void;
    isCurrentPlayer: (player: Player) => boolean;
    removePlayerFromGame: (playerId: string) => void;
    deleteRegisteredPlayer: (playerId: string) => void;
  };
}

const createEmptyStats = () => ({
  gamesPlayed: 0,
  gamesWon: 0,
  averageScore: 0,
  bestScore: 0,
  lastPlayed: new Date().toISOString(),
});

/**
 * Hook personnalisé pour gérer l'état du jeu
 * @returns {UseGameState} État et actions du jeu
 */
export function useGameState(): UseGameState {
  const [step, setStep] = useState<GameStep>("initial");
  const [gameState, setGameState] = useState<GameState>({
    savedGames: [],
    registeredPlayers: [],
  });
  const [selectedType, setSelectedType] = useState<GameType | null>(null);

  // Charger l'état depuis le localStorage au démarrage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const state = JSON.parse(savedState);
      setGameState(state);
      if (state.currentGame) {
        setStep("game");
      }
    }
  }, []);

  // Sauvegarder l'état dans le localStorage
  const saveState = (newState: Partial<GameState>) => {
    const updatedState = { ...gameState, ...newState };
    setGameState(updatedState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
  };

  // Actions du jeu
  const actions = {
    startNewGame: () => {
      setStep("type-selection");
    },

    selectGameType: (type: GameType) => {
      setSelectedType(type);
      setStep("player-selection");
    },

    addNewPlayer: (name: string) => {
      const newPlayer: RegisteredPlayer = {
        id: uuidv4(),
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          name
        )}`,
        stats: createEmptyStats(),
      };

      saveState({
        registeredPlayers: [...gameState.registeredPlayers, newPlayer],
      });

      actions.addPlayerToGame(newPlayer.id);
    },

    addPlayerToGame: (playerId: string) => {
      if (!selectedType) return;

      const registeredPlayer = gameState.registeredPlayers.find(
        (p) => p.id === playerId
      );
      if (!registeredPlayer) return;

      const newPlayer: Player = {
        id: playerId,
        name: registeredPlayer.name,
        score: getInitialScore(selectedType),
      };

      const currentGame = gameState.currentGame || {
        id: uuidv4(),
        type: selectedType,
        players: [],
        currentPlayerIndex: 0,
        startedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        isFinished: false,
      };

      const updatedGame = {
        ...currentGame,
        players: [...currentGame.players, newPlayer],
      };

      saveState({
        ...gameState,
        currentGame: updatedGame,
      });
    },

    startGame: () => {
      if (gameState.currentGame && gameState.currentGame.players.length >= 2) {
        setStep("game");
      }
    },

    exitGame: () => {
      if (!gameState.currentGame) return;

      // Sauvegarder la partie en cours sans la marquer comme terminée
      const updatedGame = {
        ...gameState.currentGame,
        lastUpdatedAt: new Date().toISOString(),
      };

      // Sauvegarder la partie dans l'historique
      const updatedGames = [
        updatedGame,
        ...gameState.savedGames.filter((g) => g.id !== updatedGame.id),
      ].slice(0, MAX_SAVED_GAMES);

      saveState({
        savedGames: updatedGames,
        currentGame: undefined,
      });
      setStep("initial");
    },

    abandonGame: () => {
      if (!gameState.currentGame) return;

      const updatedGame = {
        ...gameState.currentGame,
        isFinished: true,
        lastUpdatedAt: new Date().toISOString(),
      };

      // Mettre à jour les statistiques des joueurs pour compter la partie jouée
      const updatedPlayers = gameState.registeredPlayers.map((player) => {
        // Vérifier si le joueur a participé à la partie
        const gamePlayer = gameState.currentGame!.players.find(
          (p) => p.id === player.id
        );
        if (!gamePlayer) return player;

        // Mettre à jour uniquement le nombre de parties jouées
        return {
          ...player,
          stats: {
            ...player.stats,
            gamesPlayed: player.stats.gamesPlayed + 1,
            lastPlayed: new Date().toISOString(),
          },
        };
      });

      // Sauvegarder la partie dans l'historique
      const updatedGames = [
        updatedGame,
        ...gameState.savedGames.filter((g) => g.id !== updatedGame.id),
      ].slice(0, MAX_SAVED_GAMES);

      saveState({
        savedGames: updatedGames,
        registeredPlayers: updatedPlayers,
        currentGame: undefined,
      });
      setStep("initial");
    },

    continueGame: (game: Game) => {
      saveState({ ...gameState, currentGame: game });
      setStep("game");
    },

    updateScore: (playerId: string, points: number) => {
      if (!gameState.currentGame) return;

      const updatedPlayers = gameState.currentGame.players.map((player) =>
        player.id === playerId
          ? { ...player, score: Math.max(0, player.score - points) }
          : player
      );

      const currentPlayer = updatedPlayers.find((p) => p.id === playerId);
      if (currentPlayer?.score === 0) {
        actions.finishGame(playerId);
        return;
      }

      const currentPlayerIndex =
        (gameState.currentGame.currentPlayerIndex + 1) %
        gameState.currentGame.players.length;

      const updatedGame = {
        ...gameState.currentGame,
        players: updatedPlayers,
        currentPlayerIndex,
        lastUpdatedAt: new Date().toISOString(),
      };

      saveState({
        ...gameState,
        currentGame: updatedGame,
      });
    },

    finishGame: (winnerId: string) => {
      if (!gameState.currentGame) return;

      const updatedGame = {
        ...gameState.currentGame,
        isFinished: true,
        winner: winnerId,
        lastUpdatedAt: new Date().toISOString(),
      };

      // Mettre à jour les statistiques des joueurs uniquement si la partie a un gagnant
      let updatedPlayers = gameState.registeredPlayers;
      if (winnerId) {
        updatedPlayers = gameState.registeredPlayers.map((player) => {
          // Vérifier si le joueur a participé à la partie
          const gamePlayer = gameState.currentGame!.players.find(
            (p) => p.id === player.id
          );
          if (!gamePlayer) return player;

          // Calculer les nouvelles statistiques
          const isWinner = player.id === winnerId;
          const newStats = {
            ...player.stats,
            gamesPlayed: player.stats.gamesPlayed + 1,
            gamesWon: isWinner
              ? player.stats.gamesWon + 1
              : player.stats.gamesWon,
            lastPlayed: new Date().toISOString(),
          };

          // Mettre à jour le meilleur score si c'est une victoire
          if (isWinner) {
            const finalScore = gamePlayer.score;
            newStats.bestScore = Math.max(finalScore, player.stats.bestScore);
          }

          // Calculer la nouvelle moyenne des scores
          const totalGames = newStats.gamesPlayed;
          const currentAverage = player.stats.averageScore;
          const newScore = gamePlayer.score;
          newStats.averageScore = Math.round(
            (currentAverage * (totalGames - 1) + newScore) / totalGames
          );

          return {
            ...player,
            stats: newStats,
          };
        });
      }

      // Sauvegarder la partie dans l'historique
      const updatedGames = [
        updatedGame,
        ...gameState.savedGames.filter((g) => g.id !== updatedGame.id),
      ].slice(0, MAX_SAVED_GAMES);

      // Mettre à jour l'état global
      saveState({
        savedGames: updatedGames,
        registeredPlayers: updatedPlayers,
        currentGame: undefined,
      });
      setStep("initial");
    },

    isCurrentPlayer: (player: Player) => {
      if (!gameState.currentGame) return false;
      return (
        player.id ===
        gameState.currentGame.players[gameState.currentGame.currentPlayerIndex]
          .id
      );
    },

    removePlayerFromGame: (playerId: string) => {
      if (!gameState.currentGame) return;

      const updatedGame = {
        ...gameState.currentGame,
        players: gameState.currentGame.players.filter((p) => p.id !== playerId),
      };

      saveState({
        ...gameState,
        currentGame: updatedGame,
      });
    },

    deleteRegisteredPlayer: (playerId: string) => {
      // Supprimer le joueur de la liste des joueurs enregistrés
      const updatedPlayers = gameState.registeredPlayers.filter(
        (p) => p.id !== playerId
      );

      // Si le joueur est dans la partie en cours, le retirer aussi
      let updatedCurrentGame = gameState.currentGame;
      if (
        updatedCurrentGame &&
        updatedCurrentGame.players.some((p) => p.id === playerId)
      ) {
        updatedCurrentGame = {
          ...updatedCurrentGame,
          players: updatedCurrentGame.players.filter((p) => p.id !== playerId),
        };
      }

      saveState({
        ...gameState,
        registeredPlayers: updatedPlayers,
        currentGame: updatedCurrentGame,
      });
    },
  };

  return {
    gameState,
    step,
    selectedType,
    actions,
  };
}
