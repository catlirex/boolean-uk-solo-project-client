import { useState } from "react";
import styled from "styled-components";
import useStore from "../../store";
import { APP_COLOR } from "../../consistent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { delPost } from "../../API/postFunction";

const ColoredButton = withStyles(() => ({
  root: {
    placeSelf: "center",
    height: "30px",
    width: "80px",
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

const StyleHeader = styled.header`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;

  place-items: center;
  .info-container {
    display: grid;
    grid-auto-flow: column;
    max-inline-size: max-content;
    gap: 10px;
    place-items: center;
  }
  .post-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export default function PostHeader({ post }) {
  const loginUser = useStore((state) => state.loginUser);

  const handleDelete = () => {
    delPost(post.id).then((removedPost) => {
      window.location.reload();
    });
  };
  return (
    <StyleHeader>
      <div className="info-container">
        <img className="post-avatar" src={post.user.avatar}></img>
        <p>
          <strong> {post.user.email.split("@")[0]}</strong>
        </p>
        {post.date ? <p>{post.date.split("T")[0]}</p> : null}
      </div>
      {loginUser?.email === post.user.email && (
        <ColoredButton onClick={handleDelete}>remove</ColoredButton>
      )}
    </StyleHeader>
  );
}
