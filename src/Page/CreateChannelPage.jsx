import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { APP_COLOR } from "../consistent";
import styled from "styled-components";
import { createChannel } from "../API/channelFunction";
import useStore from "../store";
import { useHistory } from "react-router-dom";

const StyleMain = styled.main`
  text-align: -webkit-center;
  .create-form {
    display: grid;
    gap: 20px;
    max-width: 500px;
  }
  .error {
    color: red;
    font-size: 0.8rem;
  }
`;

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

export default function CreateChannelPage() {
  const setSelectedChannel = useStore((state) => state.setSelectedChannel);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newChannel = {
      id: e.target.channelId.value,
      name: e.target.channelId.value,
      image: e.target.banner.value,
      avatar: e.target.avatar.value,
      about: e.target.about.value,
    };
    createChannel(newChannel).then((savedChannel) => {
      if (!savedChannel) {
        const errorMsg = document.querySelector(".error");
        errorMsg.innerHTML = "ChannelId Exists";
      } else {
        console.log("savedChannel", savedChannel);
        setSelectedChannel(savedChannel);
        history.push(`/channel/${savedChannel.id}`);
      }
    });
  };
  return (
    <StyleMain>
      <h1>Create new Channel</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <TextField
          id="channelId"
          name="channelId"
          label="Channel Id"
          variant="outlined"
          required
        />
        <span className="error"></span>
        <TextField id="name" label="Channel Name" variant="outlined" required />
        <TextField
          id="avatar"
          name="avatar"
          label="Avatar image url"
          variant="outlined"
          required
        />
        <TextField
          id="banner"
          name="banner"
          label="Cover image url"
          variant="outlined"
          required
        />
        <TextField
          id="about"
          name="about"
          label="About this channel"
          multiline
          rows={4}
          required
        />
        <ColoredButton type="submit">Create</ColoredButton>
      </form>
    </StyleMain>
  );
}
