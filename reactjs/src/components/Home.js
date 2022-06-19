import React from "react";
import { Link } from "react-router-dom";
import Hello from "./Hello";

const Home = ({currentUser}) => {

  let keyVal = currentUser ? "3" : "4"

  return (
    <div className="container" key={keyVal}>
    <h3>Login with ReactJS and Google Oauth2</h3>
    {!currentUser && <Hello/>}
    {currentUser &&
      <div><p>The 'call user' endpoints below require the user to be both logged in and have the necessary role set
        for
        them in the user table. See /server/config/roles.config.js for more about roles.</p>
        <p>The server user routes (/server/routes/user.routes.ejs) authenticate the logged in user as well as validate
          that the user's role allows them to have access to the endpoint. (Actual authentication and role validation
          done
          in /server/middleware/authJwt.js).</p>
        <p>Axios is used to make the http request and the server response is handled in page with JSON.</p>
        <ul>
          <li className="nav-item">
            {currentUser.isBanned ? "User is banned. " : "User is logged in. "}
            <Link to="/user" className="nav-link">
              Call user only endpoint.
            </Link>
          </li>
          <li className="nav-item">
            {currentUser.isModerator ? "User has the role of moderator. " : "User does not have the role of moderator. "}
            <Link to="/mod" className="nav-link">
              Call user mod/admin only endpoint.
            </Link>
          </li>
          <li className="nav-item">
            {currentUser.isAdmin ? "User has the role of admin. " : "User does not have the role of admin. "}
            <Link to="/admin" className="nav-link">
              Call user admin only endpoint.
            </Link>
          </li>
        </ul>
        While the url changes for each link above when clicked on, this is a single page application and the server
        gets
        called via Axios on the subsequent render. That is, the url changing does not trigger the browser to make a
        request of the server, the url changing triggers React to make the server call. The server is expecting json
        and
        returning json always.

        <hr/>

        <p>To set user permission on a user, run the following queries from the host. Docker will pass the queries on
          to
          mysql.</p>
        <p>User<br/>
          docker exec -i db mysql -uroot -proot --database=db {'\u003C\u003C\u003C'} "UPDATE users SET role=1 WHERE
          id={currentUser.id}";
        </p>
        <p>Mod<br/>
          docker exec -i db mysql -uroot -proot --database=db {'\u003C\u003C\u003C'} "UPDATE users SET role=5 WHERE
          id={currentUser.id}";</p>
        <p>Admin<br/>
          docker exec -i db mysql -uroot -proot --database=db {'\u003C\u003C\u003C'} "UPDATE users SET role=7 WHERE
          id={currentUser.id}";</p>
        <p>To ban a user: <br/>
          docker exec -i db mysql -uroot -proot --database=db {'\u003C\u003C\u003C'} "UPDATE users SET role=0 WHERE
          id={currentUser.id}";</p>

      </div>
    }
    </div>
  )
}

export default Home;
