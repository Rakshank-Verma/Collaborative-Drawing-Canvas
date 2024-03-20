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
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  const changePenColor = (color) => {
    contextRef.current.strokeStyle = color;
  };

  const changeEraserSize = (size) => {
    contextRef.current.lineWidth = size;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.backgroundColor = "#274c43";
    canvas.width = "600";
    canvas.height = "300";

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "wheat";

    context.lineWidth = 3;
    contextRef.current = context;
  }, []);

  return (
    <>
      <div className="inline">
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={(e) => {
            setPos((prePos) => ({ ...prePos, x: e.clientX, y: e.clientY }));
            setIsDrawing((prev) => (prev = true));
          }}
          onMouseUp={() => setIsDrawing((prev) => (prev = false))}
          onMouseMove={draw}
        />
      </div>
      <div
        className="w-5 h-5 bg-red-500"
        onClick={() => changePenColor("Red")}
      ></div>
      <div
        className="w-5 h-5 bg-yellow-500"
        onClick={() => changePenColor("Yellow")}
      ></div>
      <div
        className="w-5 h-5 bg-green-500"
        onClick={() => changePenColor("Green")}
      ></div>
      <div onClick={() => changePenColor("#274c43")}>
        eraser
      </div>
      <input type="range" id="vol" name="vol" min="0" max="50" onChange={(e)=>{changeEraserSize(e.target.value)}}></input>

    </>
  );
};

export default App;
