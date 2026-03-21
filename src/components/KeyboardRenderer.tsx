"use client";

import { KeyDefinition } from "@/types/keyboard";
import { getKeycodeLabel } from "@/lib/keycodes";

const KEY_SIZE = 54; // px per 1u
const KEY_GAP = 4;

interface Props {
  keys: KeyDefinition[];
  keycodes: string[];
  selectedKey: number | null;
  onKeyClick: (index: number) => void;
}

export default function KeyboardRenderer({
  keys,
  keycodes,
  selectedKey,
  onKeyClick,
}: Props) {
  // Calculate total width/height for the SVG viewBox
  let maxX = 0;
  let maxY = 0;
  for (const key of keys) {
    const right = (key.x + key.w) * KEY_SIZE;
    const bottom = (key.y + key.h) * KEY_SIZE;
    if (right > maxX) maxX = right;
    if (bottom > maxY) maxY = bottom;
  }

  return (
    <div className="overflow-x-auto pb-4">
      <svg
        width={maxX + KEY_GAP * 2}
        height={maxY + KEY_GAP * 2}
        viewBox={`0 0 ${maxX + KEY_GAP * 2} ${maxY + KEY_GAP * 2}`}
        className="select-none"
      >
        {keys.map((key, i) => {
          const x = key.x * KEY_SIZE + KEY_GAP;
          const y = key.y * KEY_SIZE + KEY_GAP;
          const w = key.w * KEY_SIZE - KEY_GAP;
          const h = key.h * KEY_SIZE - KEY_GAP;
          const isSelected = selectedKey === i;
          const label = getKeycodeLabel(keycodes[i] ?? "KC_NO");

          return (
            <g
              key={i}
              onClick={() => onKeyClick(i)}
              className="cursor-pointer"
            >
              {/* Key shadow */}
              <rect
                x={x}
                y={y + 2}
                width={w}
                height={h}
                rx={5}
                fill="#1a1a1a"
              />
              {/* Key body */}
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={5}
                fill={isSelected ? "#6366f1" : "#2a2a2e"}
                stroke={isSelected ? "#818cf8" : "#3a3a3e"}
                strokeWidth={isSelected ? 2 : 1}
                className="transition-colors duration-100"
              />
              {/* Key top surface */}
              <rect
                x={x + 3}
                y={y + 2}
                width={w - 6}
                height={h - 6}
                rx={3}
                fill={isSelected ? "#7c7ff7" : "#353539"}
              />
              {/* Label */}
              <text
                x={x + w / 2}
                y={y + h / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isSelected ? "#fff" : "#d4d4d8"}
                fontSize={label.length > 3 ? 9 : label.length > 1 ? 11 : 13}
                fontFamily="system-ui, sans-serif"
                fontWeight={500}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
