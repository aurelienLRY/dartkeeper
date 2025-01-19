"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { GameTypeSelector } from "@/components/game/GameTypeSelector";
import { SavedGames } from "@/components/saved-games";
import { PlayerSelector } from "@/components/player-selector";
import { GameBoard } from "@/components/game/GameBoard";
import { useGameState } from "@/hooks/useGameState";

/**
 * Page principale de l'application
 */
export default function Home() {
  const { gameState, step, actions } = useGameState();

  return (
    <main className="min-h-screen p-8 bg-muted font-sans">
      <ThemeToggle />
      <h1 className="text-4xl font-heading mb-8 text-center text-primary tracking-tight">
        DartKeeper
      </h1>

      <div className="max-w-2xl mx-auto space-y-8">
        {step === "initial" && (
          <div className="space-y-8">
            <SavedGames
              games={gameState.savedGames}
              onContinue={actions.continueGame}
            />
            <div className="flex justify-center">
              <button
                onClick={actions.startNewGame}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
              >
                Nouvelle Partie
              </button>
            </div>
          </div>
        )}

        {step === "type-selection" && (
          <div className="bg-card p-6 rounded-lg shadow-md">
            <GameTypeSelector onSelect={actions.selectGameType} />
          </div>
        )}

        {step === "player-selection" && (
          <div className="bg-card p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-heading text-card-foreground">
              Sélectionner les joueurs
            </h2>
            <PlayerSelector
              registeredPlayers={gameState.registeredPlayers}
              selectedPlayers={gameState.currentGame?.players ?? []}
              onSelectPlayer={actions.addPlayerToGame}
              onAddNewPlayer={actions.addNewPlayer}
              onRemovePlayer={actions.removePlayerFromGame}
              onDeleteRegisteredPlayer={actions.deleteRegisteredPlayer}
            />
            {gameState.currentGame?.players &&
              gameState.currentGame.players.length >= 2 && (
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    onClick={actions.exitGame}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-card-foreground"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={actions.startGame}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-sm font-medium"
                  >
                    Commencer la partie
                  </button>
                </div>
              )}
          </div>
        )}

        {step === "game" && gameState.currentGame && (
          <div className="bg-card p-6 rounded-lg shadow-md">
            <GameBoard
              game={gameState.currentGame}
              registeredPlayers={gameState.registeredPlayers}
              onUpdateScore={actions.updateScore}
              onExitGame={actions.exitGame}
              onAbandonGame={actions.abandonGame}
              isCurrentPlayer={actions.isCurrentPlayer}
            />
          </div>
        )}
      </div>
    </main>
  );
}
