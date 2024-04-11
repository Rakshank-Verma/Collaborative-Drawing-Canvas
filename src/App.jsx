import { useState, useRef, useEffect } from "react";

const App = () => {
  let canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserSize, setEraserSize] = useState(10);
  const [prevEraserSize, setPrevEraserSize] = useState(eraserSize);
  const [line, setLine] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.backgroundColor = "#274c43";
    canvas.width = "800";
    canvas.height = "500";

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "wheat";

    context.lineWidth = eraserSize;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    contextRef.current.lineWidth = prevEraserSize;
    drawHistory();
    contextRef.current.lineWidth = eraserSize;
  }, [eraserSize]);

  let coord = [];

  const draw = (e) => {
    if (isDrawing) {
      contextRef.current.beginPath();
      coord.push([pos.x, pos.y]);
      contextRef.current.moveTo(pos.x, pos.y);
      pos.x = e.clientX;
      pos.y = e.clientY;
      coord.push([pos.x, pos.y]);
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  const drawHistory = () => {
    for (let i = 0; i < line.length; i++) {
      for (let j = 0; j < line[i].length - 1; j++) {
        contextRef.current.beginPath();
        contextRef.current.moveTo(...line[i][j]);
        contextRef.current.lineTo(...line[i][j + 1]);
        contextRef.current.stroke();
      }
    }
  };

  const handleOnMouseDown = (e) => {
    setPos((prePos) => ({ ...prePos, x: e.clientX, y: e.clientY }));
    setIsDrawing((prev) => (prev = true));
  };

  const handleOnMouseUp = () => {
    setIsDrawing((prev) => (prev = false));
    setLine([...line, coord]);
  };

  const changePenColor = (color) => {
    contextRef.current.strokeStyle = color;
  };

  const changeEraserSize = (e) => {
    setEraserSize((prev) => {
      setPrevEraserSize((prev) => prev);
      return (prev = e.target.value);
    });
  };

  return (
    <>
      <div className="inline">
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
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
      <div className="cursor-pointer" onClick={() => changePenColor("#274c43")}>
        eraser
      </div>
      <input
        type="range"
        id="eraser"
        min="0"
        max="50"
        value={eraserSize}
        // onChange={(e)=> setEraserSize(e.target.value)}
        onChange={changeEraserSize}
      ></input>
    </>
  );
};

export default App;
