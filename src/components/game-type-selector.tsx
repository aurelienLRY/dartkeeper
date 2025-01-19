"use client";

import { GameType } from "@/types/game";

interface GameTypeSelectorProps {
  onSelect: (type: GameType) => void;
}

const GAME_TYPES: { type: GameType; description: string }[] = [
  {
    type: "301",
    description: "Commencez à 301 points, soyez le premier à zéro",
  },
  {
    type: "501",
    description: "Le classique : 501 points, finissez en double",
  },
  {
    type: "701",
    description: "Version longue : partez de 701 points",
  },
  {
    type: "Around the Clock",
    description: "Touchez les numéros de 1 à 20 dans l'ordre",
  },
];

export function GameTypeSelector({ onSelect }: GameTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {GAME_TYPES.map(({ type, description }) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="p-6 bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors text-left group"
        >
          <h3 className="text-xl font-heading text-primary mb-2">{type}</h3>
          <p className="text-sm text-muted-foreground group-hover:text-card-foreground transition-colors">
            {description}
          </p>
        </button>
      ))}
    </div>
  );
}
