const DB_URL = process.env.REACT_APP_API_URL;

export function postUser(newUserDetail) {
  return fetch(`${DB_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserDetail),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function signOut() {
  return fetch(`${DB_URL}/logout`, { credentials: "include" }).then((res) =>
    res.json()
  );
}

export function getUserToken(loginCredentials) {
  return fetch(`${DB_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function checkUserToken() {
  return fetch(`${DB_URL}/loginCheck`, { credentials: "include" }).then(
    (response) => response.json()
  );
}

export function getUserChannel() {
  return fetch(`${DB_URL}/user/channelList`, { credentials: "include" })
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
}
