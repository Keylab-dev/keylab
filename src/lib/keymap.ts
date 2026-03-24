/**
 * Keymap utilities — create, load, save, and manipulate keymaps.
 */

import { Keymap, KeymapFile, ParsedLayout } from "@/types/keyboard";

const NUM_LAYERS = 4;

/** Create a default keymap for a layout (all KC_NO) */
export function createDefaultKeymap(layout: ParsedLayout): Keymap {
  return Array.from({ length: NUM_LAYERS }, () =>
    Array.from({ length: layout.keys.length }, () => "KC_NO")
  );
}

/** Export keymap as a downloadable JSON file */
export function exportKeymap(
  name: string,
  keyboard: string,
  layers: Keymap
): string {
  const file: KeymapFile = { name, keyboard, layers };
  return JSON.stringify(file, null, 2);
}

/** Detect what type of JSON is being imported and then update */

export function importAnyKeymap(
  json: string,
  keyCount: number
): Keymap {
  let parsed;

  try { 
    parsed = JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON.");
  }

  if (Array.isArray(parsed.layers)) {
    validateLayers(parsed.layers);
    
    // Normalization logic
    const normalizedLayers: Keymap = parsed.layers.map((layer: string[]) => {
      const result = [...layer];
      while (result.length < keyCount) {
       result.push("KC_NO");
      }

      return result.slice(0, keyCount);
    })

    // Ensure minimum layers
    while (normalizedLayers.length < NUM_LAYERS) {
      normalizedLayers.push(
        Array.from({ length: keyCount }, () => "KC_NO")
      );
    }

    return normalizedLayers;
  }

  throw new Error("Invalid keymap format");
}

/** Function to validate the layers of the JSON file */

function validateLayers(layers: unknown): asserts layers is Keymap {
  if (!Array.isArray(layers)) {
    throw new Error("Layers must be an array");
  }

  for (const layer of layers) {
    if (!Array.isArray(layer)) {
      throw new Error("Each layer must be an array");
    }

    for (const key of layer) {
      if (typeof key !== "string") {
        throw new Error("Keycodes must be strings");
      }
    }
  }
}

/** Download a string as a file */
export function downloadJson(content: string, filename: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
