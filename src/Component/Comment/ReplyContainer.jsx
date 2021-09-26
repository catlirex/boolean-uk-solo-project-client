import TextField from "@mui/material/TextField";
import { APP_COLOR } from "../../consistent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useStore from "../../store";
import { useState } from "react";
import { saveNewReply } from "../../API/postFunction";
import { getPostDetail } from "../../API/postFunction";
import PostHeader from "../Post/PostHeader";
import styled from "styled-components";

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

const StyleDiv = styled.div`
  .reply-ul {
    padding: 20px;
    display: grid;
    gap: 10px;
    border-left-style: solid;

    img {
      width: 20px;
      height: 20px;
    }
    .reply-li {
      display: grid;
      gap: 5px;
      grid-auto-flow: column;
      align-items: center;
    }
  }
  .reply-form {
    padding: 10px 20px;
  }
`;

export default function ReplyContainer({ comment, setPostDetail }) {
  const [value, setValue] = useState("");
  const loginUser = useStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginUser) return setModal("login");
    saveNewReply(comment.id, { content: value }).then((newReply) => {
      getPostDetail(comment.postId).then((data) => setPostDetail(data));
    });
  };
  return (
    <StyleDiv>
      <ul className="reply-ul">
        {comment.reply.map((reply) => (
          <li key={reply.id} className="reply-li">
            <PostHeader post={reply} />
            <p>{reply.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="reply-form">
        <h3>Add reply</h3>
        <TextField
          id="filled-multiline-static"
          multiline
          rows={1}
          variant="filled"
          value={value}
          onChange={handleChange}
          required
        />
        <ColoredButton type="submit">Submit</ColoredButton>
      </form>
    </StyleDiv>
  );
}
