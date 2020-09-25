const express = require("express");
const bodyParser = require("body-parser");
global.logger = require('./services/logger');
const app = express();
const cookieParser = require('cookie-parser'); // module for parsing cookies

// Cookie parser must be set up before the routes as routes will read cookies
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// START BUILD LOGIN LINK
app.use(function (req, res, next) {
  let username = req.cookies['username'];
  let loginLink = '';
  if (username) {
    loginLink = "Hi, " + username + " ";
    loginLink+= "<a href='javascript:void(0);' onClick='logOut();'>Logout</a>";
  } else {
    const google = require('googleapis').google;
    const OAuth2 = google.auth.OAuth2;
    const config = require("./config/auth.config");
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
      config.oauth2Credentials.client_id,
      config.oauth2Credentials.client_secret,
      config.oauth2Credentials.redirect_uris[0]
    );
    // Obtain the google login link to which we'll send our users to give us access
    loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
      scope: config.oauth2Credentials.scopes
    });
    loginLink = '<a href="' + loginLink + '">Login with Google</a>';
  }
  res.locals = {
    loginLink: loginLink
  };
  next();
});
// END BUILD LOGIN LINK

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, content-type, Accept",

  );
  next();
});
const cors = require("cors");
let corsOptions = {
  origin: ["http://localhost", "http://localhost:3000"]
};
app.use(cors(corsOptions));

// routes
require('./routes/auth.routes')(app);
require('./routes/index.routes')(app);
require('./routes/user.routes')(app);

// log requests
app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  let str = req.method + " " + req.originalUrl + " ";
  if (req.method === 'GET' && Object.values(req.query).length) {
    str+= JSON.stringify(req.query);
  } else if (Object.values(req.body).length && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')){
    let dataArr = {};
    for(let i in req.body) {
      let value = req.body[i];
      if (value.length > 400) {
        value = value.substr(0,400) + " __TRUNCATED__";
      }
      dataArr[i] = value;
    }
    str+= JSON.stringify(dataArr);
  }
  logger.info(str);
  next();
});

// simple route
app.get("/test", (req, res, next) => {
  res.json({ message: "Welcome." });
});

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
  logger.info(`Environment is ${process.env.ENVIRONMENT}.`);
});

process.on('uncaughtException', function (err) {
  logger.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  logger.error(err.stack)
})

process.on('warning', e => console.warn(e.stack));

function initial() {
//   for(let roleName in Roles) {
//     Role.create({
//       id: Roles[roleName],
//       name: roleName
//     });
//   }
}
