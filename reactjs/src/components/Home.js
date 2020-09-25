import React, {
  useState
} from "react";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";

const Home = (props) => {

  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isBanned, setIsBanned] = useState(undefined);

  let user = false;
  if (!currentUser) {
    user = AuthService.getCurrentUser();
  }

  if (user) {
    setCurrentUser(user);
    setIsModerator(user.roles.includes("ROLE_MODERATOR"));
    setIsAdmin(user.roles.includes("ROLE_ADMIN"));
    setIsBanned(user.roles.includes("ROLE_BANNED"));
  }

  let signInRequiredMsgStyle = {display:'none'};
  if (props.location.isRedirect) {
    signInRequiredMsgStyle = {display:'block',color:'red'};
  }

  let id = currentUser?.id ? currentUser.id : 0;

  return (
    <div key={id} className="container">
      <h3>Welcome!</h3>
      {!currentUser && <p style={{color:"green"}}>To get started, sign in with Google above.</p> }
      <p>If this is your first time running this, initilize the database by running in a shell terminal on the HOST:</p>
      <p>docker exec -it db bash -c "bash /mysql/docker_init_mysql.sh"</p>
      <p style={signInRequiredMsgStyle}>You must be signed in to access that page.</p>
      {currentUser && <div><p>The 'call user' endpoints below require the user to be both logged in and have the necessary role set for them in the user table. See /server/config/roles.config.js for more about roles.</p>
        <p>The server user routes (/server/routes/user.routes.ejs) authenticate the logged in user as well as validate that the user's role allows them to have access to the endpoint. (Actual authentication and role validation done in /server/middleware/authJwt.js).</p>
        <p>Axios is used to make the http request and the server response is handled in page with JSON.</p>
        <ul>
        <li className="nav-item">
          {isBanned ? "User is banned. ": "User is logged in. "}
          <Link to={"/user"} className="nav-link">
            Call user only endpoint.
          </Link>
        </li>
        <li className="nav-item">
          {isModerator ? "User has the role of moderator. ": "User does not have the role of moderator. "}
          <Link to={"/mod"} className="nav-link">
            Call user mod/admin only endpoint.
          </Link>
        </li>
        <li className="nav-item">
          {isAdmin ? "User has the role of admin. ": "User does not have the role of admin. "}
          <Link to={"/admin"} className="nav-link">
            Call user admin only endpoint.
          </Link>
        </li>
        </ul>
        While the url changes for each link above when clicked on, this is a single page application and the server gets called via Axios on the subsequent render. That is, the url changing does not trigger the browser to make a request of the server, the url changing triggers React to make the server call. The server is expecting json and returning json always.

        <hr />

        <p>To set user permission on a user, run the following queries from the host. Docker will pass the queries on to mysql:</p>
        <p>User<br />
        docker exec -i db mysql -uroot -proot --database=login {'\u003C\u003C\u003C'} "UPDATE users SET role=1 WHERE id={currentUser.id}";
        </p>
        <p>Mod<br />
        docker exec -i db mysql -uroot -proot --database=login {'\u003C\u003C\u003C'} "UPDATE users SET role=5 WHERE id={currentUser.id}";</p>
        <p>Admin<br />
        docker exec -i db mysql -uroot -proot --database=login {'\u003C\u003C\u003C'} "UPDATE users SET role=7 WHERE id={currentUser.id}";</p>
        <p>To ban a user: <br />
        docker exec -i db mysql -uroot -proot --database=login {'\u003C\u003C\u003C'} "UPDATE users SET role=0 WHERE id={currentUser.id}";</p>

      </div>
      }

    </div>
  );
};

export default Home;
