import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { delUserChannelRelation } from "../../API/userFunction";
import { useState } from "react";
import { delChannel } from "../../API/channelFunction";
import { useHistory } from "react-router-dom";

const StyleLi = styled.li`
  display: grid;
  grid-template-columns: 100px 1fr 1fr;
  border: 2px solid ${APP_COLOR.paleGreen};
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  .avatar {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
  }
  .action-item {
    text-align: right;
  }
`;

const ColoredButton = withStyles(() => ({
  root: {
    height: "30px",
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

export default function ChannelCard({ channelDetail }) {
  const { channelId, role, channel } = channelDetail;
  const { avatar, name } = channel;
  const [leftChannel, setLeftChannel] = useState(false);
  const history = useHistory();

  const leaveChannel = (e) => {
    e.stopPropagation();

    delUserChannelRelation(channelId).then(() => {
      setLeftChannel(true);
    });
  };

  const handleDel = (e) => {
    e.stopPropagation();
    delChannel(channelId).then((removed) => {
      setLeftChannel(true);
    });
  };

  if (leftChannel) return null;

  return (
    <StyleLi onClick={() => history.push(`/channel/${channelId}`)}>
      <img className="avatar" src={avatar}></img>
      <div>
        <h2>{name}</h2>
        <p>id:{channelId}</p>
        <p>Role: {role}</p>
      </div>
      <div className="action-item">
        {role === "member" ? (
          <ColoredButton onClick={() => leaveChannel()}>
            Leave Channel
          </ColoredButton>
        ) : null}
        {role === "owner" ? (
          <>
            <ColoredButton onClick={handleDel}>Delete Channel</ColoredButton>
            <ColoredButton>Add modurator</ColoredButton>
          </>
        ) : null}
        {role === "modurator" ? (
          <ColoredButton>Add modurator</ColoredButton>
        ) : null}
      </div>
    </StyleLi>
  );
}
