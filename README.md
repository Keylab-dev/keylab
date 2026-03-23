# ⌨️ Zumap

An open-source, VIA-compatible keyboard configurator for the web. Load any keyboard definition, remap keys visually, and export your keymap — all in the browser.

![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- **Visual keyboard layout** — renders any VIA-compatible keyboard definition JSON
- **Click-to-remap** — click a key, pick a keycode, done
- **Layer support** — 4 layers out of the box
- **Import/Export** — load and save keymaps as JSON
- **Load any keyboard** — drop in a VIA keyboard definition file
- **Dark theme** — because keyboard people have taste
- **100% client-side** — no backend, no tracking, your data stays local

## Getting Started

```bash
git clone https://github.com/zumap/zumap.git
cd zumap
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
keyboards/       → VIA-compatible keyboard definition JSONs
keymaps/         → Shared/preset keymap JSONs
src/
  app/           → Next.js App Router pages
  components/    → React components
    KeyboardRenderer.tsx   → SVG keyboard visualizer
    KeycodePicker.tsx      → Keycode selection panel
    LayerSelector.tsx      → Layer tabs
    Toolbar.tsx            → Import/export/load buttons
  lib/           → Core logic
    keycodes.ts  → QMK keycode definitions
    keymap.ts    → Keymap create/import/export
    parser.ts    → VIA JSON → renderable layout parser
  types/         → TypeScript type definitions
```

## Adding a Keyboard

1. Create a VIA-compatible JSON definition (see [VIA spec](https://www.caniusevia.com/docs/specification))
2. Drop it in `keyboards/`
3. Optionally add a default keymap in `keymaps/`
4. Use the "Load Keyboard" button in the app, or import it programmatically

Community contributions of keyboard definitions are very welcome!

## VIA Compatibility

Zumap uses the same JSON keyboard definition format as [VIA](https://www.caniusevia.com/). The `layouts.keymap` array follows [KLE](http://keyboard-layout-editor.com) format:

- Each sub-array is a row
- Strings are matrix positions (`"row,col"`)
- Objects before a string set key properties (`w`, `h`, `x`, `y`)

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **React** — all client-side rendering

## Roadmap

- [ ] WebHID support (flash keymaps directly to keyboard)
- [ ] Macro editor
- [ ] Rotary encoder support
- [ ] Layout options (split backspace, ISO enter, etc.)
- [ ] Community keyboard browser
- [ ] QMK keycode coverage expansion
- [ ] Drag-and-drop key swapping

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
