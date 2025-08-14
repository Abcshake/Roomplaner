import React from "react";
import * as THREE from "three";

export function Ground({ size = 200, onBackgroundClick }) {
  return (
    <group>
      <gridHelper args={[size, size, 0x888888, 0x444444]} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={(e) => {
          // Only clear selection if the ground itself was clicked
          if (e.eventObject === e.object) {
            onBackgroundClick?.();
          }
        }}
      >
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={"#eaeaea"} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}