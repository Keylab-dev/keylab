# Contributing to Zumap

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Git

```bash
git clone https://github.com/Keylab-dev/keylab.git
cd keylab
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to test changes locally.

### Validation

Run these before submitting a pull request:

```bash
npm run lint
npm run build
```

## Ways to Contribute

### 🎹 Add a Keyboard Definition
The easiest way to contribute! Create a VIA-compatible JSON file and add it to `keyboards/`. See the [VIA specification](https://www.caniusevia.com/docs/specification) for the format.

### 🗺️ Add a Keymap Preset
Add default keymaps for keyboards in `keymaps/`. Include the keyboard name so users know what it's for.

### 🐛 Report Bugs
Open an issue with steps to reproduce.

### ✨ Add Features
Check the roadmap in README.md. Open an issue to discuss before starting large changes.

## Code Style

- TypeScript strict mode
- Use the existing patterns in `src/lib/` and `src/components/`
- Keep components focused — one job per component
- Client-side only (no server actions/API routes for now)

## Pull Request Process

1. Fork and create a feature branch
2. Make your changes
3. Test locally with `npm run dev`
4. Run `npm run lint` and `npm run build`
5. Submit a PR with a clear description, screenshots for UI changes, and any manual test notes

## Keyboard Definition Guidelines

- Use the VIA JSON format
- Include accurate matrix dimensions
- Test that the layout renders correctly in the app
- Name the file descriptively (e.g., `tofu65-v2.json`)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
