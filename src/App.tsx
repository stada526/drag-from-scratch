import "./styles.css";
import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "./Draggable";

const BoxStyle = {
  width: "50px",
  height: "50px"
};

export default function App() {
  const movableArea = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <div
        ref={movableArea}
        style={{
          width: "500px",
          height: "500px",
          border: "1px solid",
          margin: "0"
        }}
      >
        <Draggable movableArea={movableArea} initPosition={{ x: 100, y: 200 }}>
          <div style={{ ...BoxStyle, backgroundColor: "red" }}></div>
        </Draggable>
      </div>
    </div>
  );
}
