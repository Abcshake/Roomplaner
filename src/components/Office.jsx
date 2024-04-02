import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; 
import { Chair } from "./Furniture/Chair";


export function Office(props) {
  const { nodes } = useGLTF("models/scene.gltf");
  const texture = useTexture("textures/concrete.jpg");
  const materials = new THREE.MeshStandardMaterial({map: texture});
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;
  const textureMaterial = new THREE.MeshStandardMaterial({
    map: texture
  
  })

  return (
      <group {...props} dispose={null}>
        <group name="Plane" position={[-0.108, -0.132, 0.043]} scale={25}>
          <mesh name="Plane_1" geometry={nodes.Plane_1.geometry} material={materials} />
          <mesh name="Plane_2" geometry={nodes.Plane_2.geometry} material={materials} />
          <mesh name="Plane_3" geometry={nodes.Plane_3.geometry} material={materials} />
          <mesh name="Plane_4" geometry={nodes.Plane_4.geometry} material={materials} />
        </group>
      </group>
  );
}

useGLTF.preload("models/scene.gltf");
