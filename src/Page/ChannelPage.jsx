import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannelDetail } from "../API/channelFunction";
import useStore from "../store";
import { APP_COLOR } from "../consistent";
import styled from "styled-components";
import CreatePost from "../Component/Channel/CreatePost";
import PostsContainer from "../Component/Channel/PostsContainer";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  getUserChannelRelation,
  createUserChannelRelation,
  delUserChannelRelation,
} from "../API/userFunction";

const ColoredButton = withStyles(() => ({
  root: {
    placeSelf: "center",
    height: "50px",
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
const StyleMain = styled.main`
  .two-col {
    display: grid;
    grid-template-columns: 1fr 250px;
  }
  .banner {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .avatar {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    padding: 10px;
  }
  .channel-info {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    max-inline-size: fit-content;
  }

  aside {
    background-color: ${APP_COLOR.paleGreen};
    border-radius: 10px;
    padding: 10px;
  }
  .post-container {
    width: 100%;
  }
  .sub-header {
    display: grid;
    grid-auto-flow: column;
  }
  @media only screen and (max-width: 700px) {
    aside {
      display: none;
    }
    .two-col {
      display: block;
    }
  }
`;

export default function ChannelPage() {
  const { channelId } = useParams();
  const setErrorMsg = useStore((state) => state.setErrorMsg);
  const setModal = useStore((state) => state.setModal);
  const setSelectedChannel = useStore((state) => state.setSelectedChannel);
  const selectedChannel = useStore((state) => state.selectedChannel);
  const [userChannelRelation, setUserChannelRelation] = useState(null);
  const loginUser = useStore((state) => state.loginUser);

  useEffect(() => {
    if (!loginUser || !selectedChannel) return setUserChannelRelation(null);
    getUserChannelRelation(selectedChannel.id).then((connection) => {
      console.log("relation", connection);
      if (connection.connection) setUserChannelRelation(connection.connection);
    });
  }, [loginUser, selectedChannel]);

  useEffect(() => {
    getChannelDetail(channelId).then((data) => {
      if (!data) {
        setErrorMsg("Channel doesn't exist");
        setModal("error");
      } else {
        console.log(data);
        setSelectedChannel(data);
      }
    });
  }, []);

  const joinChannel = () => {
    if (!loginUser) return setModal("login");
    createUserChannelRelation(selectedChannel.id).then((res) => {
      console.log(res);
      setUserChannelRelation(res);
    });
  };

  const leaveChannel = () => {
    if (!loginUser) return setModal("login");
    delUserChannelRelation(selectedChannel.id).then(() =>
      setUserChannelRelation(null)
    );
  };

  if (!selectedChannel)
    return (
      <StyleMain>
        <h1>Loading</h1>
      </StyleMain>
    );

  if (selectedChannel)
    return (
      <StyleMain>
        <img className="banner" src={selectedChannel.image}></img>
        <div className="sub-header">
          <section className="channel-info">
            <img className="avatar" src={selectedChannel.avatar}></img>
            <h1>{selectedChannel.name}</h1>
            <h2>@{selectedChannel.id}</h2>
          </section>
          {userChannelRelation ? (
            <ColoredButton onClick={() => leaveChannel()}>
              Leave Channel
            </ColoredButton>
          ) : (
            <ColoredButton onClick={() => joinChannel()}>
              Join Channel
            </ColoredButton>
          )}
        </div>
        <div className="two-col">
          <section className="post-container">
            <CreatePost />
            <PostsContainer />
          </section>
          <aside>
            <h3>About {selectedChannel.name}</h3>
            <p>"{selectedChannel.about}"</p>
            <p>Number of post: {selectedChannel._count.post}</p>
            <p>Number of member: {selectedChannel._count.user}</p>
          </aside>
        </div>
      </StyleMain>
    );
}
