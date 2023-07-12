import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Usernav(props) {
    const navigate=useNavigate();
    const handleLogOut=(e)=>{
        e.preventDefault();
        Cookies.remove("jwt");
        navigate("/")
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fs-3">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/user">
            {props.user.name}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/user">
                  Home
                </Link>
              </li>
            </ul>
           
              <button className="btn btn-outline-danger fs-3" onClick={handleLogOut}>
                Log Out
              </button>
        
          </div>
        </div>
      </nav>
    </div>
  );
}
