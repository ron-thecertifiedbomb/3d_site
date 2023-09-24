import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Lamborghini = ({ isMobile, lightPosition }) => {

  const lamborghini = useGLTF("./black_lamborghini_revuelto/scene.gltf");
 
  return (
    <group>
<mesh>
  <hemisphereLight intensity={-1} groundColor="white" />
  <directionalLight
    position={lightPosition} // Adjust the position of the directional light
    intensity={4} // Increase intensity for more brightness
    castShadow
  />
  <spotLight
    position={[10, 30, 10]} // Adjust the position of the spot light
    angle={1}
    penumbra={1}
    intensity={4} 
    castShadow
  />
</mesh>
      <primitive
  object={lamborghini.scene}
  scale={isMobile ? 0.9: 1.2}
  position={isMobile ?[ 0, -1.1, 0] : [0, -1.4, 0]} 
  rotation={[0, 5.2, 0]} 
/>
    </group>
  );
};

const LamborghiniCanvas = ({rotate, zoom, lightPosition}) => {
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
      position: isMobile ? [11, 3,  8] : [11, 3,  4],
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
      <Lamborghini isMobile={isMobile} lightPosition={lightPosition} />
    </Suspense>
  
    <Preload all />
  </Canvas>
  );
};

export default LamborghiniCanvas;
