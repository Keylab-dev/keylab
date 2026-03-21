"use client";

interface Props {
  numLayers: number;
  activeLayer: number;
  onLayerChange: (layer: number) => void;
}

export default function LayerSelector({
  numLayers,
  activeLayer,
  onLayerChange,
}: Props) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: numLayers }, (_, i) => (
        <button
          key={i}
          onClick={() => onLayerChange(i)}
          className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
            activeLayer === i
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Layer {i}
        </button>
      ))}
    </div>
  );
}
