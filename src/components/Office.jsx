import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import * as THREE from "three"; 

export function Office(props) {
  const { nodes, materials } = useGLTF("models/scene.gltf");
  const texture = useTexture("textures/Baked.jpg");
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;
  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture
  
  })

  return (
    <group {...props} dispose={null}>
    <group name="Plane" position={[-0.108, -0.132, 0.043]} scale={3.095}>
      <mesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials.Floor} />
      <mesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials.Default} />
      <mesh name="Plane_3" geometry={nodes.Plane_3.geometry} material={materials.Walls} />
      <mesh name="Plane_4" geometry={nodes.Plane_4.geometry} material={materials.Walls} />
    </group>
    <mesh name="Chair_1" geometry={nodes.Chair_1.geometry} material={materials.Wood} position={[0, 0.179, -1.302]} rotation={[-Math.PI / 2, 0, 3.134]} scale={100} />
    </group>
  );
}

useGLTF.preload("models/scene.gltf");
