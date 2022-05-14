import "./styles.css";
import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "./Draggable";

const BoxStyle = {
  width: "50px",
  height: "50px"
};

export default function App() {
  const movableArea = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState([
    {
      id: 1,
      position: {
        x: 0,
        y: 0
      },
      color: "red"
    },
    {
      id: 2,
      position: {
        x: 100,
        y: 100
      },
      color: "green"
    }
  ]);

  const updatePosition = (id: number, x: number, y: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, position: { x: x, y: y } };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

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
        {items.map((item) => {
          return (
            <Draggable
              key={item.id}
              movableArea={movableArea}
              initPosition={{ x: item.position.x, y: item.position.y }}
              updatePosition={(x, y) => updatePosition(item.id, x, y)}
            >
              <div style={{ ...BoxStyle, backgroundColor: item.color }}></div>
            </Draggable>
          );
        })}
      </div>
      {JSON.stringify(items)}
    </div>
  );
}
