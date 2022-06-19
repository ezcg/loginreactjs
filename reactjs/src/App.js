import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Header from "./components/Header";

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      if (user.roles.includes("ROLE_MODERATOR")) {
        user.isModerator = true
      }
      if (user.roles.includes("ROLE_ADMIN")) {
        user.isAdmin = true
      }
      if (user.roles.includes("ROLE_BANNED")) {
        user.isBanned = true
      }
      setCurrentUser(user);
    }
  }, [])

  let keyVal = currentUser ? 1 : 2

  return (
    <div key={keyVal}>
      <Router>
        <Header currentUser={currentUser} />
        <div className="bodyCont">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
    </Router>
    </div>
  )
}

export default App;
