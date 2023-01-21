import axios from "axios";

const API_KEY = "AIzaSyDJ9k2Sn5Lm4EtUReq-lJtwwGDzN6JbteM";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}
  `;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUserRequest(email, password) {
  return authenticate("signUp", email, password);
}

export function loginRequest(email, password) {
  return authenticate("signInWithPassword", email, password);
}
