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

export function importAnyKeymap(json : string): Keymap {
  const parsed = JSON.parse(json);
  if(typeof parsed.version === "number" && Array.isArray(parsed.layers)){
    validateLayers(parsed.layers);
    return parsed.layers;
  }

  if(parsed.layers && Array.isArray(parsed.layers)){
    validateLayers(parsed.layers);
    return parsed.layers;
  }

  throw new Error("Invalid keymap format")
}

/** Function to validate the layers of the JSON file */

function validateLayers(layers : any){
  if(!Array.isArray(layers)){
    throw new Error("Layers must be an array");
  }

  for(const layer of layers){
    if(!Array.isArray(layer)){
      throw new Error("Each layer must be an array");
    }

    for(const key of layer){
      if(typeof key!== "string"){
        throw new Error("Keycodes must be strings");
      }
    }

  }
  
}

/** Parse an imported keymap JSON string */
export function importKeymap(json: string): KeymapFile {
  const parsed = JSON.parse(json);
  if (!parsed.layers || !Array.isArray(parsed.layers)) {
    throw new Error("Invalid keymap file: missing layers array");
  }
  return parsed as KeymapFile;
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
