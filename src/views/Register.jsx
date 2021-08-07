import React, { useState } from "react";
import "../styles/register.css";
import { auth } from "../configuration/Firebase";
import logoAllNotes from "../assets/LogoAllNotes.png";
import { useForm } from "../hooks/useForm";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [errorInvalidEmail, setErrorInvalidEmail] = useState("");
  const [errorInUseEmail, setErrorInUseEmail] = useState("");
  const [errorTypePassword, setErrorTypePassword] = useState("");
  const { email, password, name } = formValues;
  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          setErrorInvalidEmail("Please enter email with format user@abc.com");
          setTimeout(() => {
            setErrorInvalidEmail("");
          }, 3000);
        }
        if (err.code === "auth/email-already-in-use") {
          setErrorInUseEmail("email entered is registered");
          setTimeout(() => {
            setErrorInUseEmail("");
          }, 3000);
        }
        if (password.length < 6) {
          setErrorTypePassword("Please enter minimum 6 characters");
          setTimeout(() => {
            setErrorTypePassword("");
          }, 3000);
        }
      });
  };

  return (
    <section>
      <Link to="/">
        <button id="btnCloseRegister">X</button>
      </Link>
      <div>
        <img id="logoAllNotesReg" src={logoAllNotes} alt="logo" />
      </div>

      <div id="containerRegister">
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input
              id="inputName"
              type="text"
              name="name"
              placeholder="user name"
              value={name}
              onChange={handleInputChange}
              required
            ></input>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <p className="error">{errorInvalidEmail}</p>
          <p className="error">{errorInUseEmail}</p>

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
          <p className="error">{errorTypePassword}</p>

          <button id="buttonRegister" type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
