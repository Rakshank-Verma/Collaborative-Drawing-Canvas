import { useLayoutEffect, useState, useEffect } from "react";
import { useRef } from "react";
import rough from "roughjs";

const generator = rough.generator();

const createElement = (x1, y1, x2, y2) => {
  const roughElement = generator.line(x1, y1, x2, y2, {
    // strokeWidth: 1,
    // disableMultiStroke: true,
    // roughness: 0,
    // stroke: "#000000",
  });
  return { x1, y1, x2, y2, roughElement };
};

const App = () => {
  const [drawing, setDrawing] = useState(false);
  const [elements, setElements] = useState([]);
  const canvaRef = useRef(null);

  useEffect(() => {
    const canvas = canvaRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ x1, y1, x2, y2, roughElement }) => {
      roughCanvas.draw(roughElement);
      console.log(x1, x2, y1, y2);
    });
  });

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseDown = (event) => {
    setDrawing(true);

    const { clientX, clientY } = event;
    // console.log(clientX, clientY);

    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];

    const updatedElement = createElement(x1, y1, clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  return (
    <>
      <canvas
        ref={canvaRef}
        className="w-full h-[80vh] border-[3px] border-green-500 bg-slate-100"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
    </>
  );
};

export default App;
