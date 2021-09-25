import { useEffect, useState } from "react";
import { getUserChannel } from "../API/userFunction";
import useStore from "../store";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { APP_COLOR } from "../consistent";
import ChannelCard from "../Component/MyChannel/ChannelCard";
import { useHistory } from "react-router-dom";

const StyleMain = styled.main`
  display: grid;
  grid-template-columns: 1fr 200px;
  align-items: center;
  .channel-list {
    display: grid;
    gap: 10px;
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

export default function MyChannelPage() {
  const loginUser = useStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);
  const [userChannels, setUserChannels] = useState(undefined);
  const history = useHistory();
  useEffect(() => {
    getUserChannel()
      .then((res) => setUserChannels(res.data))
      .catch(() => setModal("login"));
  }, [loginUser]);

  return (
    <StyleMain>
      {userChannels === undefined ? <h1>Loading</h1> : null}
      {userChannels === null ? <h1>You haven't join any channel</h1> : null}
      {userChannels ? <h1>You belong to following channel(s)</h1> : null}
      <ColoredButton onClick={() => history.push("/createChannel")}>
        + Create
      </ColoredButton>
      <ul className="channel-list">
        {userChannels
          ? userChannels.map((channelDetail) => (
              <ChannelCard
                channelDetail={channelDetail}
                key={channelDetail.channelId}
                setUserChannels={setUserChannels}
                userChannels={userChannels}
              />
            ))
          : null}
      </ul>
    </StyleMain>
  );
}
