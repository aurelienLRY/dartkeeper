"use client";

import { Game, RegisteredPlayer } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ScoreInput } from "./ScoreInput";

interface GameBoardProps {
  game: Game;
  registeredPlayers: RegisteredPlayer[];
  onUpdateScore: (playerId: string, points: number) => void;
  onExitGame: () => void;
  onAbandonGame: () => void;
}

/**
 * Composant d'affichage du plateau de jeu
 */
export function GameBoard({
  game,
  registeredPlayers,
  onUpdateScore,
  onExitGame,
  onAbandonGame,
}: GameBoardProps) {
  const currentPlayer = game.players[game.currentPlayerIndex];
  const otherPlayers = game.players.filter(
    (player) => player.id !== currentPlayer.id
  );

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-heading text-card-foreground">
              {game.type}
            </h2>
            <p className="text-sm text-muted-foreground">
              Démarré le{" "}
              {new Date(game.startedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onExitGame}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-card-foreground bg-card border border-border rounded-lg"
            >
              Quitter
            </button>
            <button
              onClick={onAbandonGame}
              className="px-3 py-1 text-sm text-destructive hover:text-white hover:bg-destructive/90 bg-card border border-destructive/90 rounded-lg transition-colors duration-300"
            >
              Abandonner
            </button>
          </div>
        </div>

        {/* Autres joueurs en ligne */}
        <div className="grid grid-cols-3 gap-2">
          <AnimatePresence mode="popLayout">
            {otherPlayers.map((player) => {
              const registeredPlayer = registeredPlayers.find(
                (p) => p.id === player.id
              );
              return (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="p-2 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {registeredPlayer?.avatar && (
                      <Image
                        src={registeredPlayer.avatar}
                        alt={`Avatar de ${player.name}`}
                        width={24}
                        height={24}
                        className="rounded-full bg-background"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-card-foreground">
                        {player.name}
                      </div>
                      <div className="text-sm font-heading text-muted-foreground">
                        {player.score}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Joueur actif */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="p-6 bg-accent rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div>
                  {registeredPlayers.find((p) => p.id === currentPlayer.id)
                    ?.avatar && (
                    <Image
                      src={
                        registeredPlayers.find(
                          (p) => p.id === currentPlayer.id
                        )!.avatar
                      }
                      alt={`Avatar de ${currentPlayer.name}`}
                      width={48}
                      height={48}
                      className="rounded-full bg-background"
                    />
                  )}
                </motion.div>
                <div>
                  <div className="font-medium text-lg text-card-foreground">
                    {currentPlayer.name}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground"
                  >
                    Au tour de jouer
                  </motion.div>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-4xl font-heading text-card-foreground"
              >
                {currentPlayer.score}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Partie droite : saisie du score */}
      <div className="sticky top-4">
        <ScoreInput
          onUpdateScore={(points) => onUpdateScore(currentPlayer.id, points)}
        />
      </div>
    </div>
  );
}
