import { useState, useRef, useEffect } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (e) => {};

  useEffect(() => {
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext("2d");
    canvas.style.backgroundColor = "#274c43";
    canvas.style.width = "500px";
    canvas.style.height = "300px";
  }, []);

  return <canvas id="canvas" ref={canvasRef} onClick={draw} />;
};

export default App;
