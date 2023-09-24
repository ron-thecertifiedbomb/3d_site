import React, { useState } from "react";
import FerrariF150Canvas from "./canvas/FerrariF150";
import PorscheCanvas from "./canvas/Porsche";
import LamborghiniCanvas from "./canvas/Lamborghini";


const Hero = () => {

  const [selectedBrand, setSelectedBrand] = useState("Porsche");
  const [rotateToggle, setRotateToggle] = useState(false);
  const [zoomToggle, setZoomToggle] = useState(false);

  const [lightPosition, setLightPosition] = useState([-1, 500, -100]);

  const handleSliderChange = (e) => {
    const { name, value } = e.target;

    // Convert the value to a number and update the corresponding position value
    setLightPosition((prevPosition) => {
      const newPosition = [...prevPosition];
      newPosition[name] = parseFloat(value);
      return newPosition;
    });
  };

  const toggleRotate = () => {
    setRotateToggle(!rotateToggle);
  };

  const toggleZoom = () => {
    setZoomToggle(!zoomToggle);
  };

  console.log(selectedBrand);

  return (
    <div className="flex relative h-screen bg-black">
      <div className="w-full h-full pb-20">
        <div className="flex justify-center mt-4">
        <button
            className={`mr-4 p-2  ${
              selectedBrand === "Porsche" ? "text-[#0de0dc]":  "text-white"
            }`}
            onClick={() => setSelectedBrand("Porsche")}
          >
            Porsche
          </button>
          <button
            className={`mr-4 p-2 ${
              selectedBrand === "Ferrari" ?  "text-[#0de0dc]":  "text-white"
            }`}
            onClick={() => setSelectedBrand("Ferrari")}
          >
            Ferrari
          </button>
       
          <button
            className={`p-2 ${
              selectedBrand === "Lamborghini" ? "text-[#0de0dc]":  "text-white"
            }`}
            onClick={() => setSelectedBrand("Lamborghini")}
          >
            Lamborghini
          </button>
        </div>
        <>
          {selectedBrand === "Ferrari" && (
            <FerrariF150Canvas rotate={rotateToggle} zoom={zoomToggle} lightPosition={lightPosition}  />
          )}
          {selectedBrand === "Porsche" && (
            <PorscheCanvas rotate={rotateToggle} zoom={zoomToggle} lightPosition={lightPosition} />
          )}
          {selectedBrand === "Lamborghini" && (
            <LamborghiniCanvas rotate={rotateToggle} zoom={zoomToggle} lightPosition={lightPosition} />
          )}
        </>
      </div>
      <div className="absolute flex  gap-2 bottom-[15%] left-1/2 transform -translate-x-1/2 lg:gap-4 lg:flex lg:flex-col  lg:top-[50%] lg:right-[10px] lg:left-auto lg:transform-none">
      <button
  className={`text-[10px] p-1 border rounded ${rotateToggle ? 'text-[#0de0dc]' :  'text-white]'}`}  onClick={toggleRotate}
>
          {rotateToggle ? 'Rotate On' : 'Rotate Off'}
        </button>
        <button
  className={`text-[10px] p-1 border rounded ${zoomToggle ? 'text-[#0de0dc]' :  'text-white]'}`}
  onClick={toggleZoom}
>
          {zoomToggle? 'Zoom On' : 'Zoom Off '}
        </button>
    
      </div>
      <div className="flex flex-col absolute bottom-0 left-1/2 transform -translate-x-1/2">
      <h2 className="text-[10px] ">Light Position:</h2>
      <label>
        X:
        <input
          type="range"
          name="0"
          min="-100"
          max="100"
          step="1"
          value={lightPosition[0]}
          onChange={handleSliderChange}
        />
      </label>
      <label>
        Y:
        <input
          type="range"
          name="1"
          min="0"
          max="1000"
          step="1"
          value={lightPosition[1]}
          onChange={handleSliderChange}
        />
      </label>
      <label>
        Z:
        <input
          type="range"
          name="2"
          min="-1000"
          max="100"
          step="1"
          value={lightPosition[2]}
          onChange={handleSliderChange}
        />
      </label>
     
    </div>
    <>
    
    </>
    </div>
  );
};

export default Hero;
