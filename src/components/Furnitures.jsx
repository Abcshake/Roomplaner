import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Chair } from "./Furniture/Chair";
import { Table } from "./Furniture/Table";

export const Furniture = (props) => {

  let shapeElement;

  switch (props.shape) {
    case "chair":
      shapeElement = (
        <Chair
          userData={{ name: "chair", draggable: true }}
        />
      );
      break;
    case "table":
      shapeElement = <Table userData={{ name: "table", draggable: true }} />;
      break;
    default:
      shapeElement = null; // Or handle other cases as needed
  }

  return (
    <mesh position={[-70, 1, 0]}> 
      {shapeElement}
    </mesh>
  );
};

export default Furniture;
