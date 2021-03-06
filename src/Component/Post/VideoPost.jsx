import PostFoot from "./PostFoot";
import PostHeader from "./PostHeader";
import styled from "styled-components";
import { APP_COLOR } from "../../consistent";
import { useHistory } from "react-router-dom";

const StyleLi = styled.li`
  list-style: none;
  border: solid 1px ${APP_COLOR.paleGreen};
  box-shadow: -5px 5px 5px 0px ${APP_COLOR.darkBlue};
  padding: 10px;

  .video-container {
    height: 300px;
  }
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default function VideoPost({ post, userChannelRelation }) {
  const history = useHistory();

  let videoId = null;

  if (post.video.includes("youtube")) {
    videoId = getVideoId(post.video);
  }

  return (
    <StyleLi onClick={() => history.push(`/post/${post.id}`)}>
      <PostHeader post={post} userChannelRelation={userChannelRelation} />
      <h2>{post.title}</h2>
      {post.content ? <p>{post.content}</p> : null}
      <div className="video-container">
        {post.video.includes("youtube") ? (
          <iframe
            title={post.title}
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            title={post.title}
            frameBorder="0"
            allowFullScreen
            src={post.video}
          ></iframe>
        )}
      </div>
      <PostFoot post={post} />
    </StyleLi>
  );
}
