/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Table.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Table(props) {
  const { nodes, materials } = useGLTF('models/Table.glb')
  return (
    <group {...props} dispose={null} scale={8} position={[50,3,0]}>
      <mesh geometry={nodes.Table_RoundSmall2.geometry} material={materials.Wood} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
    </group>
  )
}

useGLTF.preload('models/Table.glb')
