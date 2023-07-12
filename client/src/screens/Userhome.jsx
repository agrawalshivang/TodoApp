import React, { useEffect, useState } from "react";
import Usernav from "../compnents/Usernav";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Userhome.css";

export default function Userhome() {
  const [user, setUser] = useState(null);
  const [newItem, setNew] = useState("");
  const [dtodos, setdTodos] = useState([]);
  const [ntodos, setnTodos] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    if (!Cookies.get("jwt")) {
      setUser(null);
      navigate("/signin");
      return;
    }
    const res = await fetch("https://todo-app-nu3s.onrender.com/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: Cookies.get("jwt") }),
    });
    const json = await res.json();
    setUser(json.user);
    setdTodos(json.dtodos);
    setnTodos(json.ntodos);
  };

  const handleOnChange = (e) => {
    setNew(e.target.value);
  };

  const complete = async (index) => {
    if (!Cookies.get("jwt")) {
      setUser(null);
      navigate("/signin");
      return;
    }
    const res = await fetch("https://todo-app-nu3s.onrender.com/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: Cookies.get("jwt"),
        id: ntodos[index]._id,
      }),
    });
    const json = await res.json();
    setUser(json.user);
    setdTodos(json.dtodos);
    setnTodos(json.ntodos);
  };

  const undo = async (index) => {
    if (!Cookies.get("jwt")) {
      setUser(null);
      navigate("/signin");
      return;
    }
    const res = await fetch("https://todo-app-nu3s.onrender.com/undo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: Cookies.get("jwt"),
        id: dtodos[index]._id,
      }),
    });
    const json = await res.json();
    setUser(json.user);
    setdTodos(json.dtodos);
    setnTodos(json.ntodos);
  };

  const remove = async (index) => {
    if (!Cookies.get("jwt")) {
      setUser(null);
      navigate("/signin");
      return;
    }
    const res = await fetch("https://todo-app-nu3s.onrender.com/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: Cookies.get("jwt"),
        id: dtodos[index]._id,
      }),
    });
    const json = await res.json();
    setUser(json.user);
    setdTodos(json.dtodos);
    setnTodos(json.ntodos);
  };

  const add = async (e) => {
    e.preventDefault();
    const post = newItem;
    if (!Cookies.get("jwt")) {
      setUser(null);
      navigate("/signin");
      return;
    } else if (post === "") {
      return;
    }
    const res = await fetch("https://todo-app-nu3s.onrender.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: Cookies.get("jwt"), add: post }),
    });
    const json = await res.json();
    setUser(json.user);
    setdTodos(json.dtodos);
    setnTodos(json.ntodos);
    setNew("");
  };

  useEffect(() => {
    getData();
  });

  if (user === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="my-container">
        <Usernav user={user} />
        <div className="items">
          <div className="add">
            <h2>Remaining Tasks</h2>
            {ntodos.map((item, index) => {
              return (
                !item.done && (
                  <div className="ntodo">
                    <div className="mx-2 fs-5 p-3">
                      <span className="index me-3">
                        {index + 1}
                        {")"}
                      </span>
                      <span className="body">{item.value}</span>
                    </div>
                    <div className="options mx-5">
                      <button
                        className="btn btn-success mb-2 me-2"
                        onClick={() => {
                          complete(index);
                        }}
                      >
                        Done
                      </button>
                      <button className="btn btn-danger mb-2">Edit</button>
                    </div>
                  </div>
                )
              );
            })}
            <form>
              <input
                type="text"
                className="new fs-3"
                aria-describedby="emailHelp"
                placeholder="Add a to do"
                value={newItem}
                onChange={handleOnChange}
              />
              <button className="btn btn-success d-block m-2" onClick={add}>
                Add
              </button>
            </form>
          </div>
          <div className="add">
            <h2>Completed Tasks</h2>
            {dtodos.map((item, index) => {
              return (
                item.done && (
                  <div className="dtodo">
                    <div className="mx-2 fs-5 p-3">
                      <span className="index me-3">
                        {index + 1}
                        {")"}
                      </span>
                      <span className="body">{item.value}</span>
                    </div>
                    <div className="options mx-5">
                      <button
                        className="btn btn-danger mb-2 me-2"
                        onClick={() => {
                          undo(index);
                        }}
                      >
                        Undo
                      </button>

                      <button
                        className="btn btn-danger mb-2"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
