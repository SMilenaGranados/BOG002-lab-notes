import React from "react";
import firebase from "./configuration/Firebase";
import "firebase/auth";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Notes from "./routes/Notes";

function App() {

  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
  })

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/notes">
            <Notes />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
