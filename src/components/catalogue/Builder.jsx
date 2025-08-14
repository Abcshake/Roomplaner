import React, { useCallback, useEffect, useMemo, useState } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Ground } from "./Ground";
import { ModuleMesh } from "./ModuleMesh";

export function Builder({ modules, isDraggingExternally, onDraggingChange }) {
  const [placedModules, setPlacedModules] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const gridSize = 1;

  const addModule = useCallback((moduleDef) => {
    const index = placedModules.length;
    const baseX = (index % 5) * (moduleDef.size.x + 0.5);
    const baseZ = Math.floor(index / 5) * (moduleDef.size.z + 0.5);
    const id = `${moduleDef.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setPlacedModules((prev) => [
      ...prev,
      {
        id,
        moduleId: moduleDef.id,
        def: moduleDef,
        position: [baseX, moduleDef.size.y / 2, baseZ],
        rotationY: 0
      }
    ]);
    setSelectedId(id);
  }, [placedModules.length]);

  const removeSelected = useCallback(() => {
    if (!selectedId) return;
    setPlacedModules((prev) => prev.filter((m) => m.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const rotateSelected = useCallback((delta = Math.PI / 2) => {
    if (!selectedId) return;
    setPlacedModules((prev) => prev.map((m) => m.id === selectedId ? { ...m, rotationY: m.rotationY + delta } : m));
  }, [selectedId]);

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onDraggingChange?.(true);
  }, [onDraggingChange]);

  const handleDrag = useCallback((id, nextPosition) => {
    setPlacedModules((prev) => prev.map((m) => m.id === id ? { ...m, position: nextPosition } : m));
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    onDraggingChange?.(false);
  }, [onDraggingChange]);

  const handleRotate = useCallback((id, delta) => {
    setPlacedModules((prev) => prev.map((m) => m.id === id ? { ...m, rotationY: m.rotationY + delta } : m));
  }, []);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "r") {
        rotateSelected();
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        removeSelected();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rotateSelected, removeSelected]);

  // save/load
  const saveLayout = useCallback(() => {
    const payload = placedModules.map(({ id, moduleId, position, rotationY }) => ({ id, moduleId, position, rotationY }));
    localStorage.setItem("modularBuilderLayout", JSON.stringify(payload));
  }, [placedModules]);

  const loadLayout = useCallback(() => {
    try {
      const raw = localStorage.getItem("modularBuilderLayout");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const next = parsed.map((m) => {
        const def = modules.find((d) => d.id === m.moduleId);
        if (!def) return null;
        return { id: m.id, moduleId: m.moduleId, def, position: m.position, rotationY: m.rotationY };
      }).filter(Boolean);
      setPlacedModules(next);
      setSelectedId(next[0]?.id ?? null);
    } catch (e) {
      console.error("Failed to load layout", e);
    }
  }, [modules]);

  const clearLayout = useCallback(() => {
    setPlacedModules([]);
    setSelectedId(null);
  }, []);

  // expose API via window for quick testing (optional)
  useEffect(() => {
    window.__modularBuilder = {
      addModule,
      saveLayout,
      loadLayout,
      clearLayout,
      rotateSelected,
      removeSelected,
    };
  }, [addModule, saveLayout, loadLayout, clearLayout, rotateSelected, removeSelected]);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[8, 12, 8]} intensity={0.9} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />

      {/* Ground */}
      <Ground onBackgroundClick={() => setSelectedId(null)} />

      {/* Placed Modules */}
      {placedModules.map((m) => (
        <ModuleMesh
          key={m.id}
          instanceId={m.id}
          moduleDef={m.def}
          position={m.position}
          rotationY={m.rotationY}
          isSelected={selectedId === m.id}
          onSelect={handleSelect}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onRotate={handleRotate}
        />
      ))}

      <ContactShadows position={[0, 0.01, 0]} opacity={0.3} scale={100} blur={2.5} far={20} />
      {!isDragging && <OrbitControls makeDefault enableDamping dampingFactor={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />}

      {/* HUD overlay via portal handled outside of Canvas */}
      <OverlayUI
        modules={modules}
        onAdd={(def) => addModule(def)}
        onRotate={() => rotateSelected()}
        onDelete={removeSelected}
        onSave={saveLayout}
        onLoad={loadLayout}
        onClear={clearLayout}
        hasSelection={!!selectedId}
      />
    </>
  );
}

function OverlayUI({ modules, onAdd, onRotate, onDelete, onSave, onLoad, onClear, hasSelection }) {
  return (
    <group />
  );
}