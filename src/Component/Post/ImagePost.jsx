import PostFoot from "./PostFoot";
import PostHeader from "./PostHeader";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";

const StyleLi = styled.li`
  list-style: none;
  border: solid 1px ${APP_COLOR.paleGreen};
  box-shadow: -5px 5px 5px 0px ${APP_COLOR.darkBlue};
  padding: 10px;
  img {
    width: 100%;
  }
`;

export default function ImagePost({ post }) {
  console.log(post);
  return (
    <StyleLi>
      <PostHeader post={post} />
      <h2>{post.title}</h2>
      {post.content ? <p>{post.content}</p> : null}
      <img src={post.image} />
      <PostFoot post={post} />
    </StyleLi>
  );
}
