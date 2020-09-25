let dev = {};
dev.clienturl = "http://localhost:3000/";
dev.apiUrl = "http://localhost:8080/api/";
dev.apiAuthUrl = "http://localhost:8080/api/auth/";
dev.GOOGLE_CLIENT_ID="SET_IT";
dev.GOOGLE_CLIENT_SECRET="SET_IT";

// overwrite dev with any prod values
let prod = Object.assign({}, dev);
prod.url = "https://ezcg.com/";

const configs = process.env.REACT_APP_ENVIRONMENT === 'dev'
  ? dev
  : prod;

module.exports = configs;

