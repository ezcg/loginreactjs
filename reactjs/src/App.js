import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import LoginHooks from './components/LoginHooks';
import LogoutHooks from './components/LogoutHooks';

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:"70px"}}>
          <Link to={"/home"} className="navbar-brand">
            Login with ReactJS and Google Oauth2
          </Link>

          {currentUser && (
              <Link to={"/profile"} className="nav-link" style={{color:'#ffffff'}}>
                Profile
              </Link>
          )}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link" style={{color:'#ffffff'}}>
                {currentUser.name}
              </Link>
            </li>
            <li className="nav-item">
              <LogoutHooks />
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <LoginHooks />
          </div>
        )}
        </nav>

        <div className="container mt-3">
          <Switch>
            {/*Public routes*/}
            <Route exact path={["/", "/home"]} component={Home} />

            <ProtectedRoute path="/profile" component={Profile} />

            {/*Role related routes*/}
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
