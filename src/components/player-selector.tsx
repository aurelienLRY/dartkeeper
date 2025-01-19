"use client";

import { useState } from "react";
import { RegisteredPlayer, Player } from "@/types/game";
import PlayerInput from "./PlayerInput";
import { Modal } from "./ui/Modal";

interface PlayerSelectorProps {
  registeredPlayers: RegisteredPlayer[];
  selectedPlayers?: Player[];
  onSelectPlayer: (playerId: string) => void;
  onAddNewPlayer: (name: string) => void;
  onRemovePlayer: (playerId: string) => void;
  onDeleteRegisteredPlayer: (playerId: string) => void;
}

/**
 * Composant de sélection des joueurs
 */
export function PlayerSelector({
  registeredPlayers = [],
  selectedPlayers = [],
  onSelectPlayer,
  onAddNewPlayer,
  onRemovePlayer,
  onDeleteRegisteredPlayer,
}: PlayerSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<RegisteredPlayer | null>(
    null
  );

  const handleAddPlayer = (name: string) => {
    onAddNewPlayer(name);
    setIsModalOpen(false);
  };

  const isPlayerSelected = (playerId: string) => {
    return selectedPlayers.some((p) => p.id === playerId);
  };

  const handleDeletePlayer = (player: RegisteredPlayer) => {
    setPlayerToDelete(player);
  };

  const confirmDeletePlayer = () => {
    if (playerToDelete) {
      onDeleteRegisteredPlayer(playerToDelete.id);
      setPlayerToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Liste des joueurs sélectionnés */}
      {selectedPlayers.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Joueurs sélectionnés ({selectedPlayers.length})
          </h3>
          <div className="space-y-2">
            {selectedPlayers.map((player) => {
              const registeredPlayer = registeredPlayers.find(
                (p) => p.id === player.id
              );
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2 bg-muted rounded text-card-foreground group"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={registeredPlayer?.avatar}
                      alt={`Avatar de ${player.name}`}
                      className="w-8 h-8 rounded-full bg-background"
                    />
                    <span>{player.name}</span>
                  </div>
                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    className="p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                    title="Retirer le joueur"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Liste des joueurs enregistrés */}
      <div className="grid grid-cols-2 gap-2">
        {registeredPlayers.map((player) => {
          const selected = isPlayerSelected(player.id);
          return (
            <div
              key={player.id}
              className={`relative group p-3 bg-card border border-border rounded-lg ${
                selected ? "opacity-50" : ""
              }`}
            >
              <button
                onClick={() => !selected && onSelectPlayer(player.id)}
                disabled={selected}
                className="w-full text-left flex gap-3 items-center"
              >
                <img
                  src={player.avatar}
                  alt={`Avatar de ${player.name}`}
                  className="w-10 h-10 rounded-full bg-background"
                />
                <div>
                  <div className="font-medium text-card-foreground">
                    {player.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {player.stats.gamesPlayed} parties - {player.stats.gamesWon}{" "}
                    victoires
                  </div>
                </div>
              </button>
              {!selected && (
                <button
                  onClick={() => handleDeletePlayer(player)}
                  className="absolute top-2 right-2 p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                  title="Supprimer le joueur"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Bouton pour ajouter un nouveau joueur */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full p-3 border border-dashed border-border rounded-lg text-muted-foreground hover:text-card-foreground hover:border-primary/50 transition-colors"
      >
        {registeredPlayers.length === 0
          ? "Ajouter un premier joueur"
          : "+ Nouveau joueur"}
      </button>

      {/* Modal d'ajout de joueur */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter un joueur"
      >
        <div className="space-y-4">
          <PlayerInput
            onAddPlayer={handleAddPlayer}
            registeredPlayers={registeredPlayers}
          />
          <p className="text-sm text-muted-foreground">
            Le joueur sera ajouté à la partie en cours et enregistré pour les
            futures parties.
          </p>
        </div>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={!!playerToDelete}
        onClose={() => setPlayerToDelete(null)}
        title="Supprimer le joueur"
      >
        <div className="space-y-4">
          <p className="text-card-foreground">
            Êtes-vous sûr de vouloir supprimer le joueur{" "}
            <strong>{playerToDelete?.name}</strong> ? Cette action est
            irréversible.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setPlayerToDelete(null)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-card-foreground"
            >
              Annuler
            </button>
            <button
              onClick={confirmDeletePlayer}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 text-sm font-medium"
            >
              Supprimer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
