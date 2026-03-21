"use client";

import { useState } from "react";
import { KEYCODES, getCategories, Keycode } from "@/lib/keycodes";

interface Props {
  selectedKeyIndex: number | null;
  onAssign: (keycode: string) => void;
}

export default function KeycodePicker({ selectedKeyIndex, onAssign }: Props) {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = KEYCODES.filter((k) => k.category === activeCategory);

  if (selectedKeyIndex === null) {
    return (
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-center text-zinc-500">
        Click a key on the keyboard to remap it
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
      <p className="mb-3 text-sm text-zinc-400">
        Assign keycode to key <span className="font-mono text-indigo-400">#{selectedKeyIndex}</span>
      </p>

      {/* Category tabs */}
      <div className="mb-3 flex flex-wrap gap-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Keycode grid */}
      <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8 md:grid-cols-10">
        {filtered.map((kc) => (
          <button
            key={kc.code}
            onClick={() => onAssign(kc.code)}
            className="rounded bg-zinc-800 px-1 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-indigo-600 hover:text-white"
            title={kc.code}
          >
            {kc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
