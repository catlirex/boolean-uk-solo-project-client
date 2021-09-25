import PostFoot from "./PostFoot";
import PostHeader from "./PostHeader";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";

const StyleLi = styled.li`
  list-style: none;
  border: solid 1px ${APP_COLOR.paleGreen};
  box-shadow: -5px 5px 5px 0px ${APP_COLOR.darkBlue};
  padding: 10px;
`;

export default function TextPost({ post }) {
  console.log(post);
  return (
    <StyleLi>
      <PostHeader post={post} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <PostFoot post={post} />
    </StyleLi>
  );
}
