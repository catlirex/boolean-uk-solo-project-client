import styled from "styled-components";

const StyleHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
  max-inline-size: max-content;
  gap: 10px;
  place-items: center;
  .post-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export default function PostHeader({ post }) {
  return (
    <StyleHeader>
      <img className="post-avatar" src={post.user.avatar}></img>
      <p>
        <strong> {post.user.email.split("@")[0]}</strong>
      </p>
      {post.date ? <p>{post.date.split("T")[0]}</p> : null}
    </StyleHeader>
  );
}
