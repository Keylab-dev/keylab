"use client";

import { useRef } from "react";

interface Props {
  onExportVIA: () => void;
  onExportKeylab: () => void;
  onImport: (json: string) => void;
  onLoadKeyboard: (json: string) => void;
}

export default function Toolbar({ onExportVIA, onExportKeylab, onImport, onLoadKeyboard }: Props) {
  const keymapInputRef = useRef<HTMLInputElement>(null);
  const kbInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (json: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => cb(reader.result as string);
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onExportVIA}
        className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
      >
        Export VIA
      </button>

      <button
        onClick={onExportKeylab}
        className="rounded bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
      >
        Export Keylab
      </button>

      <button
        onClick={() => keymapInputRef.current?.click()}
        className="rounded bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-600 transition-colors"
      >
        Import Keymap
      </button>
      <button
        onClick={() => kbInputRef.current?.click()}
        className="rounded bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-600 transition-colors"
      >
        Load Keyboard
      </button>

      <input
        ref={keymapInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => handleFile(e, onImport)}
      />
      <input
        ref={kbInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={(e) => handleFile(e, onLoadKeyboard)}
      />
    </div>
  );
}
