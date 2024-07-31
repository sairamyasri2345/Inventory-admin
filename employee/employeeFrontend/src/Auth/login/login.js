import React, { useState } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';

const EmpLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    fetch("http://localhost:3003/empLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data.token);
          window.localStorage.setItem('employeeId', data.data.employeeId);
          window.localStorage.setItem("loggedIn", true);
          console.log('Employee ID stored:', data.data.employeeId);

          fetch("http://localhost:3003/layout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: data.data.token }),
          })
            .then((res) => res.json())
            .then((userData) => {
              if (userData.status === "ok") {
                window.localStorage.setItem("userData", JSON.stringify(userData.data));
                window.location.href = "./layout";
              }
            });
        } else {
          alert("error");
        }
      });
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 p-5">
      <div className="row justify-content-center w-100">
        <div className="col-lg-11 d-flex justify-content-center align-items-center">
          <div className="form-container d-flex flex-column flex-md-row bg-white shadow-sm rounded-5 w-100">
            <div className="sub-container col-md-6 d-none d-md-flex align-items-center justify-content-center p-5">
              <div className="bg-container text-white p-4">
                <div className="border-icon-container mb-4">
                  <i className="bi bi-arrow-right"></i>
                </div>
                <p className="mt-5 sub-title">Hi, Welcome!!</p>
                <h1 className="title">Let's Get Started</h1>
                <p className="py-3 sub-title">
                  Sign in to your account to access the platform.
                  <span className="d-block sub-title">
                    We invite you to join us and get a better experience.
                  </span>
                </p>
                <img
                  src={require("../assets/bg-img-removebg-preview.png")}
                  alt="woman with laptop"
                  className="img-logo d-block"
                />
              </div>
            </div>
            <form className="col-md-6 p-5 d-flex flex-column" onSubmit={handleSubmit}>
              <h1 className="login-heading">Login</h1>
              <div className="form-group my-2">
                <label htmlFor="email" className="py-2">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  value={email}
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1" className="py-2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  value={password}
                />
              </div>
              <div className="form-check my-2 d-flex justify-content-between">
                <div className=''>
                <input type="checkbox" className="form-check-input" id="check" />
                <label className="form-check-label" htmlFor="check">Remember me</label>
                </div>
                <div>
                 <h6 className='text-success my-2'>Forgot Password?</h6>
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 btn-lg my-3 rounded-5">
                LOGIN
              </button>
              <div className="text-center">
                <h5>(or)</h5>
                <h5 className="my-3">
                  Don't have an account?<Link className="nav-link text-white fs-5 d-inline text-decoration-none " to="/empSignup"><span className="text-success px-1"> 
                  Register</span></Link> Here
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
