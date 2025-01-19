"use client";

import { useState } from "react";
import { RegisteredPlayer } from "@/types/game";

interface PlayerInputProps {
  onAddPlayer: (name: string) => void;
  registeredPlayers: RegisteredPlayer[];
}

/**
 * Composant de saisie du nom d'un nouveau joueur
 */
export default function PlayerInput({
  onAddPlayer,
  registeredPlayers,
}: PlayerInputProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification de la longueur minimale
    if (name.trim().length < 2) {
      setError("Le nom doit contenir au moins 2 caractères");
      return;
    }

    // Vérification si le nom existe déjà
    const nameExists = registeredPlayers.some(
      (player) => player.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (nameExists) {
      setError("Ce nom de joueur existe déjà");
      return;
    }

    onAddPlayer(name.trim());
    setName("");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="player-name"
          className="block text-sm font-medium text-card-foreground"
        >
          Nom du joueur
        </label>
        <input
          id="player-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          className="w-full p-2 border border-border rounded bg-background text-card-foreground"
          placeholder="Entrez un nom"
          autoFocus
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Ajouter
      </button>
    </form>
  );
}
