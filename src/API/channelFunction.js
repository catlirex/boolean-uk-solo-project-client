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
export function getChannelDetail(id) {
  return fetch(`${DB_URL}/channel/${id}`).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function getChannels() {
  return fetch(`${DB_URL}/channel`).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function delChannel(channelId) {
  return fetch(`${DB_URL}/channel/${channelId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}
