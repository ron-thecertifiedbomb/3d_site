import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const FerrariF150 = ({ isMobile, lightPosition }) => {


  const ferrari = useGLTF("./ferrari_f50/scene.gltf");
  
  return (
    <group>
      <mesh>
        <hemisphereLight intensity={-2} groundColor="black" />
        <spotLight
          position={lightPosition}
          angle={0.51}
          penumbra={1}
          intensity={5}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={8} />
      </mesh>
      <primitive
  object={ferrari.scene}
  scale={isMobile ? 0.6 : 1}
  position={isMobile ?[ 0, -0.8, 0] : [0, -1.2, 0]} 
  rotation={[0, 2.5, 0]} 
/>
    </group>
  );
};

const FerrariF150Canvas = ({rotate, zoom, lightPosition}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
    shadows
    frameloop='demand'
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{
      position: [2, 3, -11],
      fov: 25
    }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
           autoRotate={rotate}
           enableZoom={zoom}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <FerrariF150 isMobile={isMobile} lightPosition={lightPosition}/>
    </Suspense>
  
    <Preload all />
  </Canvas>
  );
};

export default FerrariF150Canvas;
