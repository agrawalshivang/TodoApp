import React from "react";
import Home from "./screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup";
import Signin from "./screens/Signin";
import Userhome from "./screens/Userhome";

export default function App() {
  return (
    <div className="h-100">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="/signin" element={<Signin />}/>
        <Route exact path="/user" element={<Userhome />}/>
      </Routes>
    </BrowserRouter>

    </div>
  );
}
