/**
 * Parse VIA-compatible keyboard definition JSON into a renderable layout.
 * VIA uses KLE (keyboard-layout-editor.com) format for the keymap array.
 */

import { KeyDefinition, KeyboardDefinition, ParsedLayout } from "@/types/keyboard";

/**
 * Parse a VIA keyboard definition into a flat list of renderable keys.
 * The keymap array follows KLE format:
 * - Each sub-array is a row
 * - Strings are key legends (matrix position as "row,col")
 * - Objects before a string modify that key's properties
 */
export function parseViaDefinition(def: KeyboardDefinition): ParsedLayout {
  const keys: KeyDefinition[] = [];
  let currentY = 0;
  let currentX = 0;

  for (const row of def.layouts.keymap) {
    currentX = 0;
    let nextW = 1;
    let nextH = 1;
    let nextX = 0;
    let nextY = 0;

    for (const item of row) {
      if (typeof item === "object" && item !== null) {
        // KLE property object — modifies the next key
        if (item.w) nextW = item.w;
        if (item.h) nextH = item.h;
        if (item.x) nextX = item.x;
        if (item.y) nextY = item.y;
        // Skip color/alignment props (c, t, a)
        continue;
      }

      if (typeof item === "string") {
        currentX += nextX;
        currentY += nextY;
        nextY = 0;

        // Extract matrix position — could be "row,col" or have extra legends
        const matrixPos = item.includes("\n") ? item.split("\n")[0] : item;

        keys.push({
          matrixPos,
          x: currentX,
          y: currentY,
          w: nextW,
          h: nextH,
        });

        currentX += nextW;
        nextW = 1;
        nextH = 1;
        nextX = 0;
      }
    }
    currentY += 1;
  }

  return {
    name: def.name,
    keys,
    rows: def.matrix.rows,
    cols: def.matrix.cols,
  };
}
