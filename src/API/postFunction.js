const DB_URL = process.env.REACT_APP_API_URL;

export function createPost(newPostData) {
  return fetch(`${DB_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newPostData),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function getPost(channelId, sort) {
  if (sort)
    return fetch(`${DB_URL}/post/channel/${channelId}?sort=${sort}`).then(
      (res) => res.json()
    );
  else
    return fetch(`${DB_URL}/post/channel/${channelId}`).then((res) =>
      res.json()
    );
}
