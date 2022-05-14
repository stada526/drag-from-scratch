import { RefObject, useState, FC, ReactNode, useEffect } from "react";

type Props = {
  movableArea: RefObject<HTMLDivElement>;
  children: ReactNode;
  initPosition?: { x: number; y: number };
  updatePosition?: (x: number, y: number) => void;
};

const Draggable: FC<Props> = (props) => {
  const { movableArea, children, initPosition, updatePosition } = props;

  const [translate, setTranslate] = useState(
    initPosition
      ? initPosition
      : {
          x: 0,
          y: 0
        }
  );
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragHandler = (event: MouseEvent) => {
    if (!isDragging) return;
    console.log(event.clientX);
    const newX = event.clientX - delta.x;
    const newY = event.clientY - delta.y;
    setTranslate({ x: newX, y: newY });
    if (updatePosition) {
      updatePosition(newX, newY);
    }
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
    <div
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`
      }}
      onMouseDown={onDragStart}
    >
      {children}
    </div>
  );
};

export { Draggable };
