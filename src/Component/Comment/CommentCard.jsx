import PostHeader from "../Post/PostHeader";
import CommentFoot from "./CommentFoot";
import styled from "styled-components";
import ReplyContainer from "./ReplyContainer";
import { useState } from "react";

const StyleLi = styled.li`
  padding: 20px;
  display: grid;
  gap: 10px;
  .comment-action-bar {
    display: grid;
    grid-auto-flow: column;
  }
`;

export default function CommentCard({ detail, setPostDetail, postDetail }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <StyleLi>
      <PostHeader post={detail} />
      <p>{detail.content}</p>

      <CommentFoot
        post={detail}
        setShowReply={setShowReply}
        showReply={showReply}
        postDetail={postDetail}
        setPostDetail={setPostDetail}
      />
      {showReply ? (
        <ReplyContainer comment={detail} setPostDetail={setPostDetail} />
      ) : null}
    </StyleLi>
  );
}
