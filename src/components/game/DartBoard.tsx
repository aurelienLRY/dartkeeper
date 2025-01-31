"use client";

import { FC } from "react";

interface DartBoardProps {
  onScore: (score: number, multiplier: number) => void;
}

interface Zone {
  id: string;
  multiplier: number;
}

interface ScoreZone {
  score: number;
  zones: Zone[];
}

export const DartBoard: FC<DartBoardProps> = ({ onScore }) => {
  const handleClick = (score: number, multiplier: number) => {
    onScore(score, multiplier);
  };

  const scoreZones: ScoreZone[] = [
    {
      score: 20,
      zones: [
        { id: "_x32_0-simple-outer", multiplier: 1 },
        { id: "_x32_0-simple-inner", multiplier: 1 },
        { id: "_x32_0-double", multiplier: 2 },
        { id: "_x32_0-triple", multiplier: 3 },
      ],
    },
    {
      score: 1,
      zones: [
        { id: "_x31_-simple-outer", multiplier: 1 },
        { id: "_x31_-simple-inner", multiplier: 1 },
        { id: "_x31_-double", multiplier: 2 },
        { id: "_x31_-triple", multiplier: 3 },
      ],
    },
    {
      score: 18,
      zones: [
        { id: "_x31_8-simple-outer", multiplier: 1 },
        { id: "_x31_8-simple-inner", multiplier: 1 },
        { id: "_x31_8-double", multiplier: 2 },
        { id: "_x31_8-triple", multiplier: 3 },
      ],
    },
    {
      score: 4,
      zones: [
        { id: "_x34_-simple-outer", multiplier: 1 },
        { id: "_x34_-simple-inner", multiplier: 1 },
        { id: "_x34_-double", multiplier: 2 },
        { id: "_x34_-triple", multiplier: 3 },
      ],
    },
    {
      score: 13,
      zones: [
        { id: "_x31_3-simple-outer", multiplier: 1 },
        { id: "_x31_3-simple-inner", multiplier: 1 },
        { id: "_x31_3-double", multiplier: 2 },
        { id: "_x31_3-triple", multiplier: 3 },
      ],
    },
    {
      score: 6,
      zones: [
        { id: "_x36_-simple-outer", multiplier: 1 },
        { id: "_x36_-simple-inner", multiplier: 1 },
        { id: "_x36_-double", multiplier: 2 },
        { id: "_x36_-triple", multiplier: 3 },
      ],
    },
    {
      score: 10,
      zones: [
        { id: "_x31_0-simple-outer", multiplier: 1 },
        { id: "_x31_0-simple-inner", multiplier: 1 },
        { id: "_x31_0-double", multiplier: 2 },
        { id: "_x31_0-triple", multiplier: 3 },
      ],
    },
    {
      score: 15,
      zones: [
        { id: "_x31_5-simple-outer", multiplier: 1 },
        { id: "_x31_5-simple-inner", multiplier: 1 },
        { id: "_x31_5-double", multiplier: 2 },
        { id: "_x31_5-triple", multiplier: 3 },
      ],
    },
    {
      score: 2,
      zones: [
        { id: "_x32_-simple-outer", multiplier: 1 },
        { id: "_x32_-simple-inner", multiplier: 1 },
        { id: "_x32_-double", multiplier: 2 },
        { id: "_x32_-triple", multiplier: 3 },
      ],
    },
    {
      score: 17,
      zones: [
        { id: "_x31_7-simple-outer", multiplier: 1 },
        { id: "_x31_7-simple-inner", multiplier: 1 },
        { id: "_x31_7-double", multiplier: 2 },
        { id: "_x31_7-triple", multiplier: 3 },
      ],
    },
    {
      score: 3,
      zones: [
        { id: "_x33_-simple-outer", multiplier: 1 },
        { id: "_x33_-simple-inner", multiplier: 1 },
        { id: "_x33_-double", multiplier: 2 },
        { id: "_x33_-triple", multiplier: 3 },
      ],
    },
    {
      score: 19,
      zones: [
        { id: "_x31_9-simple-outer", multiplier: 1 },
        { id: "_x31_9-simple-inner", multiplier: 1 },
        { id: "_x31_9-double", multiplier: 2 },
        { id: "_x31_9-triple", multiplier: 3 },
      ],
    },
    {
      score: 7,
      zones: [
        { id: "_x37_-simple-outer", multiplier: 1 },
        { id: "_x37_-simple-inner", multiplier: 1 },
        { id: "_x37_-double", multiplier: 2 },
        { id: "_x37_-triple", multiplier: 3 },
      ],
    },
    {
      score: 16,
      zones: [
        { id: "_x31_6-simple-outer", multiplier: 1 },
        { id: "_x31_6-simple-inner", multiplier: 1 },
        { id: "_x31_6-double", multiplier: 2 },
        { id: "_x31_6-triple", multiplier: 3 },
      ],
    },
    {
      score: 8,
      zones: [
        { id: "_x38_--simple-outer", multiplier: 1 },
        { id: "_x38_-simple-inner", multiplier: 1 },
        { id: "_x38_-double", multiplier: 2 },
        { id: "_x38_-triple", multiplier: 3 },
      ],
    },
    {
      score: 11,
      zones: [
        { id: "_x31_1-simple-outer", multiplier: 1 },
        { id: "_x31_1-simple-inner", multiplier: 1 },
        { id: "_x31_1-double", multiplier: 2 },
        { id: "_x31_1-triple", multiplier: 3 },
      ],
    },
    {
      score: 14,
      zones: [
        { id: "_x31_4-simple-outer", multiplier: 1 },
        { id: "_x31_4-simple-inner", multiplier: 1 },
        { id: "_x31_4-double", multiplier: 2 },
        { id: "_x31_4-triple", multiplier: 3 },
      ],
    },
    {
      score: 9,
      zones: [
        { id: "_x39_-simple-outer", multiplier: 1 },
        { id: "_x39_-simple-inner", multiplier: 1 },
        { id: "_x39_-double", multiplier: 2 },
        { id: "_x39_-triple", multiplier: 3 },
      ],
    },
    {
      score: 12,
      zones: [
        { id: "_x31_2-simple-outer", multiplier: 1 },
        { id: "_x31_2-simple-inner", multiplier: 1 },
        { id: "_x31_2-double", multiplier: 2 },
        { id: "_x31_2-triple", multiplier: 3 },
      ],
    },
    {
      score: 5,
      zones: [
        { id: "_x35_-simple-outer", multiplier: 1 },
        { id: "_x35_-simple-inner", multiplier: 1 },
        { id: "_x35_-double", multiplier: 2 },
        { id: "_x35_-triple", multiplier: 3 },
      ],
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] max-h-[500px] mx-auto">
      {/* Image de fond du dartboard */}
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 249.9 249.9"
        className="w-full h-full"
      >
        <image
          href="/dart-board.svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>

      {/* Calque de zones cliquables */}
      <svg viewBox="0 0 249.9 249.9" className="absolute inset-0 w-full h-full">
        {/* Zones de score */}
        {scoreZones.map(({ score, zones }) => (
          <g key={`score-${score}`}>
            {zones.map(({ id, multiplier }) => (
              <use
                key={id}
                href={`/dart-board.svg#${id}`}
                className="cursor-pointer fill-transparent hover:!fill-cyan-500/30 "
                onClick={() => handleClick(score, multiplier)}
                data-score={score}
                data-multiplier={multiplier}
              />
            ))}
          </g>
        ))}

        {/* Simple Bull (25 points) */}
        <use
          href="/dart-board.svg#simple-bull"
          className="cursor-pointer fill-transparent hover:!fill-cyan-500/30"
          onClick={() => handleClick(25, 1)}
          data-score="25"
          data-multiplier="1"
        />

        {/* Double Bull (50 points = 25 × 2) */}
        <use
          href="/dart-board.svg#double-bull"
          className="cursor-pointer fill-transparent hover:!fill-cyan-500/30"
          onClick={() => handleClick(25, 2)}
          data-score="25"
          data-multiplier="2"
        />
      </svg>
    </div>
  );
};
