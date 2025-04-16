"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense } from "react";

function Model() {
  const gltf = useGLTF("/source/xbox controller.glb"); // adjust path as needed
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function ModelViewer() {
  return (
    <div style={{ width: "30vw", height: "30vh", }}>
      <Canvas>
        <ambientLight intensity={3} />
        <directionalLight position={[2, 5, 1]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
