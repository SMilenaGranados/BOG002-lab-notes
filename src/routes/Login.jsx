import React from "react";
import firebase from "firebase/app";
import "../styles/login.css";
import { auth } from "../configuration/Firebase";
import { useForm } from "../hooks/useForm";
import logoAllNotes from "../assets/LogoAllNotes.png";
import logoGoogle from "../assets/LogoGoogle.png";
import { Link } from "react-router-dom";


const Login = () => {
  const [formValues, handleInputChange] = useForm({
    //name: "",
    email: "",
    password: "",
  });

  const { email, password } = formValues;
    
  const loginUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => alert("inicio sesion"))
      .catch((err) => alert("Debe registrarse para iniciar sesion"));
  };

    const loginGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
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
          {/* <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="user name"
            value={name}
            onChange={handleInputChange}
            required
          ></input>
        </div> */}

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
          
          <button id="buttonLogIn" type="submit" class="button">
            Log In
          </button>
         
          <br></br>
          <button id="buttonGoogle" type="button" onClick={loginGoogle}>
            <img id="logoGoogle" src={logoGoogle} alt="logoGoogle" />
            Log in with Google
          </button>
        </form>
      </div>

      <div id="containerButtonRegister">
        <Link to="/Register">
          <button id="buttonForRegister" class="button">
            Register
          </button>
        </Link>
      </div>
    </section>
    
  );
};

export default Login;
