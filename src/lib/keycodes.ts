/**
 * Basic QMK keycodes for the keycode picker.
 * This is intentionally a subset — expand as needed.
 */

export interface Keycode {
  code: string;
  label: string;
  category: string;
}

export const KEYCODES: Keycode[] = [
  // Letters
  ...Array.from({ length: 26 }, (_, i) => ({
    code: `KC_${String.fromCharCode(65 + i)}`,
    label: String.fromCharCode(65 + i),
    category: "Letters",
  })),
  // Numbers
  ...Array.from({ length: 10 }, (_, i) => ({
    code: `KC_${i}`,
    label: `${i}`,
    category: "Numbers",
  })),
  // Modifiers
  { code: "KC_LSFT", label: "L Shift", category: "Modifiers" },
  { code: "KC_RSFT", label: "R Shift", category: "Modifiers" },
  { code: "KC_LCTL", label: "L Ctrl", category: "Modifiers" },
  { code: "KC_RCTL", label: "R Ctrl", category: "Modifiers" },
  { code: "KC_LALT", label: "L Alt", category: "Modifiers" },
  { code: "KC_RALT", label: "R Alt", category: "Modifiers" },
  { code: "KC_LGUI", label: "L GUI", category: "Modifiers" },
  { code: "KC_RGUI", label: "R GUI", category: "Modifiers" },
  // Navigation
  { code: "KC_ENT", label: "Enter", category: "Navigation" },
  { code: "KC_ESC", label: "Esc", category: "Navigation" },
  { code: "KC_BSPC", label: "Bksp", category: "Navigation" },
  { code: "KC_TAB", label: "Tab", category: "Navigation" },
  { code: "KC_SPC", label: "Space", category: "Navigation" },
  { code: "KC_CAPS", label: "Caps", category: "Navigation" },
  { code: "KC_DEL", label: "Del", category: "Navigation" },
  { code: "KC_INS", label: "Ins", category: "Navigation" },
  { code: "KC_HOME", label: "Home", category: "Navigation" },
  { code: "KC_END", label: "End", category: "Navigation" },
  { code: "KC_PGUP", label: "PgUp", category: "Navigation" },
  { code: "KC_PGDN", label: "PgDn", category: "Navigation" },
  { code: "KC_UP", label: "↑", category: "Navigation" },
  { code: "KC_DOWN", label: "↓", category: "Navigation" },
  { code: "KC_LEFT", label: "←", category: "Navigation" },
  { code: "KC_RGHT", label: "→", category: "Navigation" },
  // Punctuation
  { code: "KC_MINS", label: "-", category: "Punctuation" },
  { code: "KC_EQL", label: "=", category: "Punctuation" },
  { code: "KC_LBRC", label: "[", category: "Punctuation" },
  { code: "KC_RBRC", label: "]", category: "Punctuation" },
  { code: "KC_BSLS", label: "\\", category: "Punctuation" },
  { code: "KC_SCLN", label: ";", category: "Punctuation" },
  { code: "KC_QUOT", label: "'", category: "Punctuation" },
  { code: "KC_GRV", label: "`", category: "Punctuation" },
  { code: "KC_COMM", label: ",", category: "Punctuation" },
  { code: "KC_DOT", label: ".", category: "Punctuation" },
  { code: "KC_SLSH", label: "/", category: "Punctuation" },
  // Function keys
  ...Array.from({ length: 12 }, (_, i) => ({
    code: `KC_F${i + 1}`,
    label: `F${i + 1}`,
    category: "Function",
  })),
  // Layers
  { code: "MO(1)", label: "MO(1)", category: "Layers" },
  { code: "MO(2)", label: "MO(2)", category: "Layers" },
  { code: "MO(3)", label: "MO(3)", category: "Layers" },
  { code: "TG(1)", label: "TG(1)", category: "Layers" },
  { code: "TG(2)", label: "TG(2)", category: "Layers" },
  { code: "TG(3)", label: "TG(3)", category: "Layers" },
  // Special
  { code: "KC_NO", label: "None", category: "Special" },
  { code: "KC_TRNS", label: "▽", category: "Special" },
  { code: "KC_PSCR", label: "PrtSc", category: "Special" },
  { code: "KC_SLCK", label: "ScrLk", category: "Special" },
  { code: "KC_PAUS", label: "Pause", category: "Special" },
];

/** Get display label for a keycode */
export function getKeycodeLabel(code: string): string {
  const kc = KEYCODES.find((k) => k.code === code);
  if (kc) return kc.label;
  // Strip KC_ prefix for unknown codes
  if (code.startsWith("KC_")) return code.slice(3);
  return code;
}

/** Get all unique categories */
export function getCategories(): string[] {
  return [...new Set(KEYCODES.map((k) => k.category))];
}
