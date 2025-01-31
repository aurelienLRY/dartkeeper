"use client";

import { Game } from "@/types/game";
import { motion } from "framer-motion";

interface SavedGamesProps {
  games: Game[];
  onContinue: (game: Game) => void;
}

export function SavedGames({ games, onContinue }: SavedGamesProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-heading text-card-foreground text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Historique des parties
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 px-2">
        {games.map((game, index) => {
          const winner = game.players.find((p) => p.id === game.winner);
          return (
            <motion.div
              key={game.id}
              className="p-4 bg-card border border-border rounded-lg text-left shadow-md shadow-primary/30"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading text-primary">{game.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(game.startedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!game.isFinished && (
                  <button
                    onClick={() => onContinue(game)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                  >
                    Continuer
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      game.isFinished
                        ? "bg-green-600"
                        : "bg-orange-600 animate-pulse"
                    }`}
                  />
                  <span className="text-card-foreground">
                    {game.isFinished ? "Terminée" : "En cours"}
                  </span>
                </div>
                {winner && (
                  <p className="text-sm text-muted-foreground">
                    Gagnant :{" "}
                    <span className="text-primary">{winner.name}</span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Joueurs : {game.players.map((p) => p.name).join(", ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
