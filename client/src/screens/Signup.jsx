import React, { useState } from "react";
import Navbar from "../compnents/Navbar";
import "./Signup.css";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErr, setFormErr] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [serverErr, setServerErr] = useState(
    "");
  
  const validateForm=()=>{
    let data=formErr
    let flag=true
    if(formData.name.length<3){
      data={...data,name:"Name should have a length of at least 3"}
      flag=false
    }
    else{
      data={...data,name:""}
      
    }
    if(formData.email.length<1){
      flag=false
      data={...data,email:"Email cannot be empty"}
    }
    else if(!formData.email.includes("@")){
      flag=false
      data={...data,email:"Email must contain @"}
    }
    else if(!formData.email.includes("@")){
      data={...data,email:"Invalid Email"}
      flag=false
    }
    else{
      data={...data,email:""}

    }

    if(formData.password.length<8){
      data={...data,password:"Password should have a length of at least 8"}
      flag=false
    }
    else{
      data={...data,password:""}

    }
    setFormErr(data)
    return flag
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const flag=validateForm();
    if(flag===false)
    {
      alert("Invalid details")
    }
    else{
      const res=await fetch('https://todo-app-nu3s.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const json=await res.json();
   
      if(json.success===false){
      
        setServerErr(json.error)
      }
      else{
        navigate("/signin")
      }
    }
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="my-container">
      <Navbar page="home" />
      <div className="form rounded">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              value={formData.name}
            />
            <div className="error">{formErr.name}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              value={formData.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            <div className="error">{formErr.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={handleOnChange}
              value={formData.password}
              className="form-control"
              name="password"
              id="exampleInputPassword1"
            />
            <div className="error">{formErr.password}</div>
          </div>
            <div className="error">{serverErr}</div>

          <button
            type="submit"
            className="btn btn-success"
            onClick={handleOnSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
