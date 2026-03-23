"use client";

import { useState, useCallback, useEffect } from "react";
import KeyboardRenderer from "@/components/KeyboardRenderer";
import KeycodePicker from "@/components/KeycodePicker";
import LayerSelector from "@/components/LayerSelector";
import Toolbar from "@/components/Toolbar";
import { parseViaDefinition } from "@/lib/parser";
import { createDefaultKeymap, exportKeymap, importAnyKeymap, downloadJson } from "@/lib/keymap";
import { ParsedLayout, Keymap, KeyboardDefinition } from "@/types/keyboard";

import defaultKb from "../../keyboards/60-percent.json";
import defaultKeymapFile from "../../keymaps/default-60.json";

export default function Home() {
  const [layout, setLayout] = useState<ParsedLayout>(() =>
    parseViaDefinition(defaultKb as KeyboardDefinition)
  );
  const [keymap, setKeymap] = useState<Keymap>(() => defaultKeymapFile.layers);
  const [activeLayer, setActiveLayer] = useState(0);
  const [selectedKey, setSelectedKey] = useState<number | null>(null);
  const [kbName, setKbName] = useState(defaultKb.name);

  const handleKeyClick = useCallback((index: number) => {
    setSelectedKey((prev) => (prev === index ? null : index));
  }, []);

  const handleAssign = useCallback(
    (keycode: string) => {
      if (selectedKey === null) return;
      setKeymap((prev) => {
        const next = prev.map((layer) => [...layer]);
        next[activeLayer][selectedKey] = keycode;
        return next;
      });
    },
    [selectedKey, activeLayer]
  );

  const handleExport = useCallback(() => {
    const json = exportKeymap("My Keymap", kbName, keymap);
    downloadJson(json, "keymap.json");
  }, [keymap, kbName]);

  const handleImport = useCallback(
    (json: string) => {
      try {
        const rawLayers = importAnyKeymap(json);
        //Normalize layers length to match the current keyboard layout
        const normalizedLayers = rawLayers.map((layer)=> {
          const result =[...layer];
          while(result.length < layout.keys.length){
            result.push("KC_NO");
          }

          return result.slice(0,layout.keys.length);
        })
        
        // Pad layers to 4 if needed

        while (normalizedLayers.length < 4) {
          normalizedLayers.push(
            Array.from({ length: layout.keys.length }, () => "KC_NO")
          );
        }
        setKeymap(normalizedLayers);
        setSelectedKey(null);
        setActiveLayer(0);
      } catch (e) {
        console.error(e);
        alert("Invalid keymap file");
      }
    },
    [layout.keys.length]
  );

  

  const handleLoadKeyboard = useCallback((json: string) => {
    try {
      const def = JSON.parse(json) as KeyboardDefinition;
      const parsed = parseViaDefinition(def);
      setLayout(parsed);
      setKbName(def.name);
      setKeymap(createDefaultKeymap(parsed));
      setSelectedKey(null);
      setActiveLayer(0);
    } catch (e) {
      alert("Invalid keyboard definition file");
    }
  }, []);

  // Escape to deselect
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedKey(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            ⌨️ KeyLab
          </h1>
          <p className="text-sm text-zinc-500">
            Open-source keyboard configurator
          </p>
        </div>
        <Toolbar
          onExport={handleExport}
          onImport={handleImport}
          onLoadKeyboard={handleLoadKeyboard}
        />
      </div>

      {/* Keyboard name */}
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-lg font-semibold text-zinc-300">{kbName}</h2>
        <LayerSelector
          numLayers={keymap.length}
          activeLayer={activeLayer}
          onLayerChange={(l) => {
            setActiveLayer(l);
            setSelectedKey(null);
          }}
        />
      </div>

      {/* Keyboard */}
      <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <KeyboardRenderer
          keys={layout.keys}
          keycodes={keymap[activeLayer]}
          selectedKey={selectedKey}
          onKeyClick={handleKeyClick}
        />
      </div>

      {/* Keycode picker */}
      <KeycodePicker
        selectedKeyIndex={selectedKey}
        onAssign={handleAssign}
      />
    </main>
  );
}
