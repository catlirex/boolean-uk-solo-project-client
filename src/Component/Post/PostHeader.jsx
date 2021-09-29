import { useState } from "react";
import styled from "styled-components";
import useStore from "../../store";
import { APP_COLOR } from "../../consistent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { delPost } from "../../API/postFunction";
import ToggleButton from "@mui/material/ToggleButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useLocation } from "react-router-dom";
import { updatePinned } from "../../API/postFunction";

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

export default function PostHeader({ post, userChannelRelation }) {
  const loginUser = useStore((state) => state.loginUser);
  const { pathname } = useLocation();
  const pathString = pathname.toString();
  const [selected, setSelected] = useState(post.pinned);
  const handleDelete = (e) => {
    e.stopPropagation();
    delPost(post.id).then(() => {
      window.location.reload();
    });
  };

  console.log(userChannelRelation);

  const getPinAction = () => {
    if (!pathString.includes("/channel/")) return null;
    if (
      userChannelRelation &&
      (userChannelRelation.role === "owner" ||
        userChannelRelation.role === "modurator")
    ) {
      return (
        <ToggleButton
          value="pinned"
          selected={selected}
          onChange={(e) => {
            e.stopPropagation();
            updatePinned(post.id, !selected).then(() => {
              setSelected(!selected);
              window.location.reload();
            });
          }}
        >
          <PushPinIcon />
        </ToggleButton>
      );
    }
  };
  return (
    <StyleHeader>
      <div className="info-container">
        <img
          className="post-avatar"
          alt="user avatar"
          src={post.user.avatar}
        ></img>
        <p>
          <strong> {post.user.email.split("@")[0]}</strong>
        </p>
        {post.date ? <p>{post.date.split("T")[0]}</p> : null}
      </div>
      <div>
        {loginUser?.email === post.user.email && (
          <ColoredButton onClick={handleDelete}>remove</ColoredButton>
        )}
        {getPinAction()}
      </div>
    </StyleHeader>
  );
}
