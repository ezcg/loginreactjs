export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  let headerObj = {}
  headerObj['content-type'] = 'application/json';
  if (user && user.accessToken) {
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    headerObj['x-access-token'] = user.accessToken;
    return headerObj;
  } else {
    return headerObj;
  }
}
