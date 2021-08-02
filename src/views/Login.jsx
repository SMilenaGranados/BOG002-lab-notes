import React, { useState } from "react";
import firebase from "firebase/app";
import "../styles/login.css";
import { auth } from "../configuration/Firebase";
import { useForm } from "../hooks/useForm";
import logoAllNotes from "../assets/LogoAllNotes.png";
import logoGoogle from "../assets/LogoGoogle.png";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [error, setError] = useState("");
  const { email, password } = formValues;
  const history = useHistory();

  const loginUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/Notes"))
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          setErrorEmail("Please register or enter a valid email address");
          setTimeout(() => {
            setErrorEmail("");
          }, 3000);
        }
        if (err.code === "auth/wrong-password") {
          setErrorPassword("Password invalid");
          setTimeout(() => {
            setErrorPassword("");
          }, 3000);
        }
        if (err.code === "auth/too-many-requests") {
          setError("Access to this account has been temporarily disabled");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  };
  const loginGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => history.push("/Notes"));
  };

  return (
    <section>
      <div>
        <img id="logoAllNotes" src={logoAllNotes} alt="logo" />
        <p id="textCopy">
          ¡Don't let anything slip through!<br></br>
          <strong>All Notes</strong> lets you yake note of everything
        </p>
      </div>

      <div id="containerForm">
        <form onSubmit={loginUser}>
          <div className="form-group">
            <input
              id="inputEmail"
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <p className="error">{errorEmail}</p>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <p className="error">{errorPassword}</p>
          <p className="error">{error}</p>

          <div>
            <button id="buttonLogIn" type="submit" className="button">
              Log In
            </button>
          </div>

          <button id="buttonGoogle" type="button" onClick={loginGoogle}>
            <img id="logoGoogle" src={logoGoogle} alt="logoGoogle" />
            Log in with Google
          </button>
        </form>
      </div>

      <div id="containerButtonRegister">
        <Link to="/Register">
          <button id="buttonForRegister" className="button">
            Register
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Login;
