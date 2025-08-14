import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function GLTFModel({ url, targetSize = { x: 1, y: 1, z: 1 } }) {
  const gltf = useGLTF(url);

  const { centeredScene, scale } = useMemo(() => {
    const cloned = gltf.scene.clone(true);

    // Enable shadows on all meshes
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });

    // Compute bounding box
    const bbox = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    bbox.getSize(size);
    bbox.getCenter(center);

    // Center the model around origin
    const container = new THREE.Group();
    container.add(cloned);
    cloned.position.set(-center.x, -center.y, -center.z);

    // Compute uniform scale so that height matches target height
    const height = size.y || 1;
    const uniformScale = targetSize.y / height;

    return { centeredScene: container, scale: uniformScale };
  }, [gltf, targetSize.y]);

  return (
    <group scale={[scale, scale, scale]}>
      <primitive object={centeredScene} />
    </group>
  );
}

useGLTF.preload && useGLTF.preload("models/Chair.glb");
useGLTF.preload && useGLTF.preload("models/Table.glb");