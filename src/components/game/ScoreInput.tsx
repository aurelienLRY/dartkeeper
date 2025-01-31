"use client";

import { useState } from "react";
import { QUICK_POINTS } from "@/types/constants/game-constants";
import { DartBoard } from "./DartBoard";

interface ScoreInputProps {
  onUpdateScore: (points: number) => void;
}

type InputMode = "dartboard" | "keypad";
type Dart = { score: number; multiplier: number } | null;

export function ScoreInput({ onUpdateScore }: ScoreInputProps) {
  const [mode, setMode] = useState<InputMode>("keypad");
  const [darts, setDarts] = useState<[Dart, Dart, Dart]>([null, null, null]);
  const [selectedMultiplier, setSelectedMultiplier] = useState<1 | 2 | 3>(1);
  const currentDartIndex = darts.findIndex((dart) => dart === null);

  const handleDartScore = (score: number, multiplier: number) => {
    if (currentDartIndex === -1) return;

    const newDarts = [...darts] as [Dart, Dart, Dart];
    newDarts[currentDartIndex] = { score, multiplier };
    setDarts(newDarts);

    // Si c'est la dernière fléchette, envoyer le score total
    if (currentDartIndex === 2) {
      const totalScore = newDarts.reduce((total, dart) => {
        return total + (dart ? dart.score * dart.multiplier : 0);
      }, 0);
      onUpdateScore(totalScore);
      setDarts([null, null, null]);
    }
  };

  const handleKeypadScore = (points: number) => {
    if (currentDartIndex === -1) return;
    handleDartScore(points, selectedMultiplier);
    setSelectedMultiplier(1); // Réinitialiser le multiplicateur après chaque lancer
  };

  const handleMissedDart = () => {
    if (currentDartIndex === -1) return;

    const newDarts = [...darts] as [Dart, Dart, Dart];
    newDarts[currentDartIndex] = { score: 0, multiplier: 0 };
    setDarts(newDarts);

    // Si c'est la dernière fléchette, envoyer le score total
    if (currentDartIndex === 2) {
      const totalScore = newDarts.reduce((total, dart) => {
        return total + (dart ? dart.score * dart.multiplier : 0);
      }, 0);
      onUpdateScore(totalScore);
      setDarts([null, null, null]);
    }
  };

  const resetDarts = () => {
    setDarts([null, null, null]);
    setSelectedMultiplier(1);
  };

  return (
    <div className="space-y-4 mb-4">
      {/* Sélecteur de mode */}
      <div className="flex gap-2 p-2 bg-muted rounded-lg">
        <button
          onClick={() => setMode("dartboard")}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === "dartboard"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted-foreground/10"
          }`}
        >
          Cible
        </button>
        <button
          onClick={() => setMode("keypad")}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === "keypad"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted-foreground/10"
          }`}
        >
          Clavier
        </button>
      </div>

      {/* Affichage des fléchettes */}
      <div className="flex justify-between items-center  bg-card rounded-lg">
        <div className="flex gap-2">
          {darts.map((dart, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-heading ${
                dart
                  ? dart.score === 0
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-green-800 text-accent-foreground"
                  : index === currentDartIndex
                  ? "bg-sky-400 text-accent-foreground   animate-pulse"
                  : "bg-slate-500 text-accent-foreground"
              }`}
            >
              {dart
                ? dart.score === 0
                  ? "×"
                  : dart.score * dart.multiplier
                : index + 1}
            </div>
          ))}
        </div>
        <button
          onClick={resetDarts}
          className="p-2 text-muted-foreground hover:text-card-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Zone de saisie */}
      {mode === "dartboard" ? (
        <div className="space-y-4">
          <DartBoard onScore={handleDartScore} />
          <button
            onClick={handleMissedDart}
            className="w-full p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 text-lg font-medium"
            disabled={currentDartIndex === -1}
          >
            Raté
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Multiplicateurs */}
          <div className="flex gap-2 p-2 bg-muted rounded-lg">
            {[1, 2, 3].map((mult) => (
              <button
                key={mult}
                onClick={() => setSelectedMultiplier(mult as 1 | 2 | 3)}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedMultiplier === mult
                    ? mult === 3
                      ? "bg-accent text-accent-foreground"
                      : mult === 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground"
                    : "hover:bg-muted-foreground/10"
                }`}
                disabled={currentDartIndex === -1}
              >
                {mult === 1 ? "Simple" : mult === 2 ? "Double" : "Triple"}
              </button>
            ))}
          </div>

          {/* Points rapides */}
          <div className="grid grid-cols-4 gap-3">
            {QUICK_POINTS.map((points) => (
              <button
                key={points}
                onClick={() => handleKeypadScore(points)}
                className="p-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 text-xl font-heading"
                disabled={currentDartIndex === -1}
              >
                {selectedMultiplier > 1
                  ? `${points}×${selectedMultiplier}`
                  : points}
              </button>
            ))}

            {/* Bouton Raté */}
            <button
              onClick={handleMissedDart}
              className="w-full p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 text-lg font-medium"
              disabled={currentDartIndex === -1}
            >
              Raté
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
