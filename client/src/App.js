import React, { useEffect } from "react";
import './App.css';
import Dashboard from "./components/Pages/Dashboard";
import SignupForm from "./components/SignupForm";
import LoginForm from './components/LoginForm';
import Navbar from "./components/Pages/Navbar";
import { Routes, Route } from "react-router-dom";
import BackendDataList from "./components/BackendDataLists";

function App() {

  return (
    <>
      <Navbar />
        <Routes>
        <Route exact path="/" element={ <Dashboard />} />
        <Route exact path="/dashboard" element={ <Dashboard />} />
        <Route exact path="/signup" element={ <SignupForm />} />
        <Route exact path="/users" element={ <BackendDataList />} />
        <Route path="/login" element={<LoginForm/>} />
      </Routes>
    </>
  );
}

export default App;
