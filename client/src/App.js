import React from "react";
import './App.css';
import Dashboard from "./components/Pages/Dashboard";
import SignupForm from "./components/SignupForm";
import LoginForm from './components/LoginForm';
import Navbar from "./components/Pages/Navbar";
import { Routes, Route } from "react-router-dom";
import BackendDataList from "./components/BackendDataLists";
import Signup from "./components/SignupForm";
import Protected from "./protected"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Protected Component ={Dashboard} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/BackendDataList" element={<Protected Component ={BackendDataList} />} />
      </Routes>
    </>
  );
}

export default App;
