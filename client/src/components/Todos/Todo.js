import { useState } from "react";
import axios from "axios";
import { Container, Card, CardBody, Input, Row, Toast } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import TodoList from "./TodoList";
import SearchForm from './serach'


const Todo = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");

  const submitData = async () => {
    try {
      const todo = {
        title: title,
        tasks: tasks,
      };

      const res = await axios.post("/createTodo", todo);
      if (res.status === 200) {
        setTitle("");
        setTasks("");
        toast.success("Todo added")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData();

    if ((title || tasks) === "") {
      alert("Todo Field can't be Empty");
    }
  };


  return (
    <>
      <Container fluid>
      <ToastContainer
                    position="top-right"
                    autoClose={1000} />
        <Row>
          <div className="col-lg-4 col-md-12 col-sm-12">
            <Container>
              <Card className="border border-2 border-warning mt-3 pt-3 pb-5">
                <CardBody>
                  <Container>
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex justify-content-between mt-4 mb-4">
                        <div><h3 className=""><b> Todo App</b></h3></div>
                        <div>
                          {/* search box */}
                          {/* <SearchForm /> */}
                        </div>
                      </div>
                      <CardBody className="mt-2 d-flex">
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          value={title}
                          placeholder="Todo Title"
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </CardBody>
                      <CardBody>
                        <Input
                          type="text"
                          id="task"
                          name="task"
                          value={tasks}
                          placeholder="Task Name"
                          onChange={(e) => {
                            setTasks(e.target.value);
                          }}
                        />
                        <button
                          className="btn btn-warning btn-lg col-12  mt-4"
                          type="Submit"
                        >
                          Add Todo
                        </button>
                      </CardBody>
                    </form>
                  </Container>
                </CardBody>
              </Card>
            </Container>
          </div>

          <div className="col-md-12 col-lg-8 ">
            <TodoList />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Todo;
