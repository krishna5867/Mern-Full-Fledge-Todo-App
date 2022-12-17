import React, { useEffect } from "react";
import './App.css';
import Dashboard from "./components/Pages/Dashboard";
import SignupForm  from "./components/SignupForm";

import LoginForm  from './components/LoginForm';
import Navbar from "./components/Pages/Navbar";
import { Routes, Route} from "react-router-dom";
import Todo from "./components/Todos/Todo";
import BackendDataList from "./components/BackendDataLists";
import Signup from "./components/SignupForm";

function App() {

  useEffect(()=>{
    <SignupForm />
  },[])

  return (
    <>
      <Navbar />
    <Routes>
    <Route exact path="/" element={<Signup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/todo" element={<Todo />} />
    <Route path="/BackendDataList" element={<BackendDataList />} />

    </Routes>


    </>
  );
}

export default App;
