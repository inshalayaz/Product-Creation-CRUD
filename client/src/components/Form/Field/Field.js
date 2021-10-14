import React from "react";
import { useDrag } from "react-dnd";

function Field({ id, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return <h4 ref={drag}>{type}</h4>;
}

export default Field;
