import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Row, Col, Button, Input, Container } from "reactstrap";

const Todo = () => {
  const [todo, setTodo] = useState();
  const [newtodo, setNewTodo] = useState([]);

  const addToDo = () => {
    const newData = { todo: todo };
    setNewTodo([...newtodo, newData]);
    toast.success("Added");
    setTodo("");
  };
  const clearTodo = (index) => {
    var newlist = newtodo;
    newlist.splice(index, 1);
    setNewTodo([...newlist]);
  };
  return (
    <div
      className="text-center border border-bottom-secondary"

    >
      <Container style={{ width: "50rem" }}>
        <Row>
          <Col className="todoapp container-fluid">
            <h3 className="my-3">Todo App React</h3>
            <div className="d-flex container fluid w-100">
              <Input
                className="my-3 mx-auto"
                type="text"
                placeholder="Add Your Task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <Button
                className="btn-warning btn-sm m-3"
                onClick={addToDo}
              >
                Add Todo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

    <Container className="mx-5">
    {newtodo.map((value, index) => {
        return (
          <>
            <ToastContainer position="bottom-right" autoClose={1000} />

            <div className="d-flex justify-content-around">
              <div className="mt-3 d-block" style={{width: "90px"}}>
                {value.todo} </div>
                <div>
                <Button
                  className="btn btn-warning mx-5 mt-3"
                  onClick={() => clearTodo(index)}
                >
                  Edit{" "}
                </Button>
                <Button
                  className="btn btn-warning mt-3"
                  onClick={() => clearTodo(index)}
                >
                  Clear{" "}
                </Button>
              </div>
            </div>
          </>
        );
      })}
    </Container>

    </div>
  );
};

export default Todo;
