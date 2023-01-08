import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


import { Container, Card} from "reactstrap";

const TodoList = ({handleSearch}) => {
  const [todo, setTodo] = useState([]);
  const [page, setPage] = useState(0);
  const [completed, setIscompleted] = useState();

  //getTodos
  const fetchTodosData = async (page) => {
    const res = await axios.get(`/getTodos?page=${page}`);
    if (res.status === 200) {
      setTodo(res.data.todo);
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchTodosData(page);
  }, [todo, page]);


  const handleEdit = async (todo) => {
    const todoTitle = prompt("Enter new Title");
    const todoTask = prompt("Enter new Task");

    if (!todoTitle || !todoTask) {
      alert("Please enter both field");
    } else {
      const res = await axios.put(`/editTodo/${todo._id}`, {
        ...todo,
        title: todoTitle,
        tasks: todoTask,
      });
      console.log(res);
      fetchTodosData();
    }
  };

  const handleDelete = async (todoId) => {
    const canDelete = window.confirm("Are your Sure?");
    if (canDelete) {
      const res = await axios.delete(`/deleteTodo/${todoId}`);
      console.log(res);
      fetchTodosData();
    }
  };

  const handleIscompleted = (e) => {
    setIscompleted(e.target.value)
    console.log(completed);
  }

  return (
    <>
      <Container className="mt-3">
        <Card className="border border-2 border-warning">
          {/* <CardBody> */}
          <div className="d-flex justify-content-between px-2 mb-4 mt-2">
            <div>
              <h3>Status</h3>
            </div>
            <div>
              <h3>Title</h3>
            </div>
            <div>
              <h3>Task</h3>
            </div>
            <div>
              <h3>Action</h3>
            </div>
          </div>
          {/* </CardBody> */}
        </Card>

      </Container>
      {
        todo && todo.length > 0 ? (
          todo && todo.map((todo) => (
            <>
              <Container key={todo._id}>
                <Card className="border border-2 border-warning mt-1">
                  {/* <CardBody> */}
                  <div className="d-flex justify-content-between px-2 mt-2" key={todo._id}>
                    <div>
                      <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={handleIscompleted} />
                    </div>
                    <div className="mt-2">
                      <h4>{todo.title}</h4>
                    </div>
                    <div className="mt-2">
                      <h4>{todo.tasks}</h4>
                    </div>
                    <div>
                      <button
                        className="btn btn-secondary sm:col-12 mx-1"
                        onClick={() => handleEdit(todo)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger sm:col-12"
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                  {/* </CardBody> */}
                </Card>
              </Container>
            </>
          ))
        ) : (
          <Container style={{ width: "18rem" }}>
            <Card className="border border-2 border-warning mt-2 text-center">No data to todos, add one!</Card>
          </Container>
        )
      }
        <div className='border border-danger fixed-bottom'>
          <nav aria-label="..." className="d-flex justify-content-end fixed-bottom mx-5">
            <ul className="pagination">
              <li className="page-item">
                <btn className="page-link btn" onClick={() => setPage(page - 1)}>Previous</btn>
              </li>
              <li className="page-item">
                <btn className="page-link btn" onClick={() => setPage(page + 1)}>Next</btn>
              </li>
            </ul>
          </nav>
        </div>
    </>
  );
};

export default TodoList;
