import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Edges, Html } from "@react-three/drei";

const GROUND_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const TEMP_VECTOR = new THREE.Vector3();

export function ModuleMesh({
  instanceId,
  moduleDef,
  position,
  rotationY = 0,
  gridSize = 1,
  isSelected = false,
  onSelect,
  onDragStart,
  onDrag,
  onDragEnd,
  onRotate
}) {
  const groupRef = useRef();
  const dragOffsetRef = useRef(new THREE.Vector3());
  const [isDragging, setIsDragging] = useState(false);

  const { size, color, name } = moduleDef;

  const snapped = (x, y, z) => {
    const sx = Math.round(x / gridSize) * gridSize;
    const sz = Math.round(z / gridSize) * gridSize;
    return [sx, y, sz];
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    onSelect?.(instanceId);

    // initiate dragging
    const hit = e.ray.intersectPlane(GROUND_PLANE, TEMP_VECTOR);
    if (hit) {
      const current = groupRef.current.position;
      dragOffsetRef.current.set(current.x - TEMP_VECTOR.x, 0, current.z - TEMP_VECTOR.z);
      setIsDragging(true);
      onDragStart?.(instanceId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const hit = e.ray.intersectPlane(GROUND_PLANE, TEMP_VECTOR);
    if (!hit) return;
    const nextX = TEMP_VECTOR.x + dragOffsetRef.current.x;
    const nextZ = TEMP_VECTOR.z + dragOffsetRef.current.z;
    const next = snapped(nextX, size.y / 2, nextZ);
    onDrag?.(instanceId, next);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);
    onDragEnd?.(instanceId);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onRotate?.(instanceId, Math.PI / 2);
  };

  const emissive = isSelected ? new THREE.Color("#00aaff") : new THREE.Color("#000000");
  const outlineColor = isSelected ? 0x00aaff : 0x222222;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={isSelected ? 0.2 : 0.0} />
      </mesh>
      <Edges scale={1.01} threshold={15} color={outlineColor} />
      <Html distanceFactor={10} position={[0, size.y / 2 + 0.15, 0]} center>
        <div style={{
          background: isSelected ? "#00aaff" : "rgba(255,255,255,0.8)",
          color: isSelected ? "#ffffff" : "#111111",
          padding: "2px 6px",
          borderRadius: 4,
          fontFamily: "system-ui, sans-serif",
          fontSize: 12,
          whiteSpace: "nowrap"
        }}>{name} {size.x}x{size.z}m</div>
      </Html>
    </group>
  );
}