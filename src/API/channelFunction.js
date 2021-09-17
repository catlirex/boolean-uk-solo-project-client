const DB_URL = process.env.REACT_APP_API_URL;

export function createChannel(newChannelData) {
  return fetch(`${DB_URL}/channel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newChannelData),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}
