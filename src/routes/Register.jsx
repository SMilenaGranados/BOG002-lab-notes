import React from "react";
import { auth } from "../configuration/Firebase";
import logoAllNotes from "../assets/LogoAllNotes.png";
import { useForm } from "../hooks/useForm";


const Register = () => {
  const [formValues, handleInputChange ] = useForm({
    //name: "",
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const registerUser = (e) => {
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email, password)
  }

  return (
    <section>
      <div>
        <img src={logoAllNotes} alt="logo" />
      </div>

      <form onSubmit={ registerUser }>
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
        <p>Mensaje de error</p>

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
        <p>Mensaje de error</p>
        <button type="submit" class="button">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;

