import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import { Container, Card, Input, Row } from "reactstrap";

const TodoList = () => {

  const [todo, setTodo] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(-1);
  const [page, setPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  
  console.log(isCompleted);

  // getTodos
  const fetchTodosData = async () => {
    const res = await axios.get(`/getTodos?sort=${sort}&search=${search}&page=${page}`);
    if (res.status === 200) {
      setTodo(res.data.todo);
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, [todo]);

  const handleCheckbox = async (todoId) => {
    try {
      const res = await axios.patch(`/isCompleted/${todoId}`,{
        isCompleted: !isCompleted
      });
      if(res.status === 200){
        setIsCompleted(!isCompleted);
      }else{
        console.log("Error Occured")
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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

  const handlePrevios = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1
    })
  };

  const handleNext = () => {
    setPage(() => {
      if (page === page + 1) return page;
      return page + 1
    })
  };




  return (
    <>
      <Container>
        <Row>
          <div className="col-lg-10 mt-3">
            <Input type="text" placeholder='Search Todo' value={search} name={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="mt-3 col-lg-2">
            <button className="btn btn-primary col-sm-12 col-12 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <b>  Sort Todos </b>
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#" onClick={() => setSort(-1)}>New</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setSort(1)}>Old</a></li>
            </ul>
          </div>
        </Row>
      </Container>
      <Container className="mt-3">
        <Card className="border border-1 border-warning">
          {/* <CardBody> */}
          <div className="d-flex justify-content-between px-2 mt-1">
            <div>
              <h4>Status</h4>
            </div>
            <div>
              <h4>Title</h4>
            </div>
            <div>
              <h4>Task</h4>
            </div>
            <div>
              <h4>Action</h4>
            </div>
          </div>
          {/* </CardBody> */}
        </Card>

      </Container>
      {
        todo && todo.length > 0 ? (
          todo
            .map((todo) => (
              <>
                <Container key={todo._id}>
                  <Card className="mt-1">
                    <div className="d-flex justify-content-between px-2 mt-2" key={todo._id}>
                      {/* //checkbox */}
                      <div>
                        <input className="form-check-input" type="checkbox" checked={isCompleted} onChange={handleCheckbox} />
                      </div>
                      <div>
                        <h5>{todo.title}</h5>
                      </div>
                      <div className="mt-">
                        <h5>{todo.tasks}</h5>
                      </div>
                      {/* Edit & Delete */}
                      <div className="d-flex mb-2">
                        <button
                          className="btn btn-sm btn-secondary sm:col-12 mx-1"
                          onClick={() => handleEdit(todo)}
                        >
                          Edit <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger sm:col-12"
                          onClick={() => handleDelete(todo._id)}
                        >
                          Delete <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
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
      <div className='fixed-bottom'>
      <nav aria-label="..." className="d-flex justify-content-end mx-3">
        <ul className="pagination">
          <li className="page-item">
            <btn className="page-link btn" onClick={handlePrevios}>Previous</btn>
          </li>
          <li className="page-item">
            <btn className="mt- page-link btn" onClick={handleNext}>Next</btn>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default TodoList;
