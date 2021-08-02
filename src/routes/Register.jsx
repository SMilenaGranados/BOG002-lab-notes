import React from "react";
import "../styles/register.css";
import { auth } from "../configuration/Firebase";
import logoAllNotes from "../assets/LogoAllNotes.png";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";

const Register = () => {
  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formValues;

  const registerUser = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => console.log(email, password, name))
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
          {/* <p>Mensaje de error</p> */}

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
          {/* <p>Mensaje de error</p> */}

          <button id="buttonRegister" type="submit" class="button">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
