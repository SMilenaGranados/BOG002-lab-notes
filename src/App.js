import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Notes from "./routes/Notes";

function App() {
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
