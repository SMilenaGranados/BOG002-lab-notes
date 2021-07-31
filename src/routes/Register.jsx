import React, { useEffect } from "react";
import logoAllNotes from "../assets/LogoAllNotes.png";
import { useForm } from "../hooks/useForm";

const Register = () => {
  const [formValues, handleInputChange ] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formValues;

  useEffect( () => {
      console.log("email cambio")
  }, [ password ]);

  const handleSubmit = (e) => {
      e.preventDefault();

      console.log( formValues );

  }

  return (
    <section>
      <div>
        <img src={logoAllNotes} alt="logo" />
      </div>

      <form onSubmit={ handleSubmit }>
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

// firebase.auth().onAuthStateChanged(user => {
//     console.log(user);
//   })