const login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  };

  const response = fetch('https://ebytr-backend.herokuapp.com/', requestOptions)
    .then((res) => res.json())
    .then((data) => data);
  return response;
};

module.exports = {
  login,
};
