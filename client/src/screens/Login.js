// login page
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"


function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate()



  // form fun
  async function handleSubmit(e) {
    // synthetic event
    e.preventDefault();

    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );

    // backend link(hit backend)
    // http://localhost:5000/api/loginuser

    const response = await fetch("http://localhost:5000/api/loginuser", {
      // backend data r in post method
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // backend data with front end data
      // we refer to the backend data
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // take response in json
    const json = await response.json();
    console.log(json);

    // in backend createuser file json success is false
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if(json.success){
      // authtoken comes from backend
      localStorage.setItem('userEmail', credentials.email)//email saved
      localStorage.setItem("authToken",json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }
  }

  // onchange fun
  async function onChange(e) {
    // on changing name it hit the fun and take the name equals to the value
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    


  <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
  <div>
    <Navbar />
  </div>
  <div className='container'>
    <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
      <div className="m-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
      </div>
      <div className="m-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
      </div>
      <button type="submit" className="m-3 btn btn-success">Submit</button>
      <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User</Link>
    </form>

  </div>
</div>
  );
}

export default Login;






