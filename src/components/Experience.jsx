import { Office } from "./Office";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";



export const Experience = () => {
  const [width, setWidth] = useState(3);
  const [length, setLength] = useState(2);

  const handleWidthChange = (event) => {
    setWidth(parseFloat(event.target.value));
  };

  const handleLengthChange = (event) => {
    setLength(parseFloat(event.target.value));
  };

  return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <Office />
      </Canvas>
  );
};
