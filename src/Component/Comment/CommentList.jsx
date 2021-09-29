import styled from "styled-components";
import CommentCard from "./CommentCard";

const StyleUl = styled.ul``;

export default function CommentList({ postDetail, setPostDetail }) {
  if (!postDetail._count.comment)
    return (
      <StyleUl>
        <h2>no one comment...</h2>
      </StyleUl>
    );
  else
    return (
      <StyleUl>
        <h2>Comment list</h2>
        {postDetail.comment.map((comment) => (
          <CommentCard
            key={comment.id}
            detail={comment}
            postDetail={postDetail}
            setPostDetail={setPostDetail}
          />
        ))}
      </StyleUl>
    );
}
