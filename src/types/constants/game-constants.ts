/**
 * Nombre maximum de parties sauvegardées dans l'historique
 */
export const MAX_SAVED_GAMES = 10;

/**
 * Points rapides disponibles pour chaque tour
 */
export const QUICK_POINTS = [20, 25, 50] as const;

/**
 * Configuration des différents types de jeu
 */
export const GAME_TYPES_CONFIG = {
  "301": {
    initialScore: 301,
    description: "Commencez à 301 points, soyez le premier à zéro",
  },
  "501": {
    initialScore: 501,
    description: "Le classique : 501 points, finissez en double",
  },
  "701": {
    initialScore: 701,
    description: "Version longue : partez de 701 points",
  },
  "Around the Clock": {
    initialScore: 1,
    description: "Touchez les numéros de 1 à 20 dans l'ordre",
  },
} as const;

/**
 * Types de jeu disponibles
 */
export type GameType = keyof typeof GAME_TYPES_CONFIG;

/**
 * Obtient le score initial pour un type de jeu donné
 */
export function getInitialScore(type: GameType): number {
  return GAME_TYPES_CONFIG[type].initialScore;
}
