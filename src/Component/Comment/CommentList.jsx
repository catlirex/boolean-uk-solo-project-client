import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import CommentCard from "./CommentCard";

const ColoredButton = withStyles(() => ({
  root: {
    placeSelf: "center",
    height: "30px",
    width: "150px",
    justifySelf: "right",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    margin: "10px",
    borderRadius: 0,
    color: APP_COLOR.darkBlue,
    backgroundColor: APP_COLOR.sharpGreen,
    "&:hover": {
      backgroundColor: APP_COLOR.darkBlue,
      color: APP_COLOR.sharpGreen,
    },
  },
}))(Button);

const StyleUl = styled.ul`
  .
`;

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
            setPostDetail={setPostDetail}
          />
        ))}
      </StyleUl>
    );
}
