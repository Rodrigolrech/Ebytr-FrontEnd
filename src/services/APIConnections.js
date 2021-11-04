const login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({ email, password }),
  };

  const response = fetch('https://ebytr-backend.herokuapp.com/', requestOptions)
    .then((res) => res.json())
    .then((data) => data);
  return response;
};

const newUser = async (username, email, password, role) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      username, email, password, role,
    }),
  };
  const response = fetch('https://ebytr-backend.herokuapp.com/user', requestOptions)
    .then((res) => res.json())
    .then((data) => data);
  return response;
};

module.exports = {
  login,
  newUser,
};
