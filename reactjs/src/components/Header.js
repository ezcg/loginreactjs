import React from 'react'
import { Link } from 'react-router-dom'
import LogoutHooks from './LogoutHooks'
import LoginHooks from './LoginHooks'

function Header({currentUser}) {

  let keyVal = currentUser ? "loggedIn" : "not"

  return (<div key={keyVal}>

    <div className="headerCont">
      <div className="headerHomeLinkCont">
        <Link to="/" className="headerHomeLink">
          Home
        </Link>
      </div>

      {currentUser && (
        <div className="headerLinkCont">
          <Link to="/profile" className="headerLink">
            Profile
          </Link>
        </div>
      )}

      {currentUser ? (
        <>
          <div className="headerLinkCont">
            <Link to="/profile" className="headerLink">{currentUser.name}</Link>
          </div>
          <div className="logoutCont">
            <LogoutHooks />
          </div>
        </>
      ) : (
        <div className="headerLink">
          <LoginHooks />
        </div>
      )}
      <div className="cb"></div>
    </div>

    </div>)
}

export default Header