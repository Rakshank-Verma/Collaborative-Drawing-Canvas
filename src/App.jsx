import { useState, useRef, useEffect } from "react";

const App = () => {
  let canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (e) => {
    if (isDrawing) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(pos.x, pos.y);
      pos.x = e.clientX;
      pos.y = e.clientY;
      // setPos((prePos) => ({ ...prePos, x: e.clientX, y: e.clientY }));
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.backgroundColor = "#274c43";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "white";

    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseDown={(e) => {
        // console.log(e.nativeEvent);
        setPos((prePos) => ({ ...prePos, x: e.clientX, y: e.clientY }));
        setIsDrawing((prev) => (prev = true));
      }}
      onMouseUp={() => setIsDrawing((prev) => (prev = false))}
      onMouseMove={draw}
    />
  );
};

export default App;
