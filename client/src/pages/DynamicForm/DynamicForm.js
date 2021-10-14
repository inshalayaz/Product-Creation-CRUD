import React, { useContext, useState } from "react";
import Field from "../../components/Form/Field/Field";
import { useDrop } from "react-dnd";
import "./Style.css";
import { Button } from "antd";
import { AppContext } from "../../context/AppContext";

const FieldList = [
  {
    id: 1,
    type: "text",
  },
  {
    id: 2,
    type: "radio",
  },
  {
    id: 3,
    type: "checkbox",
  },
  {
    id: 4,
    type: "email",
  },
];

function Form() {
  const { board, setBoard } = useContext(AppContext);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const fieldList = FieldList.filter((field) => id === field.id);
    setBoard((board) => [...board, fieldList[0]]);
  };

  const removeField = (e, id) => {
    console.log(board);
    const newBoard = board.filter((field) => id !== field.id);
    setBoard(newBoard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <>
      <div className="Pictures">
        {FieldList.map((field) => {
          return <Field type={field.type} id={field.id} />;
        })}
      </div>
      <div className="Board" ref={drop}>
        <form onSubmit={handleSubmit}>
          {board.map((field) => {
            return (
              <div className="inputs">
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.type}
                />

                <Button
                  type="primary"
                  danger
                  onClick={(e) => removeField(e, field.id)}
                  className="btn"
                >
                  Delete
                </Button>
                <br />
              </div>
            );
          })}
          {board.length ? (
            <button type="submit" value="Submit" style={{ marginTop: "30px" }}>
              Submit
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}

export default Form;
