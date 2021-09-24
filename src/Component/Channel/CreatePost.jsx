import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import LinkIcon from "@mui/icons-material/Link";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { APP_COLOR } from "../../consistent";
import styled from "styled-components";
import useStore from "../../store";
import { createPost } from "../../API/postFunction";

const ColoredButton = withStyles(() => ({
  root: {
    height: "30px",
    width: "100px",
    justifySelf: "right",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    margin: "10px",
    borderRadius: 0,
    color: APP_COLOR.lightGreen,
    backgroundColor: APP_COLOR.blue,
    "&:hover": {
      backgroundColor: APP_COLOR.lightGreen,
      color: APP_COLOR.blue,
    },
  },
}))(Button);

const StyleForm = styled.form`
  display: grid;
  gap: 10px;
  padding: 0 40px;
`;

export default function CreatePost() {
  const selectedChannel = useStore((state) => state.selectedChannel);
  const [mediaFormat, setMediaFormat] = React.useState(null);
  const loginUser = useStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);
  const selectedChannelPosts = useStore((state) => state.selectedChannelPosts);
  const setSelectChannelPost = useStore((state) => state.setSelectChannelPost);
  const handleSelect = (event, selectedMedia) => {
    setMediaFormat(selectedMedia);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginUser) return setModal("login");
    const newPost = {
      channel: selectedChannel.id,
      title: e.target.title.value,
    };
    if (e.target.content.value) newPost.content = e.target.content.value;
    if (mediaFormat) newPost[mediaFormat] = e.target.media.value;

    createPost(newPost).then((savedPost) => {
      console.log(savedPost);
      if (savedPost) {
        if (selectedChannelPosts === null)
          setSelectChannelPost([{ ...savedPost }]);
        else setSelectChannelPost([{ ...savedPost }, ...selectedChannelPosts]);
      }
      e.target.reset();
      setMediaFormat(null);
    });

    console.log(selectedChannelPosts);
  };
  return (
    <StyleForm onSubmit={handleSubmit}>
      <TextField id="title" name="title" label="Post Title" required />
      <TextField
        id="content"
        id="content"
        label="Content here...."
        multiline
        rows={2}
      />

      <ToggleButtonGroup
        value={mediaFormat}
        exclusive
        onChange={handleSelect}
        aria-label="select media"
      >
        <ToggleButton value="image" aria-label="image">
          <InsertPhotoIcon />
        </ToggleButton>
        <ToggleButton value="video" aria-label="video">
          <VideoCameraBackIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {mediaFormat ? (
        <TextField
          id="media"
          name="media"
          label="Media url"
          variant="standard"
        />
      ) : null}
      <ColoredButton type="submit">Post</ColoredButton>
    </StyleForm>
  );
}
