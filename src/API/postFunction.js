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

export function saveVote(postId, voteOption, voteNum) {
  let newVoteNum = null;

  if (voteOption === "up") newVoteNum = parseInt(voteNum) + 1;
  if (voteOption === "down") newVoteNum = parseInt(voteNum) - 1;

  return fetch(`${DB_URL}/post/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ vote: newVoteNum }),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function getPosts() {
  return fetch(`${DB_URL}/post`).then((res) => res.json());
}

export function getPostDetail(id) {
  return fetch(`${DB_URL}/post/${id}`).then((res) => res.json());
}

export function saveNewComment(postId, comment) {
  return fetch(`${DB_URL}/post/${postId}/newComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(comment),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}

export function saveNewReply(commentId, reply) {
  return fetch(`${DB_URL}/post/${commentId}/newReply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(reply),
  }).then((response) => {
    if (!response.ok) return null;
    return response.json();
  });
}
