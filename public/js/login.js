/* eslint-disable */
// import axios from 'axios';
// const axios = require('axios');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log('hi');
    if (res.data.status === 'success') {
      alert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert('error', err.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:4000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
    alert('error', 'Error logging out! Try again.');
  }
};

const loginForm = document.querySelector('.form--login');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
