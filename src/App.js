import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Notes from "./views/Notes";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [user, setUser] = useState('');
  const value = {
    user,
    setUser,
  };
  return (
    <UserContext.Provider value={value}>
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
    </UserContext.Provider>
  );
}

export default App;
