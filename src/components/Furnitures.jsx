import React, { useRef } from "react";
import * as THREE from "three";

export const Furniture = (props) => {

    const mesh = useRef();

    const allFurnitures = {
        box: new THREE.BoxGeometry( 1, 1, 1 ),
        cylinder: new THREE.CylinderGeometry( 1, 1, 1, 32 ),
        donut : new THREE.TorusGeometry( 0.5, 0.2, 3, 20 )
    }

    const allColor = {
        box: "red",
        cylinder: "pink",
        donut: "blue"
    }

        return (
        <>
        <mesh {...props} ref={mesh} />
            <primitive object={allFurnitures[props.shape]} attach={"geometry"} />
            <meshStandardMaterial color="hotpink" />
        </>
        )
}