"use client";

import { GameTypeSelector } from "@/components/game/GameTypeSelector";
import { SavedGames } from "@/components/saved-games";
import { PlayerSelector } from "@/components/player-selector";
import { GameBoard } from "@/components/game/GameBoard";
import { useGameState } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";

const slideAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3, type: "spring", stiffness: 100 },
};

/**
 * Page principale de l'application
 */
export default function Home() {
  const { gameState, step, actions } = useGameState();

  return (
    <main className="min-h-[90vh] font-sans overflow-x-hidden">
      <div className="max-w-2xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          {step === "initial" && (
            <motion.div key="initial" className="space-y-8" {...slideAnimation}>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={actions.startNewGame}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  Nouvelle Partie
                </button>
              </motion.div>
              <SavedGames
                games={gameState.savedGames}
                onContinue={actions.continueGame}
              />
            </motion.div>
          )}

          {step === "type-selection" && (
            <motion.div
              key="type-selection"
              className="bg-card p-6 rounded-lg shadow-md"
              {...slideAnimation}
            >
              <GameTypeSelector onSelect={actions.selectGameType} />
            </motion.div>
          )}

          {step === "player-selection" && (
            <motion.div
              key="player-selection"
              className="bg-card p-6 rounded-lg shadow-md space-y-4"
              {...slideAnimation}
            >
              <motion.h2
                className="text-xl font-heading text-card-foreground"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Sélectionner les joueurs
              </motion.h2>
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
                  <motion.div
                    className="flex justify-end gap-4 pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
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
                  </motion.div>
                )}
            </motion.div>
          )}

          {step === "game" && gameState.currentGame && (
            <motion.div key="game" className="bg-card p-6" {...slideAnimation}>
              <GameBoard
                game={gameState.currentGame}
                registeredPlayers={gameState.registeredPlayers}
                onUpdateScore={actions.updateScore}
                onExitGame={actions.exitGame}
                onAbandonGame={actions.abandonGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
