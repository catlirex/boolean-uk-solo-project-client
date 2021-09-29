import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPosts } from "../API/postFunction";
import ImagePost from "../Component/Post/ImagePost";
import VideoPost from "../Component/Post/VideoPost";
import TextPost from "../Component/Post/TextPost";
import { getChannels } from "../API/channelFunction";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import useStore from "../store";

const StyleMain = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
.post-ul{
  display:grid;
  gap:15px;
}

  section {
    padding: 20px;
    h1 {
      padding: 10px 0;
    }
  }

  .top-channel-container {
    padding: 20px;
    h2 {
      padding: 10px 0;
    }
  }
  .top-channel-ul {
    display: grid;
    gap: 10px;
  }

  .top-channel-li {
    display: grid;
    padding: 10px 10px;
    border-radius: 50px;
    grid-template-columns: 1fr 50px 60px;
    box-shadow: 0 0 5px 0 ${APP_COLOR.darkBlue};
    justify-items: center;
}

.list-head{
  padding: 0 10px;
    border-radius: 0px;
    
    box-shadow: 0 0 0px 0 ${APP_COLOR.darkBlue};
}

  }
`;

export default function HomePage() {
  const homePagePost = useStore((state) => state.homePagePost);
  const setHomePagePost = useStore((state) => state.setHomePagePost);
  const [channels, setChannels] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getPosts().then((list) => setHomePagePost(list));
    getChannels().then((list) => setChannels(list));
  }, [setHomePagePost]);

  if (!homePagePost || !channels) return <h1>loading...</h1>;

  return (
    <StyleMain>
      <section>
        <h1>Top Posts for Today:</h1>
        <ul className="post-ul">
          {homePagePost.map((post) => {
            if (post.image) return <ImagePost post={post} key={post.id} />;
            else if (post.video) return <VideoPost post={post} key={post.id} />;
            else return <TextPost post={post} key={post.id} />;
          })}
        </ul>
      </section>
      <aside className="top-channel-container">
        <h2>Hot Channels</h2>
        <ul className="top-channel-ul">
          <li className="top-channel-li list-head">
            <p>Channel Id</p>
            <p>Post</p>
            <p>Member</p>
          </li>
          {channels.map((channel) => (
            <li
              key={channel.id}
              className="top-channel-li"
              onClick={() => history.push(`/channel/${channel.id}`)}
            >
              <p>{channel.name}</p>
              <p>{channel._count.post}</p>
              <p>{channel._count.user}</p>
            </li>
          ))}
        </ul>
      </aside>
    </StyleMain>
  );
}
