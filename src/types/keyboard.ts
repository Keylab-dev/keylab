/**
 * VIA-compatible keyboard definition types.
 * Reference: https://www.caniusevia.com/docs/specification
 */

/** A single key in the layout */
export interface KeyDefinition {
  /** Matrix row,col as "row,col" string */
  matrixPos: string;
  /** X position in key units */
  x: number;
  /** Y position in key units */
  y: number;
  /** Width in key units (default 1) */
  w: number;
  /** Height in key units (default 1) */
  h: number;
  /** Optional label override */
  label?: string;
}

/** VIA keyboard definition (simplified) */
export interface KeyboardDefinition {
  name: string;
  vendorId: string;
  productId: string;
  matrix: { rows: number; cols: number };
  layouts: {
    labels?: (string | string[])[];
    keymap: any[][];
  };
}

/** A parsed, renderable keyboard layout */
export interface ParsedLayout {
  name: string;
  keys: KeyDefinition[];
  rows: number;
  cols: number;
}

/** A keymap: layer → key index → keycode */
export type Keymap = string[][];

/** Full keymap file */
export interface KeymapFile {
  name: string;
  keyboard: string;
  layers: Keymap;
}
