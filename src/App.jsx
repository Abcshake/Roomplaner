import { Canvas } from "@react-three/fiber";
import { Office } from "./components/Office";
import { OrbitControls } from "@react-three/drei";
import Furniture from "./components/Furnitures";
import React, { useState } from "react";
import * as THREE from "three";
function App() {
  const [furnitureOnCanvas, setFruintureOnCanvas] = useState([]);
  const [isDragging, setIsDragging] = useState(false);


  const addFurniture = (e) => {
    const furnitureCount = furnitureOnCanvas.length;

    const furniture = e.target.getAttribute("data-shape");
    console.log(furniture);

    setFruintureOnCanvas(
      [...furnitureOnCanvas, 
        <Furniture 
        shape={furniture}
        key={furnitureCount}
        position={[0,1,(-1 + (furnitureCount*3))]}
        setIsDragging={setIsDragging} 
        />
      ]);

  }

  return (
    <div style={{ width: "95vw", height: "95vh" }}>

    <Canvas shadows camera={{ position: [-30, 25, 25] }}>
    {!isDragging && <OrbitControls />} 
      <ambientLight intensity={1} />
      <Office />
      {[...furnitureOnCanvas]}
      <gridHelper args={[500, 500, 0xff0000, 'teal']} />
    </Canvas>
    <div className='buttons'>
        <button  onClick={addFurniture} data-shape={"chair"}>Chair </button>
        <button  onClick={addFurniture} data-shape={"table"}>Table </button>
        <button  onClick={addFurniture} data-shape={"donut"}>Donut </button>
      </div>
    </div>
  );
}

export default App;