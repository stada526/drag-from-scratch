import "./styles.css";
import React, { useState, useRef, useEffect } from "react";

const BoxStyle = {
  width: "50px",
  height: "50px"
};

export default function App() {
  const movableArea = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragHandler = (event: MouseEvent) => {
    if (!isDragging) return;
    console.log(event.clientX);
    setTranslate({ x: event.clientX - delta.x, y: event.clientY - delta.y });
  };
  const onDragStop = (event: React.MouseEvent) => {
    console.log("stop");
    setIsDragging(false);
    movableArea.current?.removeEventListener("mousemove", onDragHandler);
    movableArea.current?.removeEventListener("mouseup", onDragStop);
  };
  const onDragStart = (event: React.MouseEvent) => {
    console.log("start");
    setIsDragging(true);
    const deltaX = event.clientX - translate.x;
    const deltaY = event.clientY - translate.y;
    setDelta({ x: deltaX, y: deltaY });
  };

  useEffect(() => {
    movableArea.current?.addEventListener("mousemove", onDragHandler);
    movableArea.current?.addEventListener("mouseup", onDragStop);
    movableArea.current?.addEventListener("mouseleave", onDragStop);
  }, [isDragging]);

  return (
    <div className="App">
      <div
        ref={movableArea}
        style={{ width: "500px", height: "500px", border: "1px solid" }}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)`
          }}
          onMouseDown={onDragStart}
        >
          <div style={{ ...BoxStyle, backgroundColor: "red" }}></div>
        </div>
      </div>
      {JSON.stringify(delta)}
    </div>
  );
}
