import PostFoot from "./PostFoot";
import PostHeader from "./PostHeader";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { useHistory } from "react-router-dom";

const StyleLi = styled.li`
  list-style: none;
  border: solid 1px ${APP_COLOR.paleGreen};
  box-shadow: -5px 5px 5px 0px ${APP_COLOR.darkBlue};
  padding: 10px;
`;

export default function TextPost({ post, userChannelRelation }) {
  const history = useHistory();

  return (
    <StyleLi onClick={() => history.push(`/post/${post.id}`)}>
      <PostHeader post={post} userChannelRelation={userChannelRelation} />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <PostFoot post={post} />
    </StyleLi>
  );
}
