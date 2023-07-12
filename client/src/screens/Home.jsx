import React, { useEffect } from "react";
import Navbar from "../compnents/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Home() {
  const navigate = useNavigate();

  const getData = async () => {
    const cookie = Cookies.get("jwt");
    if (cookie) navigate("/user");
    
  };
  useEffect(() => {
    getData();
  });

  return (
    <div className="my-container">
      <Navbar page="home" />

      <div className="box">
        <h1 className="heading">
          <span className="heading--main fst-italic">To do List App</span>
          <span className="heading--sub">Write to do</span>
        </h1>
      </div>
    </div>
  );
}
