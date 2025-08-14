import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Builder } from "./Builder";
import { Sidebar } from "./Sidebar";
import { MODULE_DEFINITIONS } from "../../data/modules";
import "../../styles/catalogue.css";

export function ModularCatalogue() {
  const [isDragging, setIsDragging] = useState(false);
  const [builderApi, setBuilderApi] = useState(null);

  // Builder renders the scene and internally controls layout; we pass controls via events
  return (
    <div className="catalogue-container">
      <Canvas shadows camera={{ position: [12, 12, 14], fov: 45 }}>
        <Builder modules={MODULE_DEFINITIONS} onDraggingChange={setIsDragging} />
      </Canvas>

      <Sidebar
        modules={MODULE_DEFINITIONS}
        onAdd={(m) => window.__modularBuilder?.addModule?.(m)}
        onRotate={() => window.__modularBuilder?.rotateSelected?.()}
        onDelete={() => window.__modularBuilder?.removeSelected?.()}
        onSave={() => window.__modularBuilder?.saveLayout?.()}
        onLoad={() => window.__modularBuilder?.loadLayout?.()}
        onClear={() => window.__modularBuilder?.clearLayout?.()}
        hasSelection={true}
      />
    </div>
  );
}