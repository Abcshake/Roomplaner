import React, { useMemo, useState } from "react";
import "../../styles/catalogue.css";

export function Sidebar({ modules, onAdd, onRotate, onDelete, onSave, onLoad, onClear, hasSelection }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return modules;
    const q = query.toLowerCase();
    return modules.filter((m) => m.name.toLowerCase().includes(q) || m.tags?.some((t) => t.includes(q)));
  }, [modules, query]);

  return (
    <div className="catalogue-sidebar">
      <div className="sidebar-header">
        <div className="title">Modular Home Catalogue</div>
        <input
          className="search"
          type="text"
          placeholder="Search modules..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="actions">
        <button className="btn" disabled={!hasSelection} onClick={onRotate}>Rotate (R)</button>
        <button className="btn danger" disabled={!hasSelection} onClick={onDelete}>Delete (Del)</button>
        <button className="btn" onClick={onSave}>Save</button>
        <button className="btn" onClick={onLoad}>Load</button>
        <button className="btn ghost" onClick={onClear}>Clear</button>
      </div>

      <div className="module-list">
        {filtered.map((m) => (
          <div key={m.id} className="module-card">
            <div className="module-info">
              <div className="name">{m.name}</div>
              <div className="meta">{m.size.x}x{m.size.z}m · {m.size.y}m tall</div>
              <div className="price">${m.price.toLocaleString()}</div>
            </div>
            <button className="btn primary" onClick={() => onAdd(m)}>Add</button>
          </div>
        ))}
      </div>

      <div className="footer">
        <div>Tips:</div>
        <ul>
          <li>Click a module to select.</li>
          <li>Drag to move (snaps to 1m grid).</li>
          <li>Double-click to rotate 90°.</li>
          <li>Use R to rotate, Delete to remove.</li>
        </ul>
      </div>
    </div>
  );
}