import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChannelDetail } from "../API/channelFunction";
import useStore from "../store";
import { APP_COLOR } from "../consistent";
import styled from "styled-components";
import CreatePost from "../Component/Channel/CreatePost";

const StyleMain = styled.main`
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
  .two-col {
    display: grid;
    grid-template-columns: 1fr 250px;
  }
  aside {
    background-color: ${APP_COLOR.paleGreen};
    border-radius: 10px;
    padding: 10px;
  }
`;

export default function ChannelPage() {
  const { channelId } = useParams();
  const setErrorMsg = useStore((state) => state.setErrorMsg);
  const setModal = useStore((state) => state.setModal);
  const setSelectedChannel = useStore((state) => state.setSelectedChannel);
  const selectedChannel = useStore((state) => state.selectedChannel);

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
        <section className="channel-info">
          <img className="avatar" src={selectedChannel.avatar}></img>
          <h1>{selectedChannel.name}</h1>
          <h2>@{selectedChannel.id}</h2>
        </section>
        <div className="two-col">
          <section>
            <CreatePost />
            post body
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
