import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";


const Porsche = ({ isMobile, lightPosition}) => {

  const porsche = useGLTF("./porsche/scene.gltf");


  return (
    <group>
      <mesh>
        <hemisphereLight intensity={1} groundColor="white" />
        <directionalLight
    position={lightPosition} // Adjust the position of the directional light
    intensity={1} 
    castShadow
  />
        <spotLight
          position={lightPosition}
          angle={1}
          penumbra={1}
          intensity={6}
          castShadow
          shadow-mapSize={1024}
        />
        
        
        <pointLight intensity={-1.9} />
      </mesh>
      <primitive
  object={porsche.scene}
  scale={isMobile ? 1.2 : 2}
  position={isMobile ? [0, -0.7, 0] : [0, -1.2, 0]} 
  rotation={[0, 1, 0]} 
/>
    </group>
  );
};

const ProscheCanvas = ({rotate, zoom, lightPosition}) => {
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

  console.log(rotate)

  return (
    <Canvas
    shadows
    frameloop='demand'
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{
      position: [20, 3, 3], // Adjust the Z-coordinate to zoom out further
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
      <Porsche isMobile={isMobile} lightPosition={lightPosition} />
    
    </Suspense>
  
    <Preload all />
  </Canvas>
  );
};

export default ProscheCanvas;
