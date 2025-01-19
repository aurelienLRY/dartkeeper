"use client";

import { Game } from "@/types/game";

interface SavedGamesProps {
  games: Game[];
  onContinue: (game: Game) => void;
}

export function SavedGames({ games, onContinue }: SavedGamesProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading text-card-foreground">
        Historique des parties
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => {
          const winner = game.players.find((p) => p.id === game.winner);
          return (
            <div
              key={game.id}
              className="p-4 bg-card border border-border rounded-lg text-left shadow-md shadow-primary/30 "
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
                      game.isFinished ? "bg-accent" : "bg-primary animate-pulse"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
