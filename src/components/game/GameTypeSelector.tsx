"use client";

import { GameType, GAME_TYPES_CONFIG } from "@/types/constants/game-constants";

interface GameTypeSelectorProps {
  onSelect: (type: GameType) => void;
}

/**
 * Composant de sélection du type de jeu
 */
export function GameTypeSelector({ onSelect }: GameTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(GAME_TYPES_CONFIG).map(([type, config]) => (
        <button
          key={type}
          onClick={() => onSelect(type as GameType)}
          className="p-6 bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors text-left group"
        >
          <h3 className="text-xl font-heading text-primary mb-2">{type}</h3>
          <p className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors">
            {config.description}
          </p>
        </button>
      ))}
    </div>
  );
}
