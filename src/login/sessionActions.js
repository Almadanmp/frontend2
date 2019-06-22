import axios from "axios";

export function logInUser(username, password) {
  return axios
    .post('https://smart-home-server-g2.herokuapp.com/login', {username, password}, {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
    })
    .then(res => {
      localStorage.setItem('loginToken', res.headers.authorization)
      localStorage.setItem('user', username)
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.resolve(err.statusCode);
    })
}
