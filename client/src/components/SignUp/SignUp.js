import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import "./SignUp.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [admin, setAdmin] = useState(false);

  // const { name, phonenum, rollnum, year, branch, fathername, fatherphonenum, photolink, date } = { name: "kritik", phonenum: 838383838, rollnum: 22, year: 3, branch: "cse", fathername: "father", fatherphonenum: 888888888, photolink: "abc.abc", date: new Date().toLocaleString(), }
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const checkGuest = (e) => {
    if (email !== "guest@gmail.com") {
      alert("Not a guest, you are unwelcome");
      setFormData({ ...formData, email: "", password: "" });
    } else onSubmit(e);
  };
  const onSubmit = async (e) => {
    if (email === "guest@gmail.com") {
      alert("Login as a guest you fool");
      return;
    }
    const whoUse = admin ? "AdminSignIn" : "SignIn";
    const auth = admin ? "admin" : "user";
    e.preventDefault();
    // ASYNC keyword makes the followoing staement asynchronous, which means that other part of code could be executed while the async functions wait for promise resolution. AWAIT keywords waits for promise resoulution, if successful then it's following statements are executed, if promise returns false, then the execution jumps to catch block
    try {
      const result = await fetch(`${API}/${whoUse}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const response = await result.json();
      if (response.errors) window.alert(response.errors[0].msg);
      if (response.jwtToken) {
        localStorage.setItem("sessionUser", response.jwtToken);
        localStorage.setItem("Auth", auth);
        navigate("/");
      }
    } catch (err) {
      console.log("the following are encountered", err);
    }
  };
  return (
    <div className="mainsignup">
      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <p id="heading">Login</p>
        <ul
          className="nav nav-pills nav-justified mb-3"
          id="ex1"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
              onClick={() => {
                setAdmin(false);
              }}
            >
              User
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="tab-register"
              data-mdb-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
              onClick={() => {
                setAdmin(true);
              }}
            >
              Admin
            </a>
          </li>
        </ul>

        <div className="field">
          <i className="fa-solid fa-at fa-sm"></i>
          <input
            autocomplete="off"
            placeholder="Username"
            name="email"
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => {
              onchange(e);
            }}
          />
        </div>
        <div className="field">
          <i className="fa-solid fa-lock fa-sm"></i>
          <input
            placeholder="Password"
            className="input-field"
            name="password"
            value={password}
            onChange={(e) => {
              onchange(e);
            }}
            type={visible ? "text" : "password"}
          />
          <i
            onClick={() => {
              setVisible((prev) => {
                return !prev;
              });
            }}
            className={
              visible ? "fa-solid fa-eye fa-sm" : "fa-solid fa-eye-slash fa-sm"
            }
          ></i>
        </div>

        <button type="submit" className="button3">
          Sign In
        </button>
        <button
          type="button"
          className="button3"
          onClick={(e) => checkGuest(e)}
        >
          Guest Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
