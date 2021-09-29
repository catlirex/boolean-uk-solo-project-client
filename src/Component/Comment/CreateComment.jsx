import TextField from "@mui/material/TextField";
import { useState } from "react";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { saveNewComment } from "../../API/postFunction";
import useStore from "../../store";

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

const StyleForm = styled.form`
  display: grid;
  padding: 20px 0;
`;

export default function CreateComment({ setPostDetail, postDetail }) {
  const [value, setValue] = useState("");
  const loginUser = useStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginUser) return setModal("login");
    saveNewComment(postDetail.id, { content: value }).then((updatedPost) => {
      console.log(updatedPost);
      setPostDetail(updatedPost);
    });
  };

  return (
    <StyleForm onSubmit={handleSubmit}>
      <h2>Add Comment</h2>
      <TextField
        id="filled-multiline-static"
        multiline
        rows={4}
        variant="filled"
        value={value}
        onChange={handleChange}
        required
      />
      <ColoredButton type="submit">Submit</ColoredButton>
    </StyleForm>
  );
}
